import React from "react";
import default_avatar from "../assets/default-avatar.svg";
import { useChatContext } from "../contexts/ChatProvider";

function ChatPreview({ name, avatar, userId, lastMessage, onClick }) {
  const { onlineUsers } = useChatContext();
  const isOnline = onlineUsers.includes(userId);
  return (
    <div
      onClick={onClick}
      className="p-3 sm:p-4 border-b border-gray-100 cursor-pointer"
    >
      <div className="flex items-center">
        <img
          src={avatar ? avatar : default_avatar}
          alt={name}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover
            ${isOnline ? "border-2 border-green-500" : "hover:bg-gray-50"}
            `}
        />
        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {name}
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 ml-2">
          {lastMessage}
        </span>
      </div>
    </div>
  );
}

export default ChatPreview;
