import React, { useContext, useState } from "react";
import { Search } from "lucide-react";
import ChatPreview from "./ChatPreview";
import { useChatContext } from "../contexts/ChatProvider";
import { searchUserAPI } from "../services/allAPI";
import { chatPreviewDataContext } from "../contexts/DataContextShare";

function ChatList() {
  const { allChatPreviewData, setAllChatPreviewData } = useContext(
    chatPreviewDataContext
  );
  const { chatPreviewData, setSelectedChat } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search input change
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await searchUserAPI(query);
      setSearchResults(data.users);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && <p className="text-center text-gray-500">Searching...</p>}

        {/* Show search results if searchQuery is active */}
        {searchQuery
          ? searchResults.map((user) => (
              <ChatPreview
                key={user._id}
                name={user.username}
                avatar={user.avatar}
                lastMessage="Tap to chat"
                timestamp=""
                onClick={() => {
                  setAllChatPreviewData(user);
                  setSelectedChat(user);
                }}
              />
            ))
          : chatPreviewData.map((chat) => (
              <ChatPreview
                key={chat._id}
                name={chat.receiverName}
                avatar={chat.receiverAvatar}
                lastMessage={chat.chat}
                timestamp={moment(chat.createdAt).format("hh:mm A")}
                onClick={() => setAllChatPreviewData(chat.receiverId)}
              />
            ))}
      </div>
    </div>
  );
}

export default ChatList;
