import React, { useState, useContext, useEffect } from "react";
import { Send, File, X, Loader } from "lucide-react";
import { useChatContext } from "../contexts/ChatProvider";
import { loggedUserDataContext } from "../contexts/DataContextShare";

function MessageInput({ selectedUser }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { socket } = useChatContext();
  const { loggedUserData } = useContext(loggedUserDataContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Read file as base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFile({
        data: reader.result.split(",")[1],
        mimetype: selectedFile.type,
      });

      // Check if it's an image or video and set preview
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(reader.result); // Set image preview
      } else if (selectedFile.type.startsWith("video/")) {
        setFilePreview({ type: "video", src: reader.result }); // Set video preview
      } else {
        setFilePreview({ type: "file", name: selectedFile.name }); // For other file types
      }
    };
  };

  const sendMessage = () => {
    if (!message.trim() && !file) return;
    setUploading(true);

    if (file) {
      // Send file via Socket.IO

      socket.emit("sendFile", {
        senderId: loggedUserData._id,
        receiverId: selectedUser._id,
        file,
      });
    } else {
      // Send text message via Socket.IO
      socket.emit("message", {
        senderId: loggedUserData._id,
        receiverId: selectedUser._id,
        chat: message,
      });
      setUploading(false);
    }

    // Clear input fields
    setMessage("");
    setFile(null);
    setFilePreview(null);
  };

  useEffect(() => {
    const handleFileUploaded = () => {
      console.log("File uploaded event received"); // Debugging
      setUploading(false);
    };

    socket.on("fileUploaded", handleFileUploaded);

    return () => {
      socket.off("fileUploaded", handleFileUploaded);
    };
  }, [socket]);

  return (
    <div className="p-2 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <label className="cursor-pointer">
          <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600" />
          <input type="file" hidden onChange={handleFileChange} />
        </label>

        {/* Show File Preview */}
        {filePreview && (
          <div className="relative flex items-center space-x-2 border p-2 rounded-lg bg-gray-100">
            {filePreview.type === "video" ? (
              <video
                src={filePreview.src}
                className="w-20 h-20 rounded-md"
                controls
              />
            ) : filePreview.type === "file" ? (
              <p className="text-sm text-gray-700">{filePreview.name}</p>
            ) : (
              <img
                src={filePreview}
                alt="Preview"
                className="w-16 h-16 rounded-md"
              />
            )}
            <button
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
            >
              <X className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        )}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={uploading ? "Uploading file..." : "Type your message..."}
          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          disabled={uploading} 
        />

        <button
          onClick={sendMessage}
          className={`p-1.5 sm:p-2 ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-full`}
          disabled={uploading} 
        >
          {uploading ? (
            <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
