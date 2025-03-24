import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import ChatPreview from "./ChatPreview";
import { useChatContext } from "../contexts/ChatProvider";
import { allMessagedUsersAPI, searchUserAPI } from "../services/allAPI";
import {
  chatPreviewDataContext,
  loggedUserDataContext,
} from "../contexts/DataContextShare";

function ChatList() {
  const { setAllChatPreviewData } = useContext(chatPreviewDataContext);
  const { setSelectedChat } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { loggedUserData } = useContext(loggedUserDataContext);

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

  const fetchMessagedUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not logged in");
      return;
    }
    const loggedUserId = loggedUserData?._id;
    const reqHeader = { Authorization: token };
    
    if (loggedUserId) {
      try {
        const result = await allMessagedUsersAPI(loggedUserId, reqHeader);
        if (result.status === 200) {
          setUsers(result?.data?.users);
        } else {
          console.log("No chats found or server error.");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
  };

  useEffect(() => {
    fetchMessagedUsers();
  }, []);

  return (
    <div className="relative flex flex-col h-full">
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

      {searchQuery && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
          {loading && <p className="text-center text-gray-500 p-2">Searching...</p>}
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <ChatPreview
                key={user._id}
                name={user.username}
                avatar={user.avatar}
                lastMessage="Tap to chat"
                timestamp=""
                onClick={() => {
                  setAllChatPreviewData(user);
                  setSelectedChat(user);
                  setSearchQuery("");
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 p-2">No users found</p>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {loading && !searchQuery ? (
          <p className="text-center text-gray-500 mt-4">Loading chats...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
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
        ) : (
          <p className="text-center text-gray-500 mt-4">No chats available</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
