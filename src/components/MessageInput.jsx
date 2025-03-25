import React, { useContext, useState } from "react";
import { Send, File } from "lucide-react";
import { useChatContext } from "../contexts/ChatProvider";
import { loggedUserDataContext } from "../contexts/DataContextShare";

function MessageInput({ selectedUser }) {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  


  const {loggedUserData, setLoggedUserData} = useContext(loggedUserDataContext)
  console.log("selectedUser",selectedUser);
  

  const [message, setMessage] = useState("");
  
  const { socket, setMessages } = useChatContext();

  const sendMessage = async () => {
    if (!message.trim() && !file) return;
  
    let fileUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      
      console.log("file",file);
      
      const uploadRes = await axios.post(`${SERVER_BASE_URL}/upload`, formData);
      fileUrl = uploadRes.data.url;
      console.log(fileUrl);
      
    }
  
    const newMessage = { senderId: loggedUserData._id, receiverId: selectedUser._id, chat: message, image: fileUrl };
    
    socket.emit("message", newMessage);
    setMessage("");
    setFile(null);
  };
  

  return (
    <div className="p-2 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <button
          onClick={sendMessage}
          className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
