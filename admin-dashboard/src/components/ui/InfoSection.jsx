import { useEffect, useState } from "react";

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

function InfoSection() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await api.get("/orders/admin/dashboard");
        setDashboardData(response.data.dashboard);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (!dashboardData) return <h2>No Data</h2>;

  const cards = [
    {
      title: "Total Orders",
      value: dashboardData.orders.total,
      subtitle: "All orders received",
      icon: <FaShoppingBag />,
      color: "from-teal-400 to-emerald-500",
    },
    {
      title: "Pending Orders",
      value: dashboardData.orders.pending,
      subtitle: "Awaiting action",
      icon: <FaClock />,
      color: "from-orange-400 to-amber-500",
    },
    {
      title: "Revenue",
      value: `$${dashboardData.revenue.total}`,
      subtitle: "Total gross revenue",
      icon: <FaDollarSign />,
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "This Month",
      value: `$${dashboardData.revenue.thisMonth}`,
      subtitle: "Monthly sales target",
      icon: <FaShoppingCart />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Top Product",
      value: dashboardData.topProducts[0]?.name,
      subtitle: `${dashboardData.topProducts[0]?.totalSold} sold`,
      icon: <FaBoxOpen />,
      color: "from-purple-400 to-violet-500",
    },
    {
      title: "Users",
      value: dashboardData.totalCustomers,
      subtitle: "Registered customers",
      icon: <FaUsers />,
      color: "from-gray-400 to-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <InfoCard
          key={index}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}

export default InfoSection;
