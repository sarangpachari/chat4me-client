import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiNumpad } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUsernameAPI,
  generateOtpAPI,
  verifyOtpAPI,
} from "../services/allAPI";
import { isEmail } from "validator";
import { loggedUserDataContext } from "../contexts/DataContextShare";

const Login = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // CONTEXT DATA SHARING FOR USER DATA
  const { loggedUserData, setLoggedUserData } = useContext(
    loggedUserDataContext
  );

  //CHECK USER LOGINNED OR NOT
  const sessionChecking = ()=>{
    if(localStorage.getItem("token")){
      navigate("/home")
    }else{
      return null
    }
  }

  //TAB NAMES
  const steps = ["Welcome", "Email", "OTP", "Username"];

  //FOR TAB NEXT
  const handleNext = () => setStep((prev) => prev + 1);

  //EMAIL SUBMITTING
  const handleEmailSubmit = async () => {
    if (!email) {
      toast.warning("Please Enter your email");
    } else if (isEmail(email)) {
      let reqBody = {
        email: email,
      };
      try {
        const response = await generateOtpAPI(reqBody);
        if (response.status === 200) {
          toast.success("OTP sent successfully");
          handleNext();
        } else if (response.status === 500) {
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.");
      }
    } else if (!isEmail(email)) {
      toast.error("Invalid Email Address");
    }
  };

  //OTP SUBMITTING
  const handleOtpSubmit = async () => {
    if (!otp) {
      toast.warning("Please Enter OTP");
    } else if (otp) {
      let reqBody = {
        email: email,
        otp: otp,
      };
      try {
        const response = await verifyOtpAPI(reqBody);
        if (response.status === 202) {
          toast.success("OTP verification successful!");
          handleNext();
        } else if (response.status === 201) {
          toast.success("Login successful!");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            if (response.data) {
              setLoggedUserData(response.data.user);

              localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            navigate("/home");
          } else {
            console.log("Token not received from the server");
          }
        } else if (response.status === 400) {
          toast.error("Invalid OTP / Expired OTP");
        }
      } catch (error) {
        toast.error("OTP verification failed.");
      }
    }
  };

  //USERNAME CHECKING AND CREATING
  const handleUsernameSubmit = async () => {
    if (!username) {
      toast.warning("Please enter a username");
    } else if (username) {
      let reqBody = {
        email: email,
        username: username,
      };
      try {
        const response = await createUsernameAPI(reqBody);
        if (response.status === 201) {
          toast.success("Username is available!");
          if (response.data) {
            setLoggedUserData(response.data.newUser);
            localStorage.setItem("user", JSON.stringify(response.data.newUser));
          }
          navigate("/home");
        } else if (response.status === 400) {
          toast.warning("Username is taken. Try another.");
        }
      } catch (error) {
        toast.error("Error checking username.");
      }
    }
  };

  useEffect(()=>{
    sessionChecking()
  },[])


  return (
    <div className="h-lvh flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-red-50 text-gray-900 p-4">
      <div className="hidden lg:flex justify-center space-x-8 w-full max-w-2xl pb-4 mb-4">
        {steps.map((label, index) => (
          <button
            key={index}
            className={`text-sm font-semibold transition-all ${
              step === index
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400"
            }`}
            onClick={() => setStep(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center w-full h-72 max-w-xl bg-white rounded-lg border-t-6 border-t-yellow-500 shadow-md">
        <div className="flex lg:hidden flex-col w-12 rounded-l-lg p-2 items-center">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-full mb-2 transition-all ${
                step === index
                  ? "bg-red-500 text-white font-bold"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setStep(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6">
          {step === 0 && (
            <div className="text-center">
              <h1 className="sm:text-3xl text-xl font-medium mb-4 text-amber-500">
                Welcome to{" "}
                <span className="text-red-500 font-custom">Chat4me</span>.
              </h1>
              <button
                onClick={handleNext}
                className="bg-amber-500 hover:bg-amber-800 text-white px-4 py-2 rounded-md"
              >
                Start Now
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="md:text-2xl text-sm font-semibold mb-2 flex items-center gap-2">
                <MdEmail size={25} />
                Provide Your E-mail
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                Privacy Notice: Your email will remain confidential and won’t be
                shared with anyone.
              </p>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleEmailSubmit}
                className="mt-4 w-max float-end bg-amber-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
              >
                <FaArrowRightLong size={25} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="md:text-2xl text-sm font-semibold mb-4 flex items-center gap-2">
                <PiNumpad size={25} />
                Enter OTP
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                Security Notice: Your OTP is valid for 5 minutes only.
              </p>

              <input
                type="number"
                placeholder="OTP"
                className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleOtpSubmit}
                className="mt-4 w-max float-end bg-amber-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
              >
                <FaArrowRightLong size={25} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="md:text-2xl text-sm font-semibold mb-4 flex items-center gap-2">
                <FaCircleUser size={25} />
                Choose a username
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                Your username must be unique and will stay with you forever.
              </p>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                onClick={handleUsernameSubmit}
                className="mt-4 w-max px-5 float-end bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
