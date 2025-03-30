import React, { useState, useEffect, useContext } from "react";
import { Search, Users, ArrowLeft, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { searchUserAPI, createGroupAPI } from "../services/allAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { groupCreatedResponseContext } from "../contexts/ResponseContextShare";


function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [creating, setCreating] = useState(false);
  const naviagete = useNavigate()

  //CONTEXTS
  const {groupCreatedResponse,setGroupCreatedResponse} = useContext(groupCreatedResponseContext)
  

  // For holding users mapped by userId to improve lookup speed
  const userMap = new Map(searchResults.map((user) => [user._id, user]));

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return setSearchResults([]);
  
    setLoading(true);
    try {
      const { data } = await searchUserAPI(searchQuery);
      const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
  
      // Exclude the logged-in user from the search results
      const filteredResults = data.users.filter(user => user._id !== loggedInUserId);
  
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };
  

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      return alert("Group name and at least one member are required!");
    }

    setCreating(true);
    const loggedInUserId = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const reqBody = {
      name: groupName,
      userId: loggedInUserId._id,
      groupMember: selectedUsers,
    };

    const reqHeader = {
      Authorization: token,
    };

    try {
      const response = await createGroupAPI(reqBody, reqHeader);

      if (response.status === 200) {
        toast.success("Group created successfully!");
        setGroupName("");
        setSelectedUsers([]);
        setGroupCreatedResponse(response.data)
        naviagete('/home')
      } else if (response.status === 400) {
        toast.warning("Add at least one member");
      } else {
        throw new Error("Failed to create group.");
      }
    } catch (error) {
      console.error("Group creation error:", error);
      toast.error("Error creating group. Please try again.");
    }
    setCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-md">
        <div className="p-4 flex items-center">
          <Link to="/home" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="ml-4 text-xl font-semibold">Create New Group</h1>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {loading && (
            <div className="text-center text-gray-500">Searching...</div>
          )}

          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedUsers.map((userId) => {
                const user = userMap.get(userId);
                return (
                  <div
                    key={userId}
                    className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
                  >
                    <img
                      src={user?.avatar || "default-avatar.png"}
                      alt={user?.username}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-blue-800">
                      {user?.username}
                    </span>
                    <button
                      onClick={() => toggleUserSelection(userId)}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-2">
            {searchResults.map((user) => (
              <div
                key={user._id}
                onClick={() => toggleUserSelection(user._id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${
                  selectedUsers.includes(user._id)
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={user.profileImg || "default-avatar.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-3 flex-1">{user.username}</span>
                {selectedUsers.includes(user._id) ? (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreateGroup}
            disabled={
              creating || !groupName.trim() || selectedUsers.length === 0
            }
            className={`w-full py-2 px-4 rounded-lg ${
              creating
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : groupName.trim() && selectedUsers.length > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {creating ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
