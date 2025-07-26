import api from "./Api";

class UserApi {
  static USER_API_END_POINT = {
    UPDATE_DATA: "/user/update",
    GET_USERS_LIST: "/user",
  };
  async updateUserData(data) {
    try {
      const response = await api.post(
        UserApi.USER_API_END_POINT.UPDATE_DATA,
        data
      );
      const res = response?.data;
      if (res?.status === 200) {
        return {
          message: res?.message ?? "User Data Update Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Update User",
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
  async getUsersList() {
    try {
      const response = await api.get(UserApi.USER_API_END_POINT.GET_USERS_LIST);
      const res = response?.data;
      if (res?.status === 200) {
        return {
          message: res?.message ?? "User List Fetched Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Fetching User",
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

export default UserApi;
