// src/components/features/Sidebar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import UserApi from "@/api/user";
import toast from "react-hot-toast";
import placeholder from "@/assets/images/placeholder.png";

const Sidebar = ({ isOpen }) => {
  const { getUsersList } = new UserApi();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const response = await getUsersList();
      if (response.success) {
        setUsers(response.data); // ✅ Set real API data
        toast.success(response?.message ?? "Users List Fetched Successfully");
      } else {
        toast.error(response.message ?? "Error While Fetching Users List");

        // Optional: fallback to dummy if failed
        const dummyUsers = [
          { id: 1, name: "Alice", lastMessage: "Hey there!" },
          { id: 2, name: "Bob", lastMessage: "What's up?" },
          { id: 3, name: "Charlie", lastMessage: "See you later" },
        ];
        setUsers(dummyUsers); // ✅ fallback
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while Fetching Users List");

      // Optional fallback here too
      const dummyUsers = [
        { id: 1, name: "Alice", lastMessage: "Hey there!" },
        { id: 2, name: "Bob", lastMessage: "What's up?" },
        { id: 3, name: "Charlie", lastMessage: "See you later" },
      ];
      setUsers(dummyUsers);
    } finally {
      setIsLoading(false);
    }
  };
  // Dummy data or replace with API call
  useEffect(() => {
    fetchUserList(); // ✅ Only one call
  }, []);

  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-80 z-40 md:translate-x-0 overflow-y-auto h-full hide-scrollbar`}
    >
      <div className="p-4 text-xl font-bold border-b">Chats</div>

      {/* Chat Users List */}
      <div className="overflow-y-auto h-[calc(100%-65px)] p-2 space-y-2 custom-scrollbar">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/chat/${user.id}`} // e.g., /chat/1
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <img
              src={user?.profile_image || placeholder}
              alt="avtar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{user.fullname}</span>
              <span className="text-sm text-gray-500 truncate max-w-[140px]">
                {user.lastMessage}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
