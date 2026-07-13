import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const THEAD_CLASS =
  "p-3 sm:p-4 text-left text-[10px] sm:text-xs font-semibold text-ink-soft uppercase tracking-wider whitespace-nowrap";

const COLUMNS = ["Order", "Customer", "Date", "Status", "Payment", "Total"];

function OrdersTable({ orders = [], onRowClick }) {
  return (
    <div className="overflow-x-auto bg-card rounded-t-2xl border border-card-line w-full">
      <table className="w-full">
        <thead>
          <tr className=" bg-surface-fields">
            {COLUMNS.map((col) => (
              <th key={col} className={THEAD_CLASS}>
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="p-6 text-center text-xs sm:text-sm text-ink-soft"
              >
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const isPopulatedUser =
                order.user && typeof order.user === "object";
              const username = isPopulatedUser ? order.user.username : null;
              const email = isPopulatedUser ? order.user.email : null;
              const initial = username ? username.charAt(0).toUpperCase() : "U";

              return (
                <tr
                  key={order._id}
                  onClick={() => onRowClick?.(order)}
                  className="border-b border-card-line hover:bg-surface-fields transition cursor-pointer"
                >
                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-ink-soft whitespace-nowrap">
                    #{order._id?.slice(-8).toUpperCase()}
                  </td>

                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-surface-fields flex items-center justify-center text-xs sm:text-sm font-semibold text-ink-soft flex-shrink-0">
                        {initial}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">
                          {username || "—"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-ink-faint whitespace-nowrap">
                          {email || "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 sm:p-4 text-xs sm:text-sm text-ink-soft whitespace-nowrap">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="p-3 sm:p-4">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  <td className="p-3 sm:p-4">
                    <PaymentStatusBadge status={order.paymentStatus} />
                    <p className="text-[10px] sm:text-xs text-ink-faint mt-1 capitalize">
                      {order.paymentMethod}
                    </p>
                  </td>

                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">
                    {order.totalPrice?.toFixed(2)} EGP
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;