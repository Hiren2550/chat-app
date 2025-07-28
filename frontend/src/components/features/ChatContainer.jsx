import React, { useState, useRef, useEffect } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectedUser } from "@/redux/user/userSlice";
import toast from "react-hot-toast";
import MessageApi from "@/api/message";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";
import ChatContainerSkeleton from "../skeletons/ChatContainerSkeleton";
import { user } from "@/redux/auth/authSlice";
import moment from "moment";
import { convertToBase64 } from "@/helper/convertToBase64";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MessageTimestamp } from "./MessageTimestamp";

const ChatContainer = () => {
  const { getMessageByUserId, sendMesssage } = new MessageApi();
  const chatUser = useSelector(selectedUser);
  const authUser = useSelector(user);
  const authPlaceHolder = `https://placehold.co/800x800?text=${authUser?.fullname
    .charAt(0)
    .toUpperCase()}`;
  const chatPlaceHolder = `https://placehold.co/800x800?text=${chatUser?.fullname
    .charAt(0)
    .toUpperCase()}`;
  const testPlaceHolder = `https://placehold.co/800x800?text=${"Test"
    .charAt(0)
    .toUpperCase()}`;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [base64URL, setBase64URL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleFetchChatMessages = async (id) => {
    setIsLoading(true);
    try {
      const response = await getMessageByUserId(id);
      if (response.success) {
        setMessages(response?.data);
      } else {
        toast.error(response.message ?? "Error While Fetching Messages");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while Fetching Messages");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSend = async () => {
    if (input.trim() === "" && !base64URL) return;
    const messageData = {
      receiverId: chatUser?.id,
    };
    if (input.trim() !== "") {
      messageData.text = input;
    }
    if (base64URL) {
      messageData.image = base64URL;
    }
    setIsLoading(true);
    try {
      const response = await sendMesssage(messageData);
      if (response.success) {
        setBase64URL("");
        setInput("");
        setMessages([...messages, response?.data]);
      } else {
        toast.error(response.message ?? "Error While Sending Messages");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while Sending Messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    convertToBase64(imageFile, setBase64URL);
    setDisabled(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatUser) {
      handleFetchChatMessages(chatUser?.id);
    }
  }, [chatUser]);

  return (
    <>
      {isLoading ? (
        <ChatContainerSkeleton />
      ) : (
        <div className="bg-gray-100 rounded-lg border border-gray-300 w-full h-full flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
            <div className="flex items-center gap-3">
              <img
                src={chatUser?.profile_image || chatPlaceHolder}
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
                <h2 className="text-sm font-semibold text-gray-800">
                  {chatUser?.fullname ?? "N/A"}
                </h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <BsThreeDotsVertical
              className="text-gray-600 cursor-pointer"
              onClick={() => {}}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.length == 0 ? (
              <EmptyChatPlaceholder />
            ) : (
              messages.map((msg) => {
                const isSentByMe = msg.senderId?.id == authUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-1 items-end ${
                      isSentByMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* For received messages, show image on the left */}
                    {!isSentByMe && (
                      <img
                        src={msg?.senderId?.profile_image || chatPlaceHolder}
                        alt="profile"
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = chatPlaceHolder;
                        }}
                      />
                    )}

                    {msg.text && !msg.image && (
                      <div
                        className={`relative min-w-[50px] ${
                          isSentByMe ? "bg-green-200" : "bg-white"
                        } py-1.5 px-2 pb-2 rounded-lg shadow text-base max-w-[80%] break-words`}
                      >
                        <span className="break-all">{msg.text}</span>
                        <span className="text-[8px] absolute bottom-0 right-1.5">
                          <MessageTimestamp date={msg.createdAt} />
                        </span>
                      </div>
                    )}

                    {msg.image && !msg.text && (
                      <div
                        className={`relative min-w-[50px] ${
                          isSentByMe ? "bg-green-200" : "bg-white"
                        } py-2 px-2 pb-4 rounded-lg shadow text-base max-w-[80%]`}
                      >
                        <img
                          src={msg?.image || authPlaceHolder}
                          alt="profile"
                          className="w-[150px] h-[150px] rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = authPlaceHolder;
                          }}
                        />
                        <span className="text-[8px] absolute bottom-0 right-1.5">
                          <MessageTimestamp date={msg.createdAt} />
                        </span>
                      </div>
                    )}

                    {msg.text && msg.image && (
                      <div
                        className={`relative min-w-[50px] ${
                          isSentByMe ? "bg-green-200" : "bg-white"
                        } py-1.5 px-2 pb-4 rounded-lg shadow text-base max-w-[80%] break-words`}
                      >
                        <img
                          src={msg.image}
                          alt="sent"
                          className="w-full max-w-xs h-auto rounded-md mb-2"
                        />
                        <span className="break-all block">{msg.text}</span>
                        <span className="text-[8px] absolute bottom-0 right-1.5">
                          <MessageTimestamp date={msg.createdAt} />
                        </span>
                      </div>
                    )}

                    {/* For sent messages, show image on the right */}
                    {isSentByMe && (
                      <img
                        src={msg?.senderId?.profile_image || authPlaceHolder}
                        alt="profile"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="relative flex items-center gap-2 p-3 border-t border-gray-300 bg-white">
            <input
              onChange={handleFileChange}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            {base64URL && (
              <img
                className=" absolute top-[-132px] left-2  rounded-lg border-gray-300 h-30 w-30 object-cover self-center mt-2 mx-auto"
                src={base64URL || testPlaceHolder}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = testPlaceHolder;
                }}
                alt="Profile"
              />
            )}
            {base64URL && (
              <div className="cursor-pointer absolute left-[96px] top-[-118px] rounded-full bg-white p-1 hover:bg-gray-300 animate-bounce">
                <MdOutlineDeleteOutline
                  className="text-red-500"
                  size={20}
                  onClick={() => {
                    setFile(undefined);
                    setBase64URL("");
                    setDisabled(true);
                  }}
                />
              </div>
            )}
            <FiPaperclip
              className="text-gray-600 text-xl cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.trim() === "") {
                  setDisabled(true);
                } else {
                  setDisabled(false);
                }
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 rounded-full bg-gray-200 focus:outline-none text-sm"
            />
            <FiSend
              className={` text-xl  ${
                disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 cursor-pointer"
              }`}
              onClick={handleSend}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
