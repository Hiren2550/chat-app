import React, { useState, useRef, useEffect } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectedUser } from "@/redux/user/userSlice";
import toast from "react-hot-toast";
import MessageApi from "@/api/message";

const ChatContainer = () => {
  const { getMessageByUserId } = new MessageApi();
  const chatUser = useSelector(selectedUser);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", from: "other" },
    { id: 2, text: "I'm good, thanks! You?", from: "me" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetchChatMessages = async (id) => {
    setIsLoading(true);
    try {
      const response = await getMessageByUserId(id);
      if (response.success) {
      } else {
        toast.error(response.message ?? "Error While Fetching Messages");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while Fetching Messages");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), from: "me" },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatUser) {
      handleFetchChatMessages(chatUser);
    }
  }, [chatUser]);

  return (
    <div className="bg-gray-100 rounded-lg border border-gray-300 w-full h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-3">
          <img
            src={`https://placehold.co/800x800?text=${"hiren"
              .charAt(0)
              .toUpperCase()}`}
            alt="User"
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/800x800?text=${"hiren"
                .charAt(0)
                .toUpperCase()}`;
            }}
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <BsThreeDotsVertical className="text-gray-600 cursor-pointer" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.from === "me" ? "bg-green-200" : "bg-white"
              } p-3 rounded-lg shadow text-sm max-w-[80%]`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-300 bg-white">
        <FiPaperclip className="text-gray-600 text-xl cursor-pointer" />
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded-full bg-gray-200 focus:outline-none text-sm"
        />
        <FiSend
          className="text-blue-600 text-xl cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
