import React from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-600">
      <div className="text-5xl mb-4 text-blue-400 animate-bounce">
        <BsChatDots />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">
        No Conversation Yet
      </h2>
      <p className="text-sm text-gray-500 mt-2 max-w-xs">
        Start a new chat by selecting a contact from the left sidebar. Your
        messages will show up here.
      </p>
      <div className="flex gap-3 mt-6 text-2xl text-gray-400">
        <FiSend className="hover:text-blue-500 transition" />
        <FiSmile className="hover:text-yellow-500 transition" />
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
