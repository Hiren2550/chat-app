import api from "./Api";

class AuthApi {
  static API_END_POINT = {
    SIGN_UP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  };

  async createUser(user) {
    try {
      const response = await api.post(AuthApi.API_END_POINT.SIGN_UP, user);
      const res = response?.data;
      if (res?.status === 201) {
        return {
          message: res?.message ?? "User Created Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Creating New User",
          status: res?.status,
          success: res?.success || false,
        };
      }
    } catch (error) {
      return {
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status,
        error: error?.response?.data,
        success: false,
      };
    }
  }
  async login(user) {
    try {
      const response = await api.post(AuthApi.API_END_POINT.LOGIN, user);
      const res = response?.data;
      if (res?.status === 200) {
        return {
          message: res?.message ?? "User Logged In Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Login User",
          status: res?.status,
          success: res?.success || false,
        };
      }
    } catch (error) {
      return {
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status,
        error: error?.response?.data,
        success: false,
      };
    }
  }

  async logOut() {
    try {
      const response = await api.post(AuthApi.API_END_POINT.LOGOUT);
      const res = response?.data;
      if (res?.status === 200) {
        return {
          message: res?.message ?? "User Logou Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Logout User",
          status: res?.status,
          success: res?.success || false,
        };
      }
    } catch (error) {
      return {
        message: error?.response?.data?.message || error.message,
        status: error?.response?.status,
        error: error?.response?.data,
        success: false,
      };
    }
  }
}

export default AuthApi;
