"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";


const Signin = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-100 ring-opacity-30`}
      >
        <div className="flex-1 p-6 flex gap-6 items-start">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="/assets/myavatar.png"
            alt="Avatar"
          />
          <div className="flex flex-col justify-center">
            <Link
              href="https://buildwithparadox.com"
              target="_blank"
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              buildwithparadox.com
            </Link>
            <p className="mt-2 text-sm text-gray-700">
              To view a demo of the Admin Panel Dashboard, please reach out via my portfolio. Access is restricted to admins only.
            </p>
          </div>
        </div>
        <div className="flex items-center border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-5 py-3 text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-lg"
          >
            Close
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-1 mt-3 md:px-20">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Form */}
          <div className="w-full lg:w-[60rem] flex items-center justify-center p-6 ml-10">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Sign In to Your Account
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Welcome back! Please enter your credentials to Sign in.
              </p>

              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-sm text-gray-600">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2">
                <button
                  // onClick={()=> signIn("google", { callbackUrl: "/" })}
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaGoogle className="mr-2 text-blue-500" />
                  Continue with Google
                </button>
                <button
                  // onClick={() => signIn("github", { callbackUrl: "/" })}
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FaGithub className="mr-2 text-gray-800" />
                  Continue with GitHub
                </button>
              </div>
            </div>
          </div>
          {/* Right Side: Image */}
          <div
            className="hidden lg:flex lg:w-[50rem] bg-center bg-no-repeat backdrop-blur-sm"
            style={{ backgroundImage: "url('/assets/admin_login.gif')" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
