import api from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, PackageOpen } from "lucide-react";
import OrderCard from "../components/orders/OrderCard";

function Orders() {
  const LIMIT = 5;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortOrders = (ordersList) => {
    return [...ordersList].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const fetchOrders = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError("");

      const response = await api.get(
        `/orders/my?page=${pageNumber}&limit=${LIMIT}`
      );

      const newOrders = response.data.orders || [];

      if (pageNumber === 1) {
        setOrders(sortOrders(newOrders));
      } else {
        setOrders((prev) =>
          sortOrders([...prev, ...newOrders])
        );
      }

      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to load orders.");
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      fetchOrders(page + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 text-ink">
        My Orders
      </h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border border-card-line rounded-xl p-4 bg-card animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="h-5 w-32 bg-gray-300 rounded" />

                <div className="h-6 w-20 bg-gray-300 rounded-full" />
              </div>

              <div className="h-4 w-28 bg-gray-300 rounded mb-4" />

              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-300 rounded" />

                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-600 mb-4">
            {error}
          </p>

          <button
            onClick={() => fetchOrders(1)}
            className="px-6 py-2 bg-gold text-white rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-14">
          <PackageOpen
            size={60}
            className="mx-auto mb-4 text-ink-soft"
          />

          <h2 className="text-xl font-semibold text-ink mb-2">
            No orders yet
          </h2>

          <p className="text-ink-soft mb-6">
            You haven't placed any orders yet
          </p>

          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-gold text-white rounded-lg hover:opacity-90 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <div
              key={order._id}
              className="animate-fadeIn"
            >
              <OrderCard order={order} />
            </div>
          ))}

          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-2 bg-gold text-white rounded-lg 
                hover:opacity-90 disabled:opacity-50 transition"
              >
                {loadingMore ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Loading..
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;