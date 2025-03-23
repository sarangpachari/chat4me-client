import React from "react";
import { useChatContext } from "../contexts/ChatProvider";
import default_avatar from "../assets/default-avatar.svg"

function ChatHeader({ name, avatar, userId }) {
  const { onlineUsers } = useChatContext();
  const isOnline = onlineUsers.includes(userId);
  return (
    <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center">
        <img
          src={avatar ? avatar : default_avatar}
          alt={name}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <div className="ml-3 sm:ml-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {name}
          </h2>
          <p className="text-xs sm:text-sm text-green-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
