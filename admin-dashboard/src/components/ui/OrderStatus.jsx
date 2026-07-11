import api from "../../api/axios";

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
  returned: {
    label: "Returned",
    style: "bg-fuchsia-500/10 text-fuchsia-600/80 border-fuchsia-400/30",
  },
};

const OrderStatus = ({ stats }) => {
  if (!stats) {
    return (
      <div className="p-5 rounded-3xl shadow-xl border border-card-line bg-card">
        <div className="animate-pulse text-ink-faint text-sm">
          Loading order stats...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 rounded-3xl shadow-xl border border-card-line bg-card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-sm uppercase tracking-[0.35em] text-gold">
              OrderStatus
            </span>
            <h3 className="mt-2 text-xl font-medium text-ink">
              Live fulfillment breakdown
            </h3>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600">
            Updated from API
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 transition-all duration-800">
          {Object.entries(STATUS_META).map(([key, { label, style }]) => (
            <div
              key={key}
              className={`p-3 sm:p-4 rounded-3xl space-y-2 sm:space-y-2.5 border opacity-70 ${style}`}
            >
              <p className="text-md font-extralight tracking-[0.2em] text-ink">
                {label}
              </p>
              <p className="font-bold text-2xl text-ink">{stats[key] ?? 0}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
