import React, { useState, useEffect, useContext, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useChatContext } from "../contexts/ChatProvider";
import { chatPreviewDataContext, loggedUserDataContext } from "../contexts/DataContextShare";

function ChatArea() {
  const { loggedUserData } = useContext(loggedUserDataContext);
  const { messages, selectedChat } = useChatContext(); // Use selectedChat from ChatContext
  const { allChatPreviewData, setAllChatPreviewData } = useContext(
      chatPreviewDataContext
    );

    console.log(allChatPreviewData);
    
  
  const messagesEndRef = useRef(null);

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      setFilteredMessages(
        messages.filter(
          (msg) =>
            (msg.senderId === selectedChat._id && msg.receiverId === loggedUserData._id) ||
            (msg.senderId === loggedUserData._id && msg.receiverId === selectedChat._id)
        )
      );
    }
  }, [messages, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  return (
    <div className="flex flex-col h-full">
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
            timestamp={message.createdAt} // Pass as-is, let moment handle it
            senderId={message.senderId} // Use correct senderId
            loggedInUserId={loggedUserData._id} // Pass logged-in user's ID
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput selectedUser={selectedChat} />
    </div>
  );
}

export default ChatArea;
