import React from "react";
import api from "../../api/axios";
import InfoCard from "./InfoCard";

import {
  FaShoppingBag,
  FaClock,
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

const InfoSection = React.memo(({ dashboard }) => {
  if (!dashboard) return null;

  const cards = [
    {
      title: "Total Orders",
      value: dashboard.orders.total,
      subtitle: "All orders received",
      icon: <FaShoppingBag />,
      color: "from-teal-400 to-emerald-500",
    },
    {
      title: "Pending Orders",
      value: dashboard.orders.pending,
      subtitle: "Awaiting action",
      icon: <FaClock />,
      color: "from-orange-400 to-amber-500",
    },
    {
      title: "Revenue",
      value: `$${dashboard.revenue.total.toLocaleString()}`,
      subtitle: "Total gross revenue",
      icon: <FaDollarSign />,
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "This Month",
      value: `$${dashboard.revenue.thisMonth.toLocaleString()}`,
      subtitle: `${dashboard.revenue.growthPercent >= 0 ? "+" : ""}${dashboard.revenue.growthPercent}% vs last month`,
      icon: <FaShoppingCart />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Top Product",
      value: dashboard.topProducts[0]?.name ?? "N/A",
      subtitle: `${dashboard.topProducts[0]?.totalSold ?? 0} sold`,
      icon: <FaBoxOpen />,
      color: "from-purple-400 to-violet-500",
    },
    {
      title: "Users",
      value: dashboard.totalCustomers,
      subtitle: "Registered customers",
      icon: <FaUsers />,
      color: "from-gray-400 to-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <InfoCard key={index} {...card} />
      ))}
    </div>
  );
});

export default InfoSection;
