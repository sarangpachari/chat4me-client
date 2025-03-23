import React from "react";
import moment from "moment";

function MessageBubble({ text, timestamp, senderId, loggedInUserId, image }) {
  const isSentByUser = senderId === loggedInUserId; // Compare sender ID with logged-in user

  if (!text && !image) return null;

  return (
    <div className={`flex ${isSentByUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 shadow-md ${
          isSentByUser
            ? "bg-blue-500 text-white rounded-br-none" // Sent messages (right, blue)
            : "bg-gray-200 text-black rounded-bl-none" // Received messages (left, gray)
        }`}
      >
        {/* Show image if present */}
        {image && (
          <img
            src={image}
            alt="Sent content"
            className="max-w-full h-auto rounded-lg mb-2"
          />
        )}
        {/* Show text message */}
        {text && <p className="text-sm sm:text-base">{text}</p>}

        {/* Time display */}
        <p
          className={`text-[10px] sm:text-xs mt-1 ${
            isSentByUser ? "text-blue-200" : "text-gray-600"
          }`}
        >
          {timestamp ? moment(timestamp).format("hh:mm A") : "Time Unknown"}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
