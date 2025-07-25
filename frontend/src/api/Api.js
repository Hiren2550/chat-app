// src/api/ApiService.js
import axios from "axios";
import { config } from "../helper/config";

class ApiService {
  constructor(baseURL = config.API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  /**
   * General method to make any API call.
   * @param {string} method - HTTP method (get, post, put, delete)
   * @param {string} url - API endpoint (e.g., "/users")
   * @param {object} options - { params, data, headers }
   * @returns {Promise}
   */
  request(method, url, options = {}) {
    const { params = {}, data = {}, headers = {} } = options;

    return this.client.request({
      method,
      url,
      params, // Query string params
      data, // Request body
      headers,
    });
  }

  // Shorthand methods
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

// Export a default instance
const api = new ApiService(config.API_BASE_URL);
export default api;
