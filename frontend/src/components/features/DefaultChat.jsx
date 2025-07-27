import React from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

const DefaultChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-600">
      <div className="text-5xl mb-4 text-blue-400 animate-bounce">
        <BsChatDots />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Welcome to Chat!!</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-xs">
        Select a conversation from sidebar to start chating
      </p>
    </div>
  );
};

export default DefaultChat;
