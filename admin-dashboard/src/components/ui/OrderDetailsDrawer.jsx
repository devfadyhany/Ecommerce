import { useState } from "react";
import { X } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import FilterDropdown from "./FilterDropdown";
import api from "../../api/axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelpers";
import { ORDER_STATUS_OPTIONS } from "../../constants";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function OrderDetailsDrawer({ order, onClose, onStatusUpdated }) {
  const [status, setStatus] = useState(order?.status ?? "");
  const [adminNote, setAdminNote] = useState(order?.adminNote ?? "");
  const [saving, setSaving] = useState(false);

  if (!order) return null;

  const isPopulatedUser = order.user && typeof order.user === "object";
  const username = isPopulatedUser ? order.user.username : null;
  const email = isPopulatedUser ? order.user.email : null;

  const taxPercent =
    order.subtotal > 0 ? Math.round((order.tax / order.subtotal) * 100) : 0;

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.patch(`/orders/admin/${order._id}/status`, {
        status,
        adminNote,
      });
      showSuccessToast("Order status updated successfully");
      onStatusUpdated?.();
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);
      showErrorToast(
        err.response?.data?.message || "Failed to update order status.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full sm:w-[420px] h-full bg-card shadow-2xl animate-slide-in flex flex-col">
        <div className="flex items-start justify-between border-b border-card-line px-5 sm:px-6 py-4 flex-shrink-0">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gold uppercase tracking-[0.2em]">
              Order Detail
            </p>
            <h2 className="text-base sm:text-lg font-bold text-ink mt-1">
              #{order._id?.slice(-8).toUpperCase()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-ink-faint hover:text-ink hover:bg-surface-fields rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto thin-scrollbar p-5 sm:p-6 space-y-6">
          {/* Status row */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
            <span className="text-xs sm:text-sm text-ink-faint capitalize">
              {order.paymentMethod}
            </span>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-ink-faint uppercase tracking-widest mb-2">
              Info
            </p>
            <div className="rounded-xl border border-card-line divide-y divide-card-line">
              <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="text-ink-soft">Placed</span>
                <span className="text-ink font-medium">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="text-ink-soft">Customer</span>
                <span className="text-ink font-medium">
                  {username || order.shippingAddress?.fullName || "—"}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="text-ink-soft">Email</span>
                <span className="text-ink font-medium">{email || "—"}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="text-ink-soft">Ship to</span>
                <span className="text-ink font-medium capitalize">
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.country}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-ink-faint uppercase tracking-widest mb-2">
              Items
            </p>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-card-line p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-surface-fields flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-ink truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-ink-faint">
                      x{item.quantity} · {item.price?.toFixed(2)} EGP
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">
                    {(item.price * item.quantity).toFixed(2)} EGP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-card-line divide-y divide-card-line">
            <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="text-ink">{order.subtotal?.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
              <span className="text-ink-soft">Shipping</span>
              <span className="text-ink">
                {order.shippingFee?.toFixed(2)} EGP
              </span>
            </div>
            <div className="flex justify-between px-4 py-3 text-xs sm:text-sm">
              <span className="text-ink-soft">Tax ({taxPercent}%)</span>
              <span className="text-ink">{order.tax?.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-sm sm:text-base font-bold">
              <span className="text-ink">Total</span>
              <span className="text-ink">
                {order.totalPrice?.toFixed(2)} EGP
              </span>
            </div>
          </div>

          {/* Update status */}
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-ink-faint uppercase tracking-widest mb-2">
              Update Status
            </p>
            <div className="space-y-3">
              <FilterDropdown
                value={status}
                onChange={setStatus}
                allLabel="Select status"
                options={ORDER_STATUS_OPTIONS}
              />

              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add an admin note (optional)"
                rows={3}
                className="w-full p-3 rounded-xl border border-line bg-surface-fields text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />

              <button
                onClick={handleSave}
                disabled={saving || !status}
                className="w-full flex items-center justify-center gap-2 py-3 bg-ink text-surface text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition"
              >
                {saving && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-surface border-t-transparent" />
                )}
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsDrawer;
