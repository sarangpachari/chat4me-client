import React, { useEffect, useState } from "react";
import { User, Mail, LogOut, Home, Check, X, Settings, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { getMyAccountDetailsAPI, updateUsernameAPI } from "../services/allAPI";

function Account() {
  const [myDetails, setMyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchMyAccountDetails = async () => {
    setLoading(true);
    const myData = JSON.parse(localStorage.getItem("user"));
    const myId = myData?._id;
    try {
      const result = await getMyAccountDetailsAPI(myId);
      if (result.status === 200) {
        setMyDetails(result.data);
      } else {
        console.log("Error fetching details");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAccountDetails();
  }, []);

  const handleUpdate = async () => {
   
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
            <Link to={"/home"}>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Home size={20} />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Profile Image or User Icon */}
                {myDetails?.profileImage ? (
                  <img
                    src={myDetails.profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-600"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full border-4 border-blue-600">
                    <User size={40} className="text-gray-500" />
                  </div>
                )}

                {/* Edit Image Button */}
                <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                  <Upload size={18} />
                  <span>Edit Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-400" size={20} />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500">User Name</p>
                    <p className="text-gray-900">{myDetails?.username}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-gray-400" size={20} />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{myDetails?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section with Edit Button */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <nav className="space-y-2">
                {/* Edit Account Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  <Settings size={20} />
                  <span>Edit Account</span>
                </button>

                {/* Sign Out Button */}
                <button className="w-full flex items-center space-x-3 p-3 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Modal for Updating Account Details */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-md">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Account Details
              </h3>

              <div className="space-y-4">
                {/* Username Input */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-400" size={20} />
                  <input
                    type="text"
                    className="flex-grow border px-2 py-1 rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Enter new username"
                  />
                </div>

                {/* Email Input */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-gray-400" size={20} />
                  <input
                    type="email"
                    className="flex-grow border px-2 py-1 rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Enter new email"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
