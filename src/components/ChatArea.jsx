import React, { useState, useEffect, useContext, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useChatContext } from "../contexts/ChatProvider";
import {
  chatPreviewDataContext,
  loggedUserDataContext,
} from "../contexts/DataContextShare";

import { FaRegMessage } from "react-icons/fa6";
import { deleteSingleMessageAPI } from "../services/allAPI";
import { deleteSingleMsgResponseContext } from "../contexts/ResponseContextShare";

function ChatArea() {
  const { loggedUserData } = useContext(loggedUserDataContext);
  const { messages, setMessages, selectedChat } = useChatContext(); // Use selectedChat from ChatContext
  const { allChatPreviewData, setAllChatPreviewData } = useContext(
    chatPreviewDataContext
  );
  const { singleDeleteMsgResponse, setSingleDeleteMsgResponse } = useContext(
    deleteSingleMsgResponseContext
  );

  //DELETE SINGLE MESSAGE
  const handleRemoveSingleMessage = async (messageId) => {
    const id = messageId;
    const token = localStorage.getItem("token");

    if (id && token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await deleteSingleMessageAPI(id, reqHeader);
        if (result.status == 200) {
          setFilteredMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== messageId)
          );
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== messageId)
          );
          setSingleDeleteMsgResponse(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error: select a message or token missing");
    }
  };

  const messagesEndRef = useRef(null);

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      setFilteredMessages(
        messages.filter(
          (msg) =>
            (msg.senderId === selectedChat._id &&
              msg.receiverId === loggedUserData._id) ||
            (msg.senderId === loggedUserData._id &&
              msg.receiverId === selectedChat._id)
        )
      );
    }
  }, [messages, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  return (
    <div className="flex flex-col h-full">
      {selectedChat ? (
        <>
          {/* Pass correct user details */}
          <ChatHeader
            name={selectedChat?.username}
            avatar={selectedChat?.avatar}
            userId={selectedChat?._id}
          />

          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-gray-50">
            {filteredMessages.map((message) => (
              <MessageBubble
                key={message._id}
                text={message.chat}
                timestamp={message.createdAt}
                senderId={message.senderId}
                loggedInUserId={loggedUserData._id}
                deleteMsg={() => handleRemoveSingleMessage(message._id)}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <MessageInput selectedUser={selectedChat} />
        </>
      ) : (
        <div className="flex flex-col h-full justify-center md:items-center items-start gap-5 p-4 bg-amber-300">
          <div className="py-3">
            <p className="text-4xl font-bold text-white">
              Select a <span className="text-red-500">chat</span> to start{" "}
              <span className="text-red-500">messaging</span>
            </p>
          </div>
          <div className="flex gap-3 justify-start md:justify-center w-full">
            <p className="text-white text-2xl font-bold">Hi,</p>
            <FaRegMessage className="text-white animate-pulse" size={75} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatArea;
