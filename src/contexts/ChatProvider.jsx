import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../services/socket";
import { loggedUserDataContext } from "./DataContextShare";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { loggedUserData } = useContext(loggedUserDataContext);
  const user = loggedUserData;

  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Currently active chat
  const [chatPreviewData, setChatPreviewData] = useState([]); // Chat list
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("register", user._id);

      socket.on("previousChats", (chats) => {
        setMessages(chats);
      });

      socket.on("updateUserStatus", (users) => {
        setOnlineUsers(users);
      });

      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        
        socket.off("updateUserStatus");
        socket.off("message");
        socket.disconnect();
      };
    }
  }, [user]);

  const sendMessage = (receiverId, chat) => {
    const newMessage = { senderId: user._id, receiverId, chat };
    socket.emit("message", newMessage);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        selectedChat,
        setSelectedChat,
        chatPreviewData,
        setChatPreviewData,
        socket,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
