import { ArrowRight } from "lucide-react";

function OrderCard({ order }) {
  const getStatusStyle = (status) => {
    if (status === "Confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-surface-soft text-ink-soft";
  };

  return (
    <div
      className="max-w-4xl mx-auto border border-card-line rounded-xl p-5 mb-5 bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="font-semibold text-lg text-ink">
          {order.id}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <p className="text-ink-soft mb-3">
        {order.date}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-ink">
          {order.items} item(s)
        </p>

        <div className="flex items-center gap-3">
          <p className="font-semibold text-ink">
            EGP {order.total}
          </p>

          <button
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