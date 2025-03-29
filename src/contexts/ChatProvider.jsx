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
  const [groupMessages, setGroupMessages] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

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

      socket.on("receiveFile", (newFile) => {
        setMessages((prev) => [...prev, newFile]);
      });

      socket.on("joinedGroups", (groups) => setJoinedGroups(groups));
      
      socket.on("groupMessage", (newMessage) => {
        setGroupMessages((prev) => [...prev, newMessage]);
      });
      socket.on("receiveGroupFile", ({ groupId, fileMessage }) => {
        setGroupMessages((prev) => [...prev, { groupId, ...fileMessage }]);
      });

      return () => {
        socket.off("updateUserStatus");
        socket.off("message");
        socket.off("receiveFile");
        socket.off("joinedGroups");
        socket.off("groupMessage");
        socket.off("receiveGroupFile");
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        selectedChat,
        setSelectedChat,
        chatPreviewData,
        setChatPreviewData,
        socket,
        onlineUsers,
        groupMessages,
        setGroupMessages,
        joinedGroups,
        setJoinedGroups,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
