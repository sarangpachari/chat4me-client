import React from 'react';
import { Search, User } from 'lucide-react';
import ChatPreview from './ChatPreview';

function SideBar({ onProfileClick }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Messages</h1>
          <button
            onClick={onProfileClick}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-600"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/*need to add chat list here so that we can change between chat*/}
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

export default SideBar;
