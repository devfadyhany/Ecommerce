import Skeleton from "./Skeleton";

const THEAD_CLASS =
  "p-3 sm:p-4 text-left text-[10px] sm:text-xs font-semibold text-ink-soft uppercase tracking-wider whitespace-nowrap";

const COLUMNS = ["Order", "Customer", "Date", "Status", "Payment", "Total"];

function OrdersTableSkeleton({ rows = 6 }) {
  return (
    <div className="overflow-x-auto bg-card rounded-2xl border border-card-line w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-fields">
            {COLUMNS.map((col) => (
              <th key={col} className={THEAD_CLASS}>
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-card-line">
              <td className="p-3 sm:p-4">
                <Skeleton className="h-4 w-16" />
              </td>

              <td className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex-shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </td>

              <td className="p-3 sm:p-4">
                <Skeleton className="h-4 w-20" />
              </td>

              <td className="p-3 sm:p-4">
                <Skeleton className="h-5 w-20 rounded-full" />
              </td>

              <td className="p-3 sm:p-4 space-y-1.5">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-3 w-10" />
              </td>

              <td className="p-3 sm:p-4">
                <Skeleton className="h-4 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTableSkeleton;