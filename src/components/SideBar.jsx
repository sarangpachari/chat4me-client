import React, { useState } from 'react';
import { User } from 'lucide-react';
import ChatList from './ChatList';
import { Link } from 'react-router-dom';

function SideBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 shadow-lg rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition focus:outline-none"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg ring-1 ring-gray-200 divide-y divide-gray-100 z-10">
              <ul className="text-sm text-gray-700">
                <Link to="/account">
                  <li>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      My Account
                    </button>
                  </li>
                </Link>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatList />
      </div>
    </div>
  );
}

export default SideBar;
