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
import { toast, ToastContainer } from "react-toastify";

function ChatArea() {
  const loggedUserData = JSON.parse(localStorage.getItem("user"));
  const {
    messages,
    setMessages,
    selectedChat,
    socket,
    setGroupMessages,
    groupMessages,
  } = useChatContext();
  const { allChatPreviewData, setAllChatPreviewData } = useContext(
    chatPreviewDataContext
  );
  const { singleDeleteMsgResponse, setSingleDeleteMsgResponse } = useContext(
    deleteSingleMsgResponseContext
  );

  const messagesEndRef = useRef(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filteredGroupMessages, setFilteredGroupMessages] = useState([]);

  const handleRemoveSingleMessage = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await deleteSingleMessageAPI(id,reqHeader);
        if (result.status == 200) {
          setSingleDeleteMsgResponse(result.data);
          setMessages(messages.filter((message) => message._id != id));
          toast.success("Message Deleted !");
        } else if (result.status == 400) {
          toast.warning("Message not Found !");
        } else {
          toast.error("Error Occured !");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //FOR PRIVATE MESSAGE
  useEffect(() => {
    if (selectedChat && selectedChat.username) {
      setFilteredMessages(
        messages.filter(
          (msg) =>
            (msg.senderId === selectedChat._id &&
              msg.receiverId === loggedUserData._id) ||
            (msg.senderId === loggedUserData._id &&
              msg.receiverId === selectedChat._id)
        )
      );
    } else {
      setFilteredMessages([]);
    }
  }, [messages, selectedChat]);

  useEffect(() => {
    if (selectedChat?._id && selectedChat?.name) {
      socket.emit("joinGroup", {
        userId: loggedUserData._id,
        groupId: selectedChat._id,
      });
    }
  }, [selectedChat, socket]);

  useEffect(() => {
    if (selectedChat && selectedChat.name) {
      setFilteredGroupMessages(
        groupMessages[selectedChat._id]
          ? [...groupMessages[selectedChat._id]]
          : []
      );
    } else {
      setFilteredGroupMessages([]);
    }
  }, [groupMessages[selectedChat?._id], selectedChat]);

  //FOR LAST MESSAGE TIP
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages, filteredGroupMessages]);

  return (
    <div className="flex flex-col h-lvh">
      {selectedChat ? (
        <>
          {selectedChat.username && (
            <>
              <ChatHeader
                name={selectedChat?.username}
                avatar={selectedChat?.avatar}
                userId={selectedChat?._id}
              />

              <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-emerald-50">
                {filteredMessages.map((message) => (
                  <MessageBubble
                    key={message._id}
                    text={message.chat}
                    timestamp={message.createdAt}
                    senderId={message.senderId}
                    loggedInUserId={loggedUserData._id}
                    image={message.isFile ? message.chat : null}
                    deleteMsg={() => handleRemoveSingleMessage(message._id)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <MessageInput selectedChat={selectedChat} />
            </>
          )}
          {selectedChat?.name && (
            <>
              <ChatHeader
                name={selectedChat?.name}
                avatar={selectedChat?.groupIcon}
                groupId={selectedChat?._id}
                memberCount={selectedChat?.groupMembers.length}
                members={[selectedChat?.createdBy, ...(selectedChat?.groupMembers || [])]}
              />

              <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-emerald-50">
                {filteredGroupMessages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    text={message.content}
                    timestamp={message.createdAt}
                    senderId={message.senderId}
                    senderName={message.senderName}
                    senderIcon={message.senderIcon}
                    loggedInUserId={loggedUserData._id}
                    image={message.isFile ? message.content : null}
                  />
                ))}

                <div ref={messagesEndRef} />
              </div>

              <MessageInput selectedChat={selectedChat} />
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full justify-center md:items-center items-start gap-5 p-4 bg-emerald-700">
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
      <ToastContainer />
    </div>
  );
}

export default ChatArea;
