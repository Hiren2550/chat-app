import { io } from "socket.io-client";
import { config } from "@/helper/config";

let socket = null;

export const connectSocket = (userId, token) => {
  if (!socket) {
    socket = io(config.SOCKET_BASE_URL, {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id, userId);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
