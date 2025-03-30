import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Camera,
  LogOut,
  Home,
  Check,
  X,
  Upload,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getMyAccountDetailsAPI,
  updateUsernameAPI,
  updateUserProfilePictureAPI,
} from "../services/allAPI";
import { changeProfilePictureResponseContext } from "../contexts/ResponseContextShare";

function Account() {
  const [myDetails, setMyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { changeProfilePictureResponse, setChangeProfilePictureResponse } =
    useContext(changeProfilePictureResponseContext);

  const navigate = useNavigate();

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
  }, [changeProfilePictureResponse]);

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
        console.log("Username changed !");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating username", error);
    }
  };

  //HANDLE UPDATE PROFILE PHOTO
  const handleUploadImage = async () => {
    if (!selectedImage) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage); // Key must match backend `upload.single("profileImg")`

    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      };

      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user._id;

        const result = await updateUserProfilePictureAPI(
          id,
          formData,
          reqHeader
        );

        if (result.status == 200) {
          console.log("Image uploaded successfully:", result.data.profileImg);
          setChangeProfilePictureResponse(result.data.profileImg);
          setSelectedImage(null);
        } else {
          console.log("Upload failed:", result.data.message);
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error uploading image", error);
        setSelectedImage(null);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No token found");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
              <div className="flex md:items-start items-center justify-center flex-col gap-5 space-x-4">
                {/* Profile Image or User Icon */}
                {myDetails?.profileImg ? (
                  <img
                    src={myDetails.profileImg}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full border-4 border-blue-600">
                    <User size={40} className="text-gray-500" />
                  </div>
                )}

                {/* Edit Image Button */}
                {loading ? (
                  <>
                    <p className="text-center text-green-600">Uploading...!</p>
                  </>
                ) : selectedImage ? (
                  <button
                    className="bg-emerald-700 flex items-center gap-2 px-4 py-2 rounded-full text-white"
                    onClick={handleUploadImage}
                  >
                    upload
                    <Upload size={18} />
                  </button>
                ) : (
                  <>
                    <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition flex items-center gap-2">
                      <Edit size={18} />
                      <span>Edit Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                      />
                    </label>
                  </>
                )}
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
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
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
