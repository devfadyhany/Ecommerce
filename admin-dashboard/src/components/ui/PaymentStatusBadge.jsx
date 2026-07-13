import { PAYMENT_STATUS_META } from "../../utils/orderStatusMeta";

function PaymentStatusBadge({ status }) {
  const meta = PAYMENT_STATUS_META[status] ?? {
    label: status ?? "Unknown",
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <span
      className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap ${meta.bg} ${meta.text}`}
    >
      {meta.label}
    </span>
  );
}

export default PaymentStatusBadge;