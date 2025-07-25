import api from "./Api";

class AuthApi {
  static API_END_POINT = {
    Login: "/auth/signup",
  };

  async createUser(user) {
    try {
      const response = await api.post(AuthApi.API_END_POINT.Login, user);
      const res = response?.data;
      if (res?.status === 201) {
        console.log(response, "201---------------");
        return {
          message: res?.message ?? "User Created Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        console.log(res, "!!!201----------");
        return {
          message: res?.message ?? "Error while Creating New User",
          status: res?.status,
          success: res?.success || false,
        };
      }
    } catch (error) {
      return {
        message: error?.message,
        error: error,
      };
    }
  }
}

export default AuthApi;
