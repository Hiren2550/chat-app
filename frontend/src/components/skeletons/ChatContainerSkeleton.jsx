import React from "react";

const ChatContainerSkeleton = () => {
  const bubbleCount = 6;

  return (
    <div className="bg-gray-100 rounded-lg border border-gray-300 w-full h-full flex flex-col animate-pulse overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="space-y-1">
            <div className="w-24 h-4 bg-gray-300 rounded" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded" />
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {Array.from({ length: bubbleCount }).map((_, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`${
                index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
              } p-3 rounded-lg text-sm max-w-[60%] h-5 w-40`}
            />
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-300 bg-white">
        <div className="w-6 h-6 bg-gray-300 rounded" />
        <div className="flex-1 h-8 rounded-full bg-gray-200" />
        <div className="w-6 h-6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ChatContainerSkeleton;
