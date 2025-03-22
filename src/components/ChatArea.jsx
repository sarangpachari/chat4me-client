import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

function ChatArea() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "other", timestamp: "09:41" },
    { id: 2, text: "I'm doing great! Just finished that project we talked about.", sender: "user", timestamp: "09:42" },
    { id: 3, text: "That's awesome! Would love to see it sometime.", sender: "other", timestamp: "09:43" },
    { id: 4, text: "Sure! I can show you tomorrow during our meeting.", sender: "user", timestamp: "09:44" },
    { id: 5, image: "https://imgs.search.brave.com/3HiHUNx5IdAHvGMgsSf5y5ti1ukAbCuvBJdLO2az3CI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3ZpdGUvYXNz/ZXRzL3Bob3RvLUM4/cTBLUUhHLndlYnA", sender: "user", timestamp: "09:45" },
    { id: 6, image: "https://imgs.search.brave.com/3HiHUNx5IdAHvGMgsSf5y5ti1ukAbCuvBJdLO2az3CI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3ZpdGUvYXNz/ZXRzL3Bob3RvLUM4/cTBLUUhHLndlYnA", sender: "other", timestamp: "09:46" }
  ]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name="Argo"
        avatar="https://preview.redd.it/can-someone-find-me-the-full-picture-of-luffy-v0-h2pzsqum3vwc1.png?width=1400&format=png&auto=webp&s=874056ae179de44d273e13328f104a1eb1f9c50d"
        status="Online"
      />
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            image={message.image}
            timestamp={message.timestamp}
            sender={message.sender}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatArea;
