import api from "../api/axios";

export const getPaymentUrl = async (orderData) => {
try {
    const response = await api.post("/orders", orderData);

    const paymentUrl = response.data?.paymentUrl || response.data?.url;

    if (!paymentUrl) {
    throw new Error("Payment URL not found in the response");
    }

    return paymentUrl;
} catch (error) {
    console.error("Error generating Stripe payment URL:", error);
    throw new Error(
    error.response?.data?.message || "Failed to initiate payment process",
    { cause: error }
    );
}
};