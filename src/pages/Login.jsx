import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = ["Welcome", "Email", "OTP", "Username"];

  const handleNext = () => setStep(step + 1);
  const handleSubmit = () => (step === 3 ? navigate("/home") : handleNext());
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-4">
        {/* Large Screens - Tabs */}
        <div className="hidden lg:flex justify-center space-x-8 w-full max-w-2xl pb-2 mb-4">
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

        <div className="flex w-full max-w-2xl bg-white rounded-lg shadow-lg">
          {/* Small to Medium Screens - Side Numbered Steps */}
          <div className="flex lg:hidden flex-col w-12 bg-gray-100 rounded-l-lg p-2 items-center">
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

          {/* Content Box */}
          <div className="flex-1 p-6">
            {step === 0 && (
              <div className="text-center">
                <h1 className="text-3xl font-medium mb-4 text-emerald-500">Welcome to <span className="text-red-500">Chat4me</span>.</h1>
                <button
                  onClick={handleNext}
                  className="bg-emerald-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Start Now
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Enter Your Email
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Choose a Username
                </h2>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
