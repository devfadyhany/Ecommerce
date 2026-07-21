import api from "../api/axios";
import { useEffect, useState } from "react";
import OrderCard from "../components/orders/OrderCard";

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

        setOrders(response.data.orders);
      } catch (error) {
        setError("Failed to load orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 text-ink">My Orders</h1>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : loading ? (
        <p className="text-ink-soft text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-ink mb-2">No orders yet</p>

          <p className="text-ink-soft">You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
}

export default Orders;
