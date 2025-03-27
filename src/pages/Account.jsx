import React, { useEffect, useState } from "react";
import { User, Mail, Camera, LogOut, Home, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getMyAccountDetailsAPI, updateUsernameAPI } from "../services/allAPI";

function Account() {
  const [myDetails, setMyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

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

  const handleUpdateUsername = async () => {
    try {
      const myId = myDetails._id;
      const reqBody = {
        userId: myId,
        newUsername: newUsername,
      };
      const result = await updateUsernameAPI(reqBody);
      if (result.status === 200) {
        setMyDetails({ ...myDetails, username: newUsername });
        setEditing(false);
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating username", error);
    }
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={myDetails.profileImg?myDetails.profileImg:""}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-400" size={20} />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500">User Name</p>
                    {editing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="border px-2 py-1 rounded-lg"
                        />
                        <button
                          onClick={handleUpdateUsername}
                          className="text-green-600"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="text-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <p
                        className="text-gray-900 cursor-pointer hover:underline"
                        onClick={() => {
                          setNewUsername(myDetails.username);
                          setEditing(true);
                        }}
                      >
                        {myDetails?.username}
                      </p>
                    )}
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Settings
              </h3>
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <LogOut className="text-red-600" size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
