import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function OrderCard({ order }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${order._id}`);
  };

  const getStatusStyle = (status) => {
    if (status?.toLowerCase() === "confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (status?.toLowerCase() === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status?.toLowerCase() === "cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-surface-soft text-ink-soft";
  };

  return (
    <div
      className="max-w-4xl mx-auto border border-card-line rounded-xl px-4 py-3 mb-4 
      bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
    >


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <h2
          onClick={handleViewDetails}
          className="font-semibold text-lg text-ink cursor-pointer hover:text-gold transition"
        >
          #{order._id.slice(-8).toUpperCase()}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>


      <p className="text-ink-soft text-sm mb-3">
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-ink">
          {order.items.length} item(s)
        </p>

        <div className="flex items-center gap-3">
          <p className="font-semibold text-ink">
            EGP {order.totalPrice}
          </p>

          <button
            onClick={handleViewDetails}
            className="w-9 h-9 rounded-full bg-surface-soft text-gold flex items-center justify-center hover:bg-gold hover:text-on-gold transition"
            aria-label="View order details"
          >
            <ArrowRight size={18} />
          </button>
        </div>


      </div>


    </div>
  );
}

export default OrderCard;