import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../services/socket";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

      socket.on("joinGroup", (groups) => {
        setJoinedGroups(groups);
      });

      socket.on("groupMessage", ({ groupId, newMessage }) => {

        setGroupMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages }; 
          updatedMessages[groupId] = [
            ...(updatedMessages[groupId] || []),
            newMessage
          ];
          return updatedMessages;  
        });
      });

      socket.on("previousGroupMessages", ({ groupId, groupMessages }) => {
        setGroupMessages((prevMessages) => ({
          ...prevMessages,
          [groupId]: groupMessages,
        }));
      });

      socket.on("receiveGroupFile", ({ groupId, fileMessage }) => {
        console.log("FILE MSG:",fileMessage);
        
        setGroupMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages }; 
          updatedMessages[groupId] = [
            ...(updatedMessages[groupId] || []),
            fileMessage
          ];
          return updatedMessages;  
        });
      });

      return () => {
        socket.off("updateUserStatus");
        socket.off("message");
        socket.off("receiveFile");
        socket.off("joinedGroups");
        socket.off("groupMessage");
        socket.off("previousChats");  
        socket.off("receiveGroupFile");
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        setUser,
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
