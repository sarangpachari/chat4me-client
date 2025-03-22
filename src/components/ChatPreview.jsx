import React from "react";

function ChatPreview({ name, avatar, timestamp, active, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer 
        ${active ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
    >
      <div className="flex items-center">
        <img
          src={avatar || "https://via.placeholder.com/40"} 
          alt={name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{name}</h3>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 ml-2">{timestamp}</span>
      </div>
    </div>
  );
}

export default ChatPreview;
