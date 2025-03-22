import React, { useContext } from "react";
import { Search } from "lucide-react";
import ChatPreview from "./ChatPreview";
import { chatPreviewDataContext } from "../contexts/DataContextShare";

function ChatList() {
  //CONTEXTS
  const {chatPreviewData,setChatPreviewData} = useContext(chatPreviewDataContext)

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatPreview
          name="Argo"
          avatar="https://preview.redd.it/can-someone-find-me-the-full-picture-of-luffy-v0-h2pzsqum3vwc1.png?width=1400&format=png&auto=webp&s=874056ae179de44d273e13328f104a1eb1f9c50d"
          lastMessage="Sure! I can show you tomorrow..."
          timestamp="09:44"
        />
        <ChatPreview
          name="Naruto"
          avatar="https://i.redd.it/which-naruto-form-stronger-v0-1w1zh7cajuoc1.jpg?width=602&format=pjpg&auto=webp&s=5d5b41ba43483827f50d945de73a863b83e0b874"
          lastMessage="Hey!!"
          timestamp="09:44"
        />
      </div>
    </div>
  );
}

export default ChatList;
