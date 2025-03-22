import React from 'react';
import { Send, File } from 'lucide-react';

function MessageInput() {
  return (
    <div className="p-2 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <button
          className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;