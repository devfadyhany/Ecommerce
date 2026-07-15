import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Login() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  // //////////////////////////// DON'T CHANGE THE CODE ABOVE ////////////////////////////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data) {
        const userObj = res.data.user;
        const tokenStr = res.data.token;

        login(userObj, tokenStr);
        showSuccessToast("Login successful");
        navigate("/");
      }
    } catch (err) {
      showErrorToast("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="mx-auto flex flex-col w-[80%] shadow-4xl space-y-2"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          className="rounded-md py-2 px-3 border border-line focus:outline-none focus:ring-1 focus:ring-gold w-full bg-surface-fields text-ink"
          placeholder="enter your email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          className="rounded-md py-2 px-3 border border-line focus:outline-none focus:ring-1 focus:ring-gold w-full bg-surface-fields text-ink"
          placeholder="enter your password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          disabled={loading}
          className={`bg-gold font-bold text-on-gold py-2 px-4 rounded-md cursor-pointer hover:bg-gold-deep transition-all duration-200 mt-4 flex items-center justify-center gap-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-on-gold border-t-transparent" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}

export default Login;
