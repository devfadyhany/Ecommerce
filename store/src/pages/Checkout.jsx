import { useState } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentMethod from "../components/checkout/PaymentMethods";
import OrderSummary from "../components/checkout/OrderSummary";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { PiNotepadBold } from "react-icons/pi";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        country: "Egypt",
        city: "",
        address: "",
        postalCode: "",
    });

    const [customerNote, setCustomerNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const { getCart, cart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const handlePlaceOrder = async () => {
        const normalizedAddress = {
            fullName: shippingAddress.fullName.trim(),
            phone: shippingAddress.phone.trim(),
            country: shippingAddress.country.trim(),
            city: shippingAddress.city.trim(),
            address: shippingAddress.address.trim(),
            postalCode: shippingAddress.postalCode.trim(),
        };

        if (
            !normalizedAddress.fullName ||
            !normalizedAddress.phone ||
            !normalizedAddress.city ||
            !normalizedAddress.address ||
            !normalizedAddress.country
        ) {
            setShowErrors(true);
            return;
        }

        if (!cart?.items?.length) {
            showErrorToast("Your cart is empty");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/orders", {
                shippingAddress: normalizedAddress,
                paymentMethod,
                customerNote: customerNote.trim(),
            });

            const orderId = res?.data?.order?._id || res?.data?._id || res?.data?.orderId;

            if (!orderId) {
                showErrorToast("Could not retrieve your order information");
                return;
            }

            showSuccessToast("Order placed successfully");

            await getCart();

            navigate("/order-success", {
                state: {
                    orderId,
                },
            });

        } catch (err) {
            showErrorToast(
                err.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="mt-16 min-h-screen bg-surface-soft px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <CheckoutForm
                        shippingAddress={shippingAddress}
                        setShippingAddress={setShippingAddress}
                        showErrors={showErrors}
                    />
                    <PaymentMethod
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                    <div className="mt-6 bg-card rounded-xl border border-card-line p-6 shadow-sm">
                        <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                            <PiNotepadBold className="text-gold text-2xl" />
                            Order Notes (Optional)
                        </h4>
                        <textarea
                            name="customerNote"
                            value={customerNote}
                            rows={4}
                            className="w-full resize-none px-4 py-2 rounded border border-line 
                          focus:outline-none focus:ring-1 focus:ring-gold bg-surface-soft text-sm text-ink"
                            placeholder="Any special instructions for your order..."
                            onChange={(e) => setCustomerNote(e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
                <div>
                    <OrderSummary
                        onPlaceOrder={handlePlaceOrder}
                        loading={loading}
                    />
                </div>
            </div>

        </div>
    )
}

export default Checkout;