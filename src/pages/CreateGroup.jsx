import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Search, Users, ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom hook to debounce values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data for demonstration
  const mockUsers = [
    { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  ];

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const toggleUserSelection = useCallback((userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery, mockUsers]);

  const handleCreateGroup = () => {
    // TODO: Integrate group creation API call here
    console.log("Creating group with name:", groupName);
    console.log("Selected Users:", selectedUsers);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-md">
        {/* Header */}
        <div className="p-4 flex items-center">
          <Link to="/home" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="ml-4 text-xl font-semibold">Create New Group</h1>
        </div>

        {/* Group Name Input */}
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

        {/* Search and User List */}
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

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedUsers.map(userId => {
                const user = mockUsers.find(u => u.id === userId);
                return (
                  <div
                    key={userId}
                    className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-blue-800">{user?.name}</span>
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

          {/* User List */}
          <div className="space-y-2">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => toggleUserSelection(user.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${
                  selectedUsers.includes(user.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-3 flex-1">{user.name}</span>
                {selectedUsers.includes(user.id) ? (
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

        {/* Create Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedUsers.length === 0}
            className={`w-full py-2 px-4 rounded-lg ${
              groupName.trim() && selectedUsers.length > 0
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
