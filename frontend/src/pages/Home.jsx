import ChatContainer from "@/components/features/ChatContainer";
import Navbar from "@/components/features/Navbar";
import Sidebar from "@/components/features/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="border  h-[calc(100vh-4rem)] bg-gray-200">
        <div className="border h-[calc(100vh-5rem)] m-1 w-[80vw] mx-auto bg-card text-card-foreground rounded-lg p-1 shadow-lg flex gap-1">
          <Sidebar />
          <ChatContainer />
        </div>
      </div>

      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
