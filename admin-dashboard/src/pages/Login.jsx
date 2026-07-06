import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Failed to login: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="mx-auto w-[70%] gap-4 m-4 p-4 bg-gray-900 rounded-lg flex justify-between login-container">
        <div className="flex-3 h-128 dleft rounded-lg shrink-1 hidden lg:block">
          <h2 className="text-[25px] m-5 text-gray-900">Koda Commerce</h2>
          <h1 className="text-[30px] mt-12 text-gray-900">
            Manage Your Store Like a Pro
          </h1>
          <ul className="space-y-4 mt-20 text-gray-800 text-[16px]">
            <li className="w-full bg-[#e4cc8d] rounded-xl p-4">
              ✓ Product Management
            </li>
            <li className="w-full bg-[#e4cc8d] rounded-xl p-4">
              ✓ Order Tracking
            </li>
            <li className="w-full bg-[#e4cc8d] rounded-xl p-4">
              ✓ Customer Insights
            </li>
          </ul>
        </div>

        <div className="lg:flex-4 w-full h-128  rounded-lg shadow-md  lg:p-5 p-2 form-container ">
          <h2 className="text-4xl font-bold text-gray-800 text-center mt-13">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className={
              "relative space-y-7 flex flex-col w-full mt-13  shadow-4xl form-login"
            }
          >
            <div className="relative">
              <input
                type="text"
                placeholder="enter your email"
                {...register("email", emailRules)}
                className="rounded-md py-2 px-5 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full "
              />
              <p
                className={`${
                  isempty
                    ? "invisible transition-all duration-300 top-[6px] left-[14px] text-[16px] p-0"
                    : "visible block text-[8px] z-10 transition-all duration-300 -top-4 left-2 p-2 rounded-md"
                } absolute p-to-in text-gray-800 `}
              >
                enter your email
              </p>
              {errors.email && (
                <p className="text-[#f7872c] text-xs ml-2 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative space-y-2">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="enter your password"
                {...register("password", passwordRules)}
                className="rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full border border-gray-500"
              />
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
                <p className="text-[#f7872c] text-xs ml-2 -mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-center space-x-2 ml-2 mt-2 ">
                <input
                  type="checkbox"
                  checked={passwordVisible}
                  onChange={() => setPasswordVisible(!passwordVisible)}
                  className="rounded-full transition-all duration-200 cursor-pointer"
                />
                <p className=" text-gray-800 text-[12px]">Show Password</p>
              </div>
            </div>

            {/* زر الإرسال */}
            <button
              disabled={loading}
              type="submit"
              className={`bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition-all duration-200 -mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
