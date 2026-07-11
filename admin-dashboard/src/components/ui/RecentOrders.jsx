import RecentOrderCard from "./RecentOrderCard";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const RecentOrders = ({ orders = [] }) => {
  return (
    <section className="bg-card shadow-2xl my-7 px-5 py-6 rounded-2xl border border-card-line">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between flex-col gap-2">
          <h4 className="text-gold text-sm font-thin uppercase tracking-[0.35em]">
            Recent Orders
          </h4>
          <h5 className="text-xl text-ink">Latest Customer Activity</h5>
        </div>
        <span className="text-gold-deep py-0.5 px-3 text-sm bg-gold-light rounded-3xl">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      {orders.map((order) => (
        <RecentOrderCard
          key={order._id}
          order={{
            accountType: order.user ? "Customer Account" : "Guest Account",
            product:
              order.items?.[0]?.name ||
              order.items?.[0]?.product?.name ||
              "N/A",
            date: formatDate(order.createdAt),
            status: order.status,
            totalPrice: order.totalPrice ?? order.totalAmount ?? 0,
          }}
        />
      ))}
    </section>
  );
};

export default RecentOrders;
