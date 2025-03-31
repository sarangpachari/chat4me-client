import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

//GENERATE OTP API
export const generateOtpAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/auth/generate-Otp`,
    reqBody
  );
};

//VERIFY OTP API
export const verifyOtpAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_BASE_URL}/auth/verify-Otp`, reqBody);
};

//CREATE USERNAME API
export const createUsernameAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/auth/create-username`,
    reqBody
  );
};

//SEARCH USER API
export const searchUserAPI = async (query) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/user/search-User?search=${query}`
  );
};

//MESSAGES USERS API
export const allMessagedUsersAPI = async (loggedUserId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/user/get-Chat-Users/${loggedUserId}`,
    {},
    reqHeader
  );
};

//GET SINGLE USER DATA
export const getMyAccountDetailsAPI = async (myUserId) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/user/user-Info/${myUserId}`,
    {}
  );
};

//UPDATE USERNAME API
export const updateUsernameAPI = async (reqBody) => {
  return await commonAPI(
    "PUT",
    `${SERVER_BASE_URL}/user/update-Username`,
    reqBody
  );
};

//CLEAR ALL CHATS API
export const clearAllChatsAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_BASE_URL}/user/clear-all-chats`,
    reqBody,
    reqHeader
  );
};

//DELETE SINGLE MESSAGE API
export const deleteSingleMessageAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_BASE_URL}/user/remove-message/${id}`,
    {},
    reqHeader
  );
};

//UPDATE USER PROFILE API
export const updateUserProfilePictureAPI = async (id, formData, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_BASE_URL}/user/update-Profile/${id}`,
    formData,
    reqHeader
  );
};

//FETCHING ALL MY GROUPS API
export const allMyGroupsAPI = async (loggedUserId, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/grp/get-all-groups/${loggedUserId}`,
    {},
    reqHeader
  );
};

//CREATE Grpup
export const createGroupAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/grp/create-group`,
    reqBody, reqHeader
  );
};

// get group api
export const getGroupAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/grp/group-info/${id}`,
    {},
    reqHeader
  );
};

//DELETE GROUP MEMBERS API
export const deleteGroupMembersAPI = async (id,reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_BASE_URL}/grp/group-remove-user/${id}`,
    reqBody,
    reqHeader
  );
};
//DELETE GROUP MEMBERS API
export const addMembersAPI = async (id,reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_BASE_URL}/grp/group-add-user/${id}`,
    reqBody,
    reqHeader
  );
};
//DELETE GROUP Api
export const deleteGroupAPI = async (id,reqBody, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_BASE_URL}/grp/group-remove/${id}`,
    reqBody,
    reqHeader
  );
};