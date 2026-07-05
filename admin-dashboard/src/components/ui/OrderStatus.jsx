import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_META = {
  pending: {
    label: "Pending",
    style: "bg-amber-500/10 text-amber-600/80 border-amber-400/30",
  },
  processing: {
    label: "Processing",
    style: "bg-sky-500/10 text-sky-600/80 border-sky-400/30",
  },
  confirmed: {
    label: "Confirmed",
    style: "bg-sky-500/10 text-sky-600/80 border-sky-400/30",
  },
  shipped: {
    label: "Shipped",
    style: "bg-violet-500/10 text-violet-600/80 border-violet-400/30",
  },
  delivered: {
    label: "Delivered",
    style: "bg-emerald-500/10 text-emerald-600/80 border-emerald-400/30",
  },
  cancelled: {
    label: "Cancelled",
    style: "bg-rose-500/10 text-rose-600/80 border-rose-400/30",
  },
};


const OrderStatus = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const OrderStatusApi = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-api-3wara.vercel.app/api-docs#/Orders/get_orders_my",
        );
        setStats(response.data);
      } catch (error) {
        setError(error.response?.data?.message);
      }
    };
    OrderStatusApi();
  }, []);

  return (
    <>
      <div className="p-5 rounded-3xl shadow-xl border border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-sm uppercase tracking-[0.35em] text-cyan-500">
              OrderStatus
            </span>
            <h3 className="mt-2 text-xl font-medium text-slate-900">
              Live fulfillment breakdown
            </h3>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600">
            Updated from API
          </span>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 transition-all duration-800">
            {Object.entries(STATUS_META).map(([key, { label, style }]) => (
              <div
                key={key}
                className={`p-3 sm:p-4 rounded-3xl space-y-2 sm:space-y-2.5 border opacity-70 ${style}`}
              >
                <p className={`text-md font-extralight tracking-[0.2em]`}>
                  {label}
                </p>
                <p className="font-bold text-2xl">{stats[key] ?? 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderStatus;
