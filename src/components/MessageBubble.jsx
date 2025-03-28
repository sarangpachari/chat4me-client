import React, { useState } from "react";
import moment from "moment";
import { Edit2, Trash2 } from "lucide-react";

function MessageBubble({ text, timestamp, senderId, loggedInUserId, deleteMsg, messageId }) {
  const isSentByUser = senderId === loggedInUserId;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedText, setEditedText] = useState(text);

  if (!text) return null;

  // Check if the text is a Cloudinary image URL
  const isImageMessage = text.startsWith("https://res.cloudinary.com");

  const handleContextMenu = (e) => {
    if (isSentByUser) {
      e.preventDefault();

      const menuWidth = 200;
      const menuHeight = 100;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > screenWidth) x = screenWidth - menuWidth - 10;
      if (y + menuHeight > screenHeight) y = screenHeight - menuHeight - 10;

      setContextMenuPosition({ x, y });
      setShowContextMenu(true);
    }
  };

  const handleEdit = () => {
    setShowContextMenu(false);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowContextMenu(false);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    // Add your edit message logic here
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    deleteMsg();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`flex ${isSentByUser ? "justify-end" : "justify-start"}`}
        onContextMenu={handleContextMenu}
      >
        <div
          className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 shadow-md ${
            isSentByUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {isImageMessage ? (
            <img
              src={text}
              alt="Sent content"
              className="max-w-full h-auto rounded-lg mb-2"
            />
          ) : (
            <p className="text-sm sm:text-base">{text}</p>
          )}
          <p
            className={`text-[10px] sm:text-xs mt-1 ${
              isSentByUser ? "text-blue-200" : "text-gray-600"
            }`}
          >
            {timestamp ? moment(timestamp).format("hh:mm A") : "Time Unknown"}
          </p>
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setShowContextMenu(false)}
          />
          <div
            className="fixed bg-white rounded-lg shadow-lg z-50 border border-gray-200"
            style={{
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
            }}
          >
            <button
              onClick={handleEdit}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Message
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Message
            </button>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Message</h3>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Message</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageBubble;
