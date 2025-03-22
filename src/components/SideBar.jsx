import React from 'react';
import { User } from 'lucide-react';
import ChatList from './ChatList';

function SideBar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Messages</h1>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList/>
      </div>
    </div>
  );
}

export default SideBar;
