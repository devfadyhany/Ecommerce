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
      color: "border-t-teal-400",
    },
    {
      title: "Pending Orders",
      value: dashboardData.orders.pending,
      subtitle: "Awaiting action",
      icon: <FaClock />,
      color: "border-t-orange-400",
    },
    {
      title: "Revenue",
      value: `$${dashboardData.revenue.total}`,
      subtitle: "Total gross revenue",
      icon: <FaDollarSign />,
      color: "border-t-pink-500",
    },
    {
      title: "This Month",
      value: `$${dashboardData.revenue.thisMonth}`,
      subtitle: "Monthly sales target",
      icon: <FaShoppingCart />,
      color: "border-t-cyan-400",
    },
    {
      title: "Top Product",
      value: dashboardData.topProducts[0]?.name,
      subtitle: `${dashboardData.topProducts[0]?.totalSold} sold`,
      icon: <FaBoxOpen />,
      color: "border-t-purple-500",
    },
    {
      title: "Users",
      value: dashboardData.totalCustomers,
      subtitle: "Registered customers",
      icon: <FaUsers />,
      color: "border-t-gray-400",
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
