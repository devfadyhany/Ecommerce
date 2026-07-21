import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { RiShieldKeyholeLine } from "react-icons/ri";
import AuthInput from "../components/ui/auth/AuthInput";
import AuthLayout from "../components/layout/AuthLayout";
import AuthButton from "../components/ui/auth/AuthButton";
import AuthLink from "../components/ui/auth/AuthLink";

function VerifyOTP() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    // //////////////////////////// DON'T CHANGE THE CODE ABOVE ////////////////////////////
    const [otp, setOtp] = useState("");
    const email = location.state?.email || "";
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        const countdown = setInterval(() => {
            setResendTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            if (!email) {
                showErrorToast("Email not found. Please go back and try again.");
                return;
            }

            if (!otp.trim()) {
                showErrorToast("Please fill in all fields");
                return;
            }

            setLoading(true);
            const res = await api.post("/auth/register/verify-otp", {
                email,
                otp,
            });

            if (res.data) {
                const userObj = res.data.user;
                const tokenStr = res.data.token;

                login(userObj, tokenStr);
                showSuccessToast("Account created successfully");
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
            const res = await api.post("/auth/register/send-otp", {
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
                title="Verify OTP"
                subtitle="Check your email for the 6-digit OTP"
            >
                <form
                    className="form-container mx-auto flex flex-col space-y-4 py-6 px-8 shadow-surface-fields shadow-2xl rounded-lg"
                    onSubmit={handleVerifyOTP}
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


export default VerifyOTP;