import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders/my/${id}`)
      
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError(err);
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

  if (loading) return <div className="text-center p-10 text-ink font-medium">LOADING...</div>;
  if (error) return <div className="text-center p-10 text-red-500 font-medium">ERROR</div>;
  if (!order) return <div className="text-center p-10 text-ink font-medium">Order not found</div>;

  const currentIdx = steps.indexOf(order.status);
  const canCancel = order.status === "pending" || order.status === "confirmed";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface min-h-screen text-ink">
      <div className="pb-6 mb-8 border-b border-line">
        <h1 className="text-3xl font-bold text-ink mb-2">Order #{order._id}</h1>
        <p className="text-sm text-ink-soft">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>


      <div className="mb-12 bg-surface-soft p-6 rounded-xl shadow-md border border-line">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIdx;
            return (
              <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  isCompleted ? "bg-gold text-on-gold" : "bg-surface-fields text-ink-faint border border-line"
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-xs mt-2 capitalize font-medium ${
                  isCompleted ? "text-gold font-semibold" : "text-ink-faint"
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
          <div className="absolute top-4 left-0 right-0 h-1 bg-surface-fields -z-10" />
          <div 
            className="absolute top-4 left-0 h-1 bg-gold transition-all duration-300 -z-10" 
            style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>








      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="rounded-xl p-6 bg-card border border-card-line shadow-md">
          <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-seam">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.product} className="flex justify-between items-center py-2 border-b border-seam last:border-0">
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                </div>
                <span className="font-bold text-gold">{item.price * item.quantity} EGP</span>
              </div>
            ))}
          </div>
        </div>


















        <div className="space-y-6">

          <div className="rounded-xl p-6 bg-card border border-card-line shadow-md">
            <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-seam">Shipping & Payment</h2>
            <div className="text-sm space-y-2 text-ink-soft">
              <p className="font-semibold text-ink">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
              <p>{order.shippingAddress.country}, {order.shippingAddress.postalCode}</p>
              <p className="pt-2">Phone: {order.shippingAddress.phone}</p>
              <p className="pt-2 border-t border-seam">
                Payment Method: <span className="font-medium capitalize text-ink">{order.paymentMethod}</span>
              </p>
            </div>
          </div>

















          <div className="rounded-xl p-6 bg-surface-soft border border-line shadow-md">
            <h2 className="text-xl font-bold text-ink mb-4 pb-2 border-b border-line">Summary</h2>
            <div className="space-y-2 text-sm text-ink-soft">
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


              
              <div className="flex justify-between font-bold text-lg text-ink pt-2 border-t border-line">
                <span>Total Price:</span>
                <span className="text-gold">{order.totalPrice} EGP</span>
              </div>
            </div>





            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full mt-6 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>





          {order.customerNote && (
            <div className="rounded-xl p-6 bg-card border border-card-line shadow-md">
              <h2 className="text-sm font-bold text-ink mb-2"> Customer Note:</h2>
              <p className="text-sm text-ink-soft italic">{order.customerNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
