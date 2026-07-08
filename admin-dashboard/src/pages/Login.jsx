import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { MdOutlinePassword } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

const emailRules = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email format",
  },
};

const passwordRules = {
  required: "password required",
  minLength: {
    value: 8,
    message: "password must be at least 8 characters long",
  },
};

function Login() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const isempty = emailValue.trim() === "";
  const isempty2 = passwordValue.trim() === "";

  const handleLogin = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data) {
        const userObj = res.data.user;
        const tokenStr = res.data.token;

        login(userObj, tokenStr);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Failed to login: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between login-container shadow-xl overflow-hidden">
          {/* Left side - info panel, hidden below lg */}
          <div className="hidden lg:flex lg:w-1/2 rounded-l-3xl px-8 py-16 d-login justify-center items-center">
            <div className="space-y-4">
              <h2 className="text-3xl ml-2 font-bold flex items-center">
                <FiShoppingBag /> &nbsp; Koda Commerce
              </h2>
              <h1 className="text-5xl font-bold leading-snug">
                Manage Your Store Like a Pro
              </h1>
              <p className="text-md pb-7">
                Control products, orders, users, carts and analytics from a
                modern dashboard experience
              </p>
              <ul className="space-y-4 text-md">
                <li className="w-full bg-[#fff2bc] rounded-xl p-3">
                  ✓ Product Management
                </li>
                <li className="w-full bg-[#fff2bc] rounded-xl p-3">
                  ✓ Order Tracking
                </li>
                <li className="w-full bg-[#fff2bc] rounded-xl p-3">
                  ✓ Customer Insights
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - login form, always full width below lg */}
          <div className="w-full lg:w-1/2 rounded-3xl lg:rounded-l-none lg:rounded-r-3xl p-2 py-24 form-container">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center mb-8">
                <img src="./logoo.svg" className="size-16 mb-8" />
                <h2 className="text-3xl font-bold text-center mb-2">
                  Welcome Back
                </h2>
                <p>Sign in to your admin dashboard</p>
              </div>

              <form
                onSubmit={handleSubmit(handleLogin)}
                className="relative flex flex-col w-[80%] shadow-4xl form-login"
              >
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="enter your email"
                    {...register("email", emailRules)}
                    className="rounded-md py-2 px-3 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full pl-11"
                  />
                  <p className="absolute text-xl top-[10px] left-3">
                    <FaEnvelope />
                  </p>
                  <p
                    className={`${
                      isempty
                        ? "invisible transition-all duration-300 top-[6px] left-[14px] text-[16px] p-0"
                        : "visible block text-[8px] z-10 transition-all duration-300 -top-4 left-2 p-2 rounded-md"
                    } absolute p-to-in text-gray-800`}
                  >
                    enter your email
                  </p>
                  {errors.email && (
                    <p className="text-[#ff3700] text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative space-y-2 mb-4">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="enter your password"
                    {...register("password", passwordRules)}
                    className="rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full border border-gray-500 pl-11"
                  />
                  <p className="absolute text-2xl top-2 left-3">
                    <MdOutlinePassword />
                  </p>
                  <p
                    className={`${
                      isempty2
                        ? "invisible transition-all duration-300 top-[6px] left-[14px] text-[16px] p-0"
                        : "visible block text-[8px] z-10 transition-all duration-300 -top-3 left-2 px-2 py-1 rounded-md"
                    } absolute p-to-in text-gray-800`}
                  >
                    enter your password
                  </p>
                  {errors.password && (
                    <p className="text-[#ff3700] text-xs -mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      checked={passwordVisible}
                      onChange={() => setPasswordVisible(!passwordVisible)}
                      className="rounded-full transition-all duration-200 cursor-pointer"
                    />
                    <p className="text-gray-800 text-[12px]">Show Password</p>
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className={`bg-yellow-400 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-yellow-500 transition-all duration-200 mt-4 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
