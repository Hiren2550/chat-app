import axios from "axios";
import { config } from "../helper/config";
import { store } from "@/redux/store";
import { clearUser } from "@/redux/auth/authSlice";

class ApiService {
  constructor(baseURL = config.API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      withCredentials: true,
    });
    // Add interceptor for response
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          store.dispatch(clearUser());
          return Promise.reject({
            ...error,
            message: "Unauthorized access - Logging out.",
          });
        }

        return Promise.reject(error);
      }
    );
  }

  request(method, url, options = {}) {
    const { params = {}, data = {}, headers = {} } = options;

    return this.client.request({
      method,
      url,
      params,
      data,
      headers,
    });
  }

  get(url, params = {}, headers = {}) {
    return this.request("get", url, { params, headers });
  }

  post(url, data = {}, headers = {}) {
    return this.request("post", url, { data, headers });
  }

  put(url, data = {}, headers = {}) {
    return this.request("put", url, { data, headers });
  }

  delete(url, params = {}, headers = {}) {
    return this.request("delete", url, { params, headers });
  }
}

const api = new ApiService(config.API_BASE_URL);
export default api;
