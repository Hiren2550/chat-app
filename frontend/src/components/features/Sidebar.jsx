import UserApi from "@/api/user";
import placeholder from "@/assets/images/placeholder.png";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SidebarSkeleton } from "../skeletons/SidebarSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  onlineUsers,
  selectedUser,
  setSelectedUser,
} from "@/redux/user/userSlice";
import { PiUserListLight } from "react-icons/pi";

const Sidebar = ({ isOpen }) => {
  const { getUsersList } = new UserApi();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const chatUser = useSelector(selectedUser);
  const selectUser = useSelector(selectedUser);
  const onlineUserList = useSelector(onlineUsers);

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const response = await getUsersList();
      if (response.success) {
        setUsers(response.data);
        if (!selectUser) {
          dispatch(setSelectedUser(response?.data?.[0]));
        }
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
      className={`bg-gray-100 border-1 rounded-lg border-gray-300  top-0 left-0 transform
      transition-transform duration-300 ease-in-out w-80 z-40 md:translate-x-0 overflow-y-auto h-full hide-scrollbar`}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-300 flex gap-2 items-center">
        <PiUserListLight size={30} className="font-bold" />
        <h2>Contacts</h2>
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
              onClick={() => dispatch(setSelectedUser(user))}
              className={`relative flex items-center gap-3 p-2 rounded transition hover:bg-[#bbc9e8] ${
                chatUser?.id === user.id ? "bg-[#b7c7e8]" : ""
              }`}
            >
              {onlineUserList?.includes(user.id) && (
                <span className="absolute top-3 left-10 size-2 rounded-full bg-green-600" />
              )}
              <img
                src={
                  user?.profile_image ||
                  `https://placehold.co/800x800?text=${user?.fullname
                    .charAt(0)
                    .toUpperCase()}` ||
                  placeholder
                }
                alt="avatar"
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">
                  {user.fullname}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[140px]">
                  {onlineUserList?.includes(user.id) ? (
                    <span className="text-green-400">Online</span>
                  ) : (
                    "Offline"
                  )}
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
