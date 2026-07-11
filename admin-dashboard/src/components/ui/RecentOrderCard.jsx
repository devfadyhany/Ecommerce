const RecentOrderCard = ({ order }) => {
  const statusColor = {
    cancelled: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-600",
    shipped: "bg-purple-100 text-purple-600",
    delivered: "bg-green-100 text-green-600",
    confirmed: "bg-green-100 text-green-600",
    processing: "bg-gray-200 text-gray-500",
    returned: "bg-pink-100 text-pink-600",
  };

  const statusClasses = statusColor[order.status];

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center shadow-md mb-5 mx-1 p-5 border border-card-line rounded-2xl">
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-sm text-ink">{order.accountType}</h4>
        <div className="flex gap-2 text-ink-soft text-sm">
          <span>{order.product}</span>
          {/* {order.items[0].name} */}
          <span>•</span>
          <span>{order.date}</span>
          {/* {formattedDate} */}
        </div>
      </div>
      <div className="flex gap-2 md:justify-between items-center text-ink-soft text-sm">
        <span
          className={`py-1.5 px-3 text-sm rounded-3xl items-center capitalize ${statusClasses}`}
        >
          {order.status}
        </span>
        <span className="text-ink">$ {order.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default RecentOrderCard;
