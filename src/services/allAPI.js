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
