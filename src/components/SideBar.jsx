import React, { useContext, useState } from "react";
import { User } from "lucide-react";
import ChatList from "./ChatList";
import { Link, useNavigate } from "react-router-dom";
import { loggedUserDataContext } from "../contexts/DataContextShare";
import { MdAccountCircle } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

function SideBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // CONTEXTS
  const { loggedUserData, setLoggedUserData } = useContext(
    loggedUserDataContext
  );
  const userData = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
    setLoggedUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
            {userData?.profileImg ? (
              <img
                src={userData.profileImg}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg ring-1 ring-gray-200 divide-y divide-gray-100 z-10">
              <ul className="text-sm text-gray-700">
                <li className="text-blue-500 text-lg px-4 py-5 border-2 border-gray-200 bg-gray-100 rounded-lg hover:bg-gray-100">
                  Hi,{" "}
                  <span className="text-red-500">
                    {userData?.username.charAt(0).toUpperCase() +
                      userData?.username.slice(1)}
                  </span>
                </li>
                <Link to="/account">
                  <li>
                    <button className="flex items-center gap-2 w-full text-left px-4 py-4 hover:bg-gray-100">
                      <MdAccountCircle size={20} />
                      My Account
                    </button>
                  </li>
                </Link>
                <li>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-4 hover:bg-gray-100 text-red-600"
                    onClick={() => setIsLogoutModalOpen(true)}
                  >
                    <IoIosLogOut size={20} />
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

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-70">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;