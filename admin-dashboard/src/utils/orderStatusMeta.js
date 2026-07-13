export const ORDER_STATUS_META = {
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-600 dark:border-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-600 dark:border-sky-400",
  },
  processing: {
    label: "Processing",
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-600 dark:border-violet-400",
  },
  shipped: {
    label: "Shipped",
    dot: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-600 dark:border-cyan-400",
  },
  delivered: {
    label: "Delivered",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-600 dark:border-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-600 dark:border-rose-400",
  },
  returned: {
    label: "Returned",
    dot: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-600 dark:border-orange-400",
  },
};

export const PAYMENT_STATUS_META = {
  pending: {
    label: "Pending",
    bg: "bg-amber-100 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-400",
  },
  paid: {
    label: "Paid",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  failed: {
    label: "Failed",
    bg: "bg-rose-100 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-400",
  },
  refunded: {
    label: "Refunded",
    bg: "bg-slate-200 dark:bg-slate-500/15",
    text: "text-slate-700 dark:text-slate-300",
  },
};