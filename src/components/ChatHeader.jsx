import React, { useContext, useState } from "react";
import { useChatContext } from "../contexts/ChatProvider";
import default_avatar from "../assets/default-avatar.svg";
import { clearAllChatsAPI, getMyAccountDetailsAPI } from "../services/allAPI";
import { MoreVertical, UserCircle, Trash2, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
// import default_avatar from "../assets/default-avatar.svg";

function ChatHeader({ name, avatar, userId, groupId }) {
  const { onlineUsers } = useChatContext();
  const isOnline = onlineUsers.includes(userId);
  const [viewProfileData, setViewProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setSelectedChat, setMessages } = useChatContext();

  //VIEW USER INFO
  const handleViewUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const result = await getMyAccountDetailsAPI(userId);
        if (result.status == 200) {
          setViewProfileData(result.data);
        } else if (result.status == 400) {
          console.log(result.data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No token found for view profile info");
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClearChat = () => {
    setShowDeleteModal(true);
    setShowDropdown(false);
  };

  const handleConfirmClear = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const reqHeader = {
        Authorization: token,
      };

      const loggedUser = JSON.parse(localStorage.getItem("user"));

      const reqBody = {
        senderId: loggedUser?._id,
        receiverId: userId,
      };

      if (reqBody && reqHeader) {
        try {
          const result = await clearAllChatsAPI(reqBody, reqHeader);
          if (result.status == 200) {
            setSelectedChat(null);
            setMessages((prevMessages) =>
              prevMessages.filter(
                (msg) =>
                  !(
                    (msg.senderId === loggedUser._id &&
                      msg.receiverId === userId) ||
                    (msg.senderId === userId &&
                      msg.receiverId === loggedUser._id)
                  )
              )
            );
          } else if (result.status == 400) {
            console.log(
              "Sender ID and Receiver ID are required & Token missing"
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setShowDeleteModal(false);
          setShowDropdown(false);
          setLoading(false);
        }
      } else {
        console.log("Sender ID and Receiver ID are required & Token missing");
      }
    }
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div
          onClick={() => {
            setShowDropdown(true);
          }}
          className="flex items-center"
        >
          <img
            src={avatar ? avatar : default_avatar}
            alt={name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div className="ml-3 sm:ml-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {name}
            </h2>
            <p className="text-xs sm:text-sm text-green-500">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              {userId && (<button
                onClick={() => {
                  setShowDropdown(false);
                  handleViewUserInfo();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Chat Profile
              </button>)}

              {groupId && (
                <Link to={`/group-info/${groupId}`}>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Group Profile
                  </button>
                </Link>
              )}
              <button
                onClick={handleClearChat}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-md flex items-center justify-center z-25">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Clear Chat History
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear all messages? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {viewProfileData && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-md flex items-center justify-center z-25">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <button
              onClick={() => setViewProfileData(null)}
              className="absolute top-4 left-4 md:left-auto md:right-4 p-2 text-gray-500 hover:text-gray-700 z-50"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={avatar ? avatar : default_avatar}
                alt={name}
                className="w-24 h-24 rounded-full bg-gray-200 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {viewProfileData?.username}
              </h3>
              <p className="text-green-500 mb-4">
                {isOnline ? "Online" : "Offline"}
              </p>
              <div className="w-full space-y-2">
                <div className="flex gap-2 justify-between p-2 rounded">
                  <span className="text-gray-600">Email ID :</span>
                  <span className="text-gray-800">
                    {viewProfileData?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatHeader;
