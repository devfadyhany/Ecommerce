import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import api from "../api/axios";
import { CiLock } from "react-icons/ci";
import { RiShieldKeyholeLine } from "react-icons/ri";
import AuthInput from "../components/ui/auth/AuthInput";
import AuthLayout from "../components/layout/AuthLayout";
import AuthButton from "../components/ui/auth/AuthButton";
import AuthLink from "../components/ui/auth/AuthLink";

function ForgotPW_VerifyOTP() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [loading, setLoading] = useState(false);
    // //////////////////////////// DON'T CHANGE THE CODE ABOVE ////////////////////////////
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const countdown = setInterval(() => {
            setResendTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [resendTimer]);

    const handleForgotPW_VerifyOTP = async (e) => {
        e.preventDefault();

        try {
            if (!email) {
                showErrorToast("Email not found. Please go back and try again.");
                return;
            }

            if (!otp || !newPassword) {
                showErrorToast("Please fill in all fields");
                return;
            }

            if (newPassword.length < 8 || newPassword.length > 30) {
                showErrorToast("Password must be between 8 and 30 characters");
                return;
            }

            setLoading(true);
            const res = await api.post("/auth/forgot-password/verify-otp", {
                email,
                otp,
                newPassword,
            });

            if (res.data) {
                showSuccessToast("Password updated successfully");
                navigate("/login");
            }
        } catch (err) {
            showErrorToast(err.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) {
            return;
        }

        if (!email) {
            showErrorToast("Email not found. Please go back and try again.");
            return;
        }

        try {
            const res = await api.post("/auth/forgot-password/send-otp", {
                email,
            });

            if (res.data) {
                setResendTimer(60);
                showSuccessToast("OTP resent successfully");
            }
        } catch (err) {
            showErrorToast("Failed to resend OTP");
        }
    };

    return (
        <>
            <AuthLayout
                title="Create new password"
                subtitle="Enter the OTP & New Password"
            >
                <form
                    className="form-container mx-auto flex flex-col space-y-4 py-6 px-8 shadow-surface-fields shadow-2xl rounded-lg"
                    onSubmit={handleForgotPW_VerifyOTP}
                >
                    <AuthInput
                        label="OTP"
                        icon={<RiShieldKeyholeLine />}
                        type="text"
                        value={otp}
                        required
                        minLength={6}
                        maxLength={6}
                        placeholder="123456"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <AuthInput
                        label="New Password"
                        icon={<CiLock />}
                        type="password"
                        value={newPassword}
                        required
                        minLength={8}
                        maxLength={30}
                        placeholder="••••••••"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <AuthButton
                        text="Submit"
                        loading={loading}
                    />
                    <AuthLink
                        text="Didn't receive an OTP?"
                        linkText={resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                        onClick={handleResendOTP}
                        disabled={resendTimer > 0}
                    />
                </form>
            </AuthLayout>
        </>
    );
}

export default ForgotPW_VerifyOTP;