import { ORDER_STATUS_META } from "../../utils/orderStatusMeta";

function OrderStatusBadge({ status }) {
  const meta = ORDER_STATUS_META[status] ?? {
    label: status ?? "Unknown",
    dot: "bg-gray-400",
    text: "text-gray-600",
    bg: "bg-gray-100",
    border: "border-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize whitespace-nowrap border ${meta.bg} ${meta.text} ${meta.border}`}
    >
      <span
        className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0 ${meta.dot}`}
      />
      {meta.label}
    </span>
  );
}

export default OrderStatusBadge;
