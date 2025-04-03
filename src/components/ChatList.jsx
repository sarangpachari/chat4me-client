import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import ChatPreview from "./ChatPreview";
import { useChatContext } from "../contexts/ChatProvider";
import {
  allMessagedUsersAPI,
  allMyGroupsAPI,
  searchUserAPI,
} from "../services/allAPI";
import { chatPreviewDataContext } from "../contexts/DataContextShare";
import { groupCreatedResponseContext, permanentGroupDeleteResponseContext } from "../contexts/ResponseContextShare";

function ChatList() {
  const { setAllChatPreviewData } = useContext(chatPreviewDataContext);
  const { setSelectedChat } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const loggedUserData = JSON.parse(localStorage.getItem("user"));
  const [myGroups, setMyGroups] = useState([]);
    const {permanentGroupDeleteResponse,setPermanentGroupDeleteResponse}= useContext(permanentGroupDeleteResponseContext)
  

  //CONTEXTS
  const { groupCreatedResponse, setGroupCreatedResponse } = useContext(
    groupCreatedResponseContext
  );

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
      const reqHeader = { Authorization: token };
      try {
        const result = await allMyGroupsAPI(loggedUserId, reqHeader);
        if (result.status === 200) {
          setMyGroups(result?.data?.groups);
        }
      } catch (error) {
        console.error("Error fetching groups", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMessagedUsers();
    fetchMyGroups();
  }, [groupCreatedResponse,permanentGroupDeleteResponse]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) return setSearchResults([]);

   
    try {
      const { data } = await searchUserAPI(query);

      setSearchResults(data.users);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white  rounded-xl">
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Chat & Group List */}
      <div className="p-4 space-y-2">
        {/* Groups Section */}
        {myGroups.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500">Groups</h3>
            <div className="space-y-2">
              {myGroups.map((group) => (
                <ChatPreview
                  key={group._id}
                  userId={group._id}
                  name={group.name}
                  avatar={group.groupIcon}
                  lastMessage="Tap to Chat"
                  isGroup={true}
                  memberCount={group.groupMembers.length+1}
                  onClick={() => {
                    setAllChatPreviewData(group);
                    setSelectedChat(group);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* My Chats Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500">
            {searchQuery ? "Search Results" : "My Chats"}
          </h3>
          <div className="space-y-2">
            {searchQuery
              ? searchResults.map((user) => (
                  <ChatPreview
                    key={user._id}
                    userId={user._id}
                    name={user.username}
                    avatar={user.avatar}
                    lastMessage="Tap to chat"
                    onClick={() => {
                      setAllChatPreviewData(user);
                      setSelectedChat(user);
                    }}
                  />
                ))
              : users.map((user) => (
                  <ChatPreview
                    key={user._id}
                    userId={user._id}
                    name={user.username}
                    avatar={user.avatar}
                    lastMessage="Tap to chat"
                    onClick={() => {
                      setAllChatPreviewData(user);
                      setSelectedChat(user);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
