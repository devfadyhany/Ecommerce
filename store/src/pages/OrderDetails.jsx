import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/orders/my/${id}`);

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError(err.response?.data?.message || "Failed to load order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      setCancelling(true);
      const res = await api.patch(`/orders/my/${id}/cancel`);
      if (res.data.success) {
        await getOrderDetails();
      }
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Could not cancel the order. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading order details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-6 text-ink">
        <div className="text-center bg-card p-8 rounded-xl border border-card-line shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-ink-soft mb-6">{error}</p>
          <button
            onClick={getOrderDetails}
            className="w-full bg-gold text-on-gold py-3 rounded-xl hover:bg-gold-deep transition-colors font-bold shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10 text-ink font-medium">
        Order not found
      </div>
    );

  const currentIdx = steps.indexOf(order.status);
  const canCancel = order.status === "pending" || order.status === "confirmed";

  return (
 <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 bg-surface min-h-screen text-ink">
   <div className="pt-4 pb-10 mb-14 border-b border-line">
        <h1 className="text-3xl font-bold text-ink mb-2">Order #{order._id}</h1>
        <p className="text-sm text-ink-soft">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
<div className="mt-6 mb-16 bg-surface-soft p-8 rounded-2xl shadow-md border border-line">
  <div className="relative">

    {/* Gray Line */}
    <div className="absolute left-[8%] right-[8%] top-5 h-[2px] bg-line"></div>

    {/* Gold Line */}
    <div
      className="absolute left-[8%] top-5 h-[2px] bg-gold transition-all duration-300"
      style={{
        width: `${(currentIdx / (steps.length - 1)) * 84}%`,
      }}
    ></div>

    <div className="flex justify-between relative z-10">
      {steps.map((step, idx) => {
        const active = idx <= currentIdx;

        return (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              ${
                active
                  ? "bg-gold text-white"
                  : "bg-white border-2 border-gray-300 text-gray-400"
              }`}
            >
              {idx + 1}
            </div>

            <p
              className={`mt-3 text-sm font-semibold capitalize ${
                active ? "text-gold" : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</div>

     <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr] gap-10 items-start">
       <div className="rounded-2xl p-6 bg-card border border-card-line shadow-md self-start h-fit">
          <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-seam">
            Items
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.product}
                className="flex justify-between items-center py-3 border-b border-seam last:border-0"
              >
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                </div>
                <span className="font-bold text-gold">
                  {item.price * item.quantity} EGP
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-card border border-card-line shadow-md">
            <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-seam">
              Shipping & Payment
            </h2>
            <div className="text-sm space-y-4 text-ink-soft">
              <p className="font-semibold text-ink">
                {order.shippingAddress.fullName}
              </p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.country},{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="pt-2">Phone: {order.shippingAddress.phone}</p>
              <p className="pt-2 border-t border-seam">
                Payment Method:{" "}
                <span className="font-medium capitalize text-ink">
                  {order.paymentMethod}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-8 bg-surface-soft border border-line shadow-md">
            <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-line">
              Summary
            </h2>
            <div className="space-y-4 text-sm text-ink-soft">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-ink">{order.subtotal} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="text-ink">{order.shippingFee} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="text-ink">{order.tax} EGP</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-red-500 font-medium">
                  <span>Discount:</span>
                  <span>-{order.discount} EGP</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg text-ink pt-5 border-t border-line">
                <span>Total Price:</span>
                <span className="text-gold">{order.totalPrice} EGP</span>
              </div>
            </div>

            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full mt-8 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>

          {order.customerNote && (
            <div className="rounded-2xl p-6 bg-surface-soft border border-line shadow-md">
              <h2 className="text-sm font-bold text-ink mb-2">
                Customer Note:
              </h2>
              <p className="text-sm text-ink-soft italic">
                {order.customerNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}