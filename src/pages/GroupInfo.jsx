import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Trash2,
  Edit2,
  Save,
  Plus,
  ArrowBigLeft,
  PlusSquareIcon,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  addMembersAPI,
  deleteGroupMembersAPI,
  getGroupAPI,
  searchUserAPI,
} from "../services/allAPI";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";


function GroupInfo() {
  const [groupName, setGroupName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const { groupId } = useParams();
  const [newMemberName, setNewMemberName] = useState("");
  const [details, setDetails] = useState({ groupMembers: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // featch data to dispaly on the page
  const fetchGroupInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    const reqHeader = { Authorization: token };

    try {
      const response = await getGroupAPI(groupId, reqHeader);
      if (response.status === 200) {
        setGroupName(response.data.name);
        setDetails(response.data);
      } else if (response.status === 400) {
        alert("Group not found");
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      console.error("Error fetching group info:", error);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, [groupId]);

  // delete users from group
  const handleDeleteMember = async (memberId) => {
    const token = localStorage.getItem("token");
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    let id = loggedUser._id;

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    const reqBody = { userId: memberId, groupId };
    const reqHeader = { Authorization: `${token}` };

    try {
      const response = await deleteGroupMembersAPI(id, reqBody, reqHeader);
      if (response.status === 200) {
        toast.success("User removed successfully");
        fetchGroupInfo();
      } else if(response.status == 400) {
        toast.warning("Unauthorized: Only the group creator can remove members");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Internal Server Error");
    }
  };
  // to search for users who are not in the group
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) return setSearchResults([]);

    setLoading(true);
    try {
      const { data } = await searchUserAPI(query);
      const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
      const existingMembers = details.groupMembers.map((member) => member._id);

      // console.log(existingMembers);

      // Filter out logged-in user and existing group members
      const filteredResults = data.users.filter(
        (user) =>
          user._id !== loggedInUserId && !existingMembers.includes(user._id)
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  // to addmemebres to existing code
  const handleAddMember = async (memberId) => {
    console.log(memberId);
    const token = localStorage.getItem("token");
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    let id = loggedUser._id;

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    const reqBody = { userId: memberId, groupId };
    const reqHeader = { Authorization: `${token}` };
    try {
      const response = await addMembersAPI(id, reqBody, reqHeader);
      if (response.status === 200) {
        toast.success("User added succesfully");
        fetchGroupInfo();
      } else if (response.status === 400) {
        toast.warning("Unauthorized: Only the group creator can add members");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Internal Server Error");
    }
  };

  

  return (
    <>
      <div className="min-h-screen bg-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={"/home"}>
              <button className="flex items-center space-x-2  mb-6 text-emerald-600 font-semibold py-2 px-2 rounded-lg border mt-5 ms-5  transition duration-300">
                <ArrowBigLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </Link>
            <div className="px-6 py-8 bg-gradient-to-bl from-emerald-400 to-emerald-800">
              <div className="flex items-center justify-between">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="text-2xl font-bold text-white bg-transparent border-b-2 border-white focus:outline-none"
                    />
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-1 text-white hover:bg-blue-700 rounded"
                    >
                      <Save size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2  border p-4 rounded-lg shadow-xl border-none bg-gray-50/10">
                    <h1 className="text-2xl font-bold text-white">
                      {groupName}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-white hover:bg-blue-700 rounded"
                    >
                      {/* <Edit2 size={20} /> */}
                    </button>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <p className="text-white md:text-base text-sm">
                    Created by: {details.createdBy}
                  </p>
                  <p className="text-white md:text-base text-sm">
                    Created At:{" "}
                    {moment(details.createdAt)
                      .utcOffset(5.5)
                      .format("DD MMM YYYY - h:mm A")}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="mb-4 text-sm md:text-lg flex items-center gap-2"> <PlusSquareIcon/> Add new participants</p>
              <input
                type="text"
                placeholder="Search for a user..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 p-4 bg-emerald-100 shadow-lg rounded-lg max-h-40 overflow-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user._id}
                      className="p-2 flex justify-between bg-emerald-100 items-center hover:bg-gray-100 cursor-pointer rounded-xl"
                    >
                      <span className="text-gray-800">{user.username}</span>
                      <button
                        onClick={() => handleAddMember(user._id)}
                        className="p-1 text-emerald-800 hover:text-blue-800"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-emerald-100">
              <div className="grid gap-4">
                <p className="flex items-center gap-2 text-sm md:text-lg"><User/><span className="text-slate-800 font-medium">{details.groupMembers?.length}</span> Participants </p>
                {details.groupMembers?.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-4 bg-emerald-700 rounded-lg hover:bg-emerald-400 transition-colors"
                  >
                    <h3 className="font-medium text-white">
                      {member.username}
                    </h3>
                    <button
                      onClick={() => handleDeleteMember(member._id)}
                      className="p-2 text-white hover:bg-red-500 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default GroupInfo;
