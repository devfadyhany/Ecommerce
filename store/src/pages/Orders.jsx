import api from "../api/axios";
import { useEffect, useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { showErrorToast } from "../utils/toastHelpers";

function Orders() {
  console.log("Orders component rendered");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/orders/my");

        setOrders(response.data.orders || response.data || []);
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Failed to load orders.";
        setError(errorMsg);
        showErrorToast(errorMsg);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner label=" Loading your orders..." />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-ink">My Orders</h1>

      {error ? (
        <div className="text-center py-10">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-gold text-on-gold rounded-xl font-bold hover:bg-gold-deep transition-colors"
          >
            Retry
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-ink mb-2">No orders yet</p>
          <p className="text-ink-soft">You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id || order.id} order={order} />
        ))
      )}
    </div>
  );
}

export default Orders;
