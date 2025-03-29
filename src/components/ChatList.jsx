import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import ChatPreview from "./ChatPreview";
import { useChatContext } from "../contexts/ChatProvider";
import { allMessagedUsersAPI, allMyGroupsAPI, searchUserAPI } from "../services/allAPI";
import {
  chatPreviewDataContext,
  loggedUserDataContext,
} from "../contexts/DataContextShare";

function ChatList() {
  const { setAllChatPreviewData } = useContext(chatPreviewDataContext);
  const { setSelectedChat, messages } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { loggedUserData } = useContext(loggedUserDataContext);
  const [myGroups, setMyGroups] = useState([]);

  // Mock group data for demonstration
  const mockGroups = [
    {
      _id: "group1",
      name: "Project Team",
      avatar: null,
      isGroup: true,
      members: ["user1", "user2", "user3"],
      lastMessage: "Meeting at 3 PM",
      timestamp: "2:30 PM",
      lastMessageSender: "John Doe",
    },
    {
      _id: "group2",
      name: "Family Group",
      avatar: null,
      isGroup: true,
      members: ["user1", "user4", "user5"],
      lastMessage: "Weekend plans?",
      timestamp: "11:20 AM",
      lastMessageSender: "Jane Smith",
    },
  ];

  const fetchMessagedUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const loggedUserId = loggedUserData?._id;
      if (!loggedUserId) return;

      const result = await allMessagedUsersAPI(loggedUserId, {
        Authorization: token,
      });

      if (result.status === 200) {
        setUsers(result?.data?.users);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchMyGroups = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const loggedUserId = loggedUserData?._id;
    if (!loggedUserId) return;
    if (token) {
      const reqHeader = {
        Authorization: token,
      };
      try {
        const result = await allMyGroupsAPI(loggedUserId, reqHeader);
        if (result.status === 200) {
          setMyGroups(result?.data?.groups);
        } else {
          console.log("Error fetching groups !");
        }
      } catch (error) {
        console.error("Error fetching groups", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Token not getting from local storage !");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagedUsers();
    fetchMyGroups();
  }, [messages]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) return setSearchResults([]);

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

  console.log(myGroups);
  

  return (
    <div className="relative flex flex-col h-full bg-white shadow-md rounded-lg">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Groups Section */}
      {myGroups.length > 0 && (
        <div className="mb-4">
          <h3 className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
            Groups
          </h3>
          {myGroups.map((group) => (
            <ChatPreview
              key={group._id}
              userId={group._id}
              name={group.name}
              avatar={group.groupIcon}
              lastMessage="Tap to Chat"
              isGroup={true}
              memberCount={group.groupMembers.length}
              onClick={() => {
                setAllChatPreviewData(group);
                setSelectedChat(group);
              }}
            />
          ))}
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500 p-2">Searching...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <ChatPreview
                key={user._id}
                userId={user._id}
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

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50">
          My Chats
        </h3>
        {loading && !searchQuery ? (
          <p className="text-center text-gray-500 mt-4">Loading chats...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <ChatPreview
              key={user._id}
              userId={user._id}
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
