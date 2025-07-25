import api from "./Api";

class AuthApi {
  static API_END_POINT = {
    Login: "/auth/signup",
  };

  async createUser(user) {
    try {
      const response = await api.post(AuthApi.API_END_POINT.Login, user);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }
}

export default AuthApi;
