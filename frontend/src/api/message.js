import api from "./Api";

class MessageApi {
  static MESSAGE_API_END_POINT = {
    GET_MESSAGES: (id) => `/message/${id}`,
  };

  async getMessageByUserId(id) {
    try {
      const response = await api.get(
        MessageApi.MESSAGE_API_END_POINT.GET_MESSAGES(id)
      );
      const res = response?.data;
      if (res?.status === 200) {
        return {
          message: res?.message ?? "Messages Fetched Succesfully",
          data: res?.result ?? [],
          status: res?.status,
          success: res?.success || true,
        };
      } else {
        return {
          message: res?.message ?? "Error while Fetching Messages",
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

export default MessageApi;
