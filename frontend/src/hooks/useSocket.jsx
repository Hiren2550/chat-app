// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { user } from "@/redux/auth/authSlice";
import { setOnlineUserList } from "@/redux/user/userSlice";

export default function useSocket() {
  const authUser = useSelector(user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authUser?.id) return;

    const socketInstance = connectSocket(authUser.id, authUser.token);
    setSocket(socketInstance);
    socketInstance.on("getOnlineUsers", (userIds) => {
      dispatch(setOnlineUserList(userIds));
    });

    // Cleanup on unmount or when authUser changes
    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [authUser?.id, authUser?.token]);

  return socket;
}
