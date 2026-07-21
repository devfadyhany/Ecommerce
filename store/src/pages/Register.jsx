import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import api from "../api/axios";
import { CiMail, CiLock, CiUser, CiMobile3 } from "react-icons/ci";
import AuthInput from "../components/ui/auth/AuthInput";
import AuthLayout from "../components/layout/AuthLayout";
import AuthButton from "../components/ui/auth/AuthButton";
import AuthLink from "../components/ui/auth/AuthLink";

function Register() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // //////////////////////////// DON'T CHANGE THE CODE ABOVE ////////////////////////////
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email.trim() || !username.trim() || !password || !phone) {
        showErrorToast("Please fill in all fields");
        return;
      }

      if (password.length < 8 || password.length > 30) {
        showErrorToast("Password must be between 8 and 30 characters");
        return;
      }

      setLoading(true);
      const res = await api.post("/auth/register/send-otp", {
        username,
        email,
        password,
        phone,
      });

      if (res.data) {
        showSuccessToast("OTP sent successfully");
        navigate("/verify-otp", {
          state: { email }
        });
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Create an account"
        subtitle="Sign up to get started"
      >
        <form
          className="form-container mx-auto flex flex-col space-y-4 py-6 px-8 shadow-surface-fields shadow-2xl rounded-lg"
          onSubmit={handleRegister}
        >
          <AuthInput
            label="Username"
            icon={<CiUser />}
            type="text"
            value={username}
            required
            placeholder="johndoe"
            onChange={(e) => setUsername(e.target.value)}
          />
          <AuthInput
            label="Email"
            icon={<CiMail />}
            type="email"
            value={email}
            required
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            icon={<CiLock />}
            type="password"
            value={password}
            required
            minLength={8}
            maxLength={30}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthInput
            label="Phone Number"
            icon={<CiMobile3 />}
            type="tel"
            value={phone}
            required
            placeholder="+201234567890"
            onChange={(e) => setPhone(e.target.value)}
          />
          <AuthButton
            text="Create Account"
            loading={loading}
          />
          <AuthLink
            text="Already have an account?"
            linkText="Login"
            to="/login"
          />
        </form>
      </AuthLayout>
    </>
  );
}

export default Register;