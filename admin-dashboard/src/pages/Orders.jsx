import { useState } from "react";
import FilterDropdown from "../components/ui/FilterDropdown";
import SearchInput from "../components/ui/SearchInput";
import {
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "../constants";
import OrdersTable from "../components/ui/OrdersTable";
import OrdersTableSkeleton from "../components/ui/OrdersTableSkeleton";
import OrderDetailsDrawer from "../components/ui/OrderDetailsDrawer";
import { useOrdersData } from "../hooks/useOrdersData";
import Pagination from "../components/ui/Pagination";

function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, total, totalPages, loading, error, refetch } = useOrdersData({
    page,
    limit: 10,
    status: statusFilter,
    paymentStatus: paymentStatusFilter,
  });

  const filteredOrders = orders.filter((order) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const idMatch = order._id?.toLowerCase().includes(term);
    const nameMatch =
      typeof order.user === "object" &&
      order.user?.username?.toLowerCase().includes(term);
    const emailMatch =
      typeof order.user === "object" &&
      order.user?.email?.toLowerCase().includes(term);
    return idMatch || nameMatch || emailMatch;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] sm:text-[12px] font-semibold text-ink-soft uppercase tracking-widest">
            admin . management
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-ink capitalize">
            orders
          </h2>
        </div>
        <div className="flex items-center gap-2 py-2 px-3 bg-card rounded-[10px]">
          <h2 className="text-lg sm:text-2xl font-bold text-ink">{total}</h2>
          <span className="text-sm font-light text-ink-faint">
            Total Orders
          </span>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search ID, customer name ..."
          showButton={false}
          className="flex-1"
        />
        <FilterDropdown
          value={statusFilter}
          onChange={setStatusFilter}
          allLabel="All statuses"
          options={ORDER_STATUS_OPTIONS}
        />
        <FilterDropdown
          value={paymentStatusFilter}
          onChange={setPaymentStatusFilter}
          allLabel="All payments"
          options={PAYMENT_STATUS_OPTIONS}
        />
        <FilterDropdown
          value={methodFilter}
          onChange={setMethodFilter}
          allLabel="All methods"
          options={PAYMENT_METHOD_OPTIONS}
        />
      </div>

      <div>
        {loading ? (
          <OrdersTableSkeleton rows={6} />
        ) : error ? (
          <div className="p-6 text-center text-rose-500 bg-card rounded-2xl border border-card-line">
            Failed to load orders.
          </div>
        ) : (
          <>
            <OrdersTable
              orders={filteredOrders}
              onRowClick={(order) => setSelectedOrder(order)}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdated={refetch}
        />
      )}
    </div>
  );
}

export default Orders;
