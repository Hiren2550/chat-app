import ChatContainer from "@/components/features/ChatContainer";
import DefaultChat from "@/components/features/DefaultChat";
import Navbar from "@/components/features/Navbar";
import Sidebar from "@/components/features/Sidebar";
import useSocket from "@/hooks/useSocket";
import { onlineUsers, selectedUser } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const chatUser = useSelector(selectedUser);
  const onlineUserList = useSelector(onlineUsers);
  console.log(onlineUserList);
  const socket = useSocket();
  return (
    <div>
      <Navbar />
      <div className="border  h-[calc(100vh-4rem)] bg-gray-200">
        <div className="border h-[calc(100vh-5rem)] m-1 w-[80vw] mx-auto bg-card text-card-foreground rounded-lg p-1 shadow-lg flex gap-1">
          <Sidebar />
          {chatUser?.id ? <ChatContainer /> : <DefaultChat />}
        </div>
      </div>

      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
