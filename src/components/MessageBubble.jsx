import React from 'react';

function MessageBubble({ text, timestamp, sender, image }) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {image && (
          <img 
            src={image} 
            alt="Sent content" 
            className="max-w-full h-auto rounded-lg mb-2"
          />
        )}
        {text && <p className="text-sm sm:text-base">{text}</p>}
        <p className={`text-[10px] sm:text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
