import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

//GENERATE OTP API
export const generateOtpAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_BASE_URL}/auth/generate-otp`,
    reqBody
  );
};

//VERIFY OTP API
export const verifyOtpAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_BASE_URL}/auth/verify-otp`, reqBody);
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

//GET LOGGED USER DATA
export const getMyAccountDetailsAPI = async (myUserId) => {
  return await commonAPI(
    "GET",
    `${SERVER_BASE_URL}/user/user-Info/${myUserId}`,
    {},
  );
};
