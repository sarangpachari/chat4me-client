import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Edit2, Save, Plus, ArrowBigLeft } from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import { addMembersAPI, deleteGroupMembersAPI, getGroupAPI, searchUserAPI } from "../services/allAPI";
import moment from 'moment';

function GroupInfo() {
    const [groupName, setGroupName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const { groupId } = useParams();
    const [newMemberName, setNewMemberName] = useState('');
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
                alert("User removed successfully");
                fetchGroupInfo();
            } else {
                alert("Failed to remove user");
            }
        } catch (error) {
            console.error("Error removing member:", error);
            alert("Internal Server Error");
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
            const existingMembers = details.groupMembers.map(member => member._id);

            // console.log(existingMembers);

            // Filter out logged-in user and existing group members
            const filteredResults = data.users.filter(user =>
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
                alert("User added succesfully");
                fetchGroupInfo();
            } else {
                alert("Failed to add user user");
            }
        } catch (error) {
            console.error("Error removing member:", error);
            alert("Internal Server Error");
        }

    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Link to={'/home'}>
                        <button className='flex items-center space-x-2  mb-6 text-blue-600 font-semibold py-2 px-4 rounded-lg w-52  transition duration-300'>
                            <ArrowBigLeft className='w-5 h-5' />
                            <span>Back to Home</span>
                        </button>

                    </Link>
                    <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-blue-600">
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
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-white">{groupName}</h1>
                                    <button
                                        onClick={() => setIsEditingName(true)}
                                        className="p-1 text-white hover:bg-blue-700 rounded"
                                    >
                                        {/* <Edit2 size={20} /> */}
                                    </button>
                                </div>
                            )}
                            <div className='flex flex-col'>
                            <p className="text-white mb-2">Created by: {details.createdBy}</p>
                            <p className="text-white">Created at: {moment(details.createdAt).utcOffset(5.5).format('DD MMM YYYY - h:mm A')}</p>
                            </div>
                           
                        </div>
                    </div>

                    <div className="px-6 py-4 border-b">
                        <input
                            type="text"
                            placeholder="Search for a user..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {searchResults.length > 0 && (
                            <div className="mt-2 bg-white shadow-lg rounded-lg max-h-40 overflow-auto">
                                {searchResults.map(user => (
                                    <div key={user._id} className="p-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer border-b">
                                        <span className="text-gray-800">{user.username}</span>
                                        <button onClick={() => handleAddMember(user._id)} className="p-1 text-blue-600 hover:text-blue-800">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4">
                        <div className="grid gap-4">
                            {details.groupMembers?.map((member) => (
                                <div key={member._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <h3 className="font-medium text-gray-900">{member.username}</h3>
                                    <button
                                        onClick={() => handleDeleteMember(member._id)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
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
    );
}

export default GroupInfo;
