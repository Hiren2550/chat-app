import UserApi from "@/api/user";
import placeholder from "@/assets/images/placeholder.png";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SidebarSkeleton } from "../skeletons/SidebarSkeleton";

const Sidebar = ({ isOpen }) => {
  const { getUsersList } = new UserApi();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const response = await getUsersList();
      if (response.success) {
        setUsers(response.data);
      } else {
        toast.error(response.message ?? "Error While Fetching Users List");
        const dummyUsers = [
          { id: 1, name: "Alice", lastMessage: "Hey there!" },
          { id: 2, name: "Bob", lastMessage: "What's up?" },
          { id: 3, name: "Charlie", lastMessage: "See you later" },
        ];
        setUsers(dummyUsers);
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while Fetching Users List");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <aside
      className={`bg-gray-100 border-1 rounded-lg border-gray-300  top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-80 z-40 md:translate-x-0 overflow-y-auto h-full hide-scrollbar`}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-300">
        <h2>All Contacts</h2>
      </div>

      {/* Chat Users List */}
      <div className="overflow-y-auto h-[calc(100%-65px)] p-2 space-y-2 custom-scrollbar">
        {isLoading ? (
          <SidebarSkeleton length={10} />
        ) : (
          users.map((user) => (
            <Link
              key={user.id}
              // to={`/chat/${user.id}`}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
            >
              <img
                src={user?.profile_image || placeholder}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">
                  {user.fullname}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[140px]">
                  {user.lastMessage || "Offline"}
                </span>
                <span className="text-sm text-gray-500 truncate max-w-[140px]">
                  {user.lastMessage}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
