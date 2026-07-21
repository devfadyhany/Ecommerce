import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { CiMail } from "react-icons/ci";
import AuthInput from "../components/ui/auth/AuthInput";
import AuthLayout from "../components/layout/AuthLayout";
import AuthButton from "../components/ui/auth/AuthButton";
import AuthLink from "../components/ui/auth/AuthLink";

function ForgotPassword() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // //////////////////////////// DON'T CHANGE THE CODE ABOVE ////////////////////////////
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            if (!email.trim()) {
                showErrorToast("Please fill in all fields");
                return;
            }

            setLoading(true);
            const res = await api.post("/auth/forgot-password/send-otp", {
                email
            });

            if (res.data) {
                showSuccessToast("Reset OTP sent successfully");
                navigate("/forgot-password/verify-otp", {
                    state: { email }
                });
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || "Email not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthLayout
                title="Forgot Password"
                subtitle="Enter your email to reset your password"
            >
                <form
                    className="form-container mx-auto flex flex-col space-y-4 py-6 px-8 shadow-surface-fields shadow-2xl rounded-lg"
                    onSubmit={handleForgotPassword}
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
                    <AuthButton
                        text="Submit"
                        loading={loading}
                    />
                    <AuthLink
                        text="Remember your password?"
                        linkText="Back to Login"
                        to="/login"
                    />
                </form>
            </AuthLayout>
        </>
    );
}


export default ForgotPassword;