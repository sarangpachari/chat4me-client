import React from "react";
import default_avatar from "../assets/default-avatar.svg";
import { useChatContext } from "../contexts/ChatProvider";
import { Users } from "lucide-react";

function ChatPreview({ name, avatar, lastMessage, userId, isGroup, memberCount, onClick }) {
  const { onlineUsers } = useChatContext();
  const isOnline = !isGroup && onlineUsers.includes(userId);

  return (
    <div
      onClick={onClick}
      className="p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-center">
        {isGroup ? (
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            {memberCount && (
              <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {memberCount}
              </span>
            )}
          </div>
        ) : (
          <img
            src={avatar ? avatar : default_avatar}
            alt={name}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover
              ${isOnline ? "border-2 border-green-500" : ""}
            `}
          />
        )}
        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {name}
            </h3>
            
          </div>
          {lastMessage && (
            <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPreview;