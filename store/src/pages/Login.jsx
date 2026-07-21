import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { CiMail, CiLock } from "react-icons/ci";
import AuthInput from "../components/ui/auth/AuthInput";
import AuthLayout from "../components/layout/AuthLayout";
import AuthButton from "../components/ui/auth/AuthButton";
import AuthLink from "../components/ui/auth/AuthLink";

function Login() {
  const token = localStorage.getItem("token");

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
      if (!email.trim() || !password) {
        showErrorToast("Please fill in all fields");
        return;
      }

      if (password.length < 8 || password.length > 30) {
        showErrorToast("Password must be between 8 and 30 characters");
        return;
      }

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
      showErrorToast(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <form
        className="form-container mx-auto flex flex-col space-y-4 py-6 px-8 shadow-surface-fields shadow-2xl rounded-lg"
        onSubmit={handleLogin}
      >
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
        <Link
          to="/forgot-password"
          className="text-gold text-decoration-none hover:underline hover:text-gold-deep ml-1"
        >
          Forgot Password?
        </Link>
        <AuthButton text="Login" loading={loading} />
        <AuthLink
          text="Don't have an account?"
          linkText="Register"
          to="/register"
        />
      </form>
    </AuthLayout>
  );
}

export default Login;
