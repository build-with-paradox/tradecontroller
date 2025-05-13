"use client";

import React, { useState } from "react";

const OtpVerify: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (
    element: HTMLInputElement,
    index: number
  ): void => {
    if (isNaN(Number(element.value))) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on the next input if not the last
    if (element.value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("Enteblue OTP:", otp.join(""));
    // Add your OTP submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-md overflow-hidden px-1 max-w-4xl w-full">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-1 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Authenticate Your Account
          </h2>
          <p className="text-sm text-gray-600 text-center mb-3">
            Enter the 6-digit code we sent to your email
          </p>
          <hr className="mb-5"/>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 border rounded-md text-center text-lg font-semibold focus:ring focus:ring-blue-500 focus:outline-none"
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Continue
            </button>
          </form>

          {/* Resend OTP */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Didn’t receive the code?{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Resend OTP
            </button>
          </p>
        </div>

        {/* Right Side: Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/otp_verification.svg')", 
          }}
        ></div>
      </div>
    </div>
  );
};

export default OtpVerify;
