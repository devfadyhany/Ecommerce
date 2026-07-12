export function getLast7DaysRevenue(orders = []) {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push({ _id: key, revenue: 0, orders: 0 });
  }

  const dayMap = Object.fromEntries(days.map((d) => [d._id, d]));

  orders.forEach((order) => {
    if (order.status === "cancelled") return;

    const key = new Date(order.createdAt).toISOString().split("T")[0];
    if (dayMap[key]) {
      dayMap[key].revenue += order.totalPrice || 0;
      dayMap[key].orders += 1;
    }
  });

  return days;
}
