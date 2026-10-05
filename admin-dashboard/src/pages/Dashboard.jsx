import { useCallback, useEffect, useState } from "react";
import HeaderCard from "../components/ui/HeaderCard";
import InfoSection from "../components/ui/InfoSection";
import OrderStatus from "../components/ui/OrderStatus";
import RecentOrders from "../components/ui/RecentOrders";
import TopProducts from "../components/ui/TopProducts";
import RevenueChart from "../components/ui/RevenueChart";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import api from "../api/axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/admin/dashboard");
      setDashboard(res.data.dashboard);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="p-4 lg:p-8">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="space-y-6">
          <HeaderCard
            title1="ADMIN OVERVIEW"
            title2="Real-time commerce health"
            description="Monitor Your storefront with AI-style clarity and live API metrics."
          />
          <InfoSection dashboard={dashboard} />
          <RevenueChart revenue={dashboard.dailyRevenue} />
          {dashboard ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OrderStatus stats={dashboard.orders} />
                <TopProducts products={dashboard.topProducts} />
              </div>
              <RecentOrders orders={dashboard.recentOrders} />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OrderStatus />
                <TopProducts />
              </div>
              <RecentOrders />
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <HeaderCard
            title1="ADMIN OVERVIEW"
            title2="Real-time commerce health"
            description="Monitor Your storefront with AI-style clarity and live API metrics."
          />
          <InfoSection dashboard={dashboard} />
          <RevenueChart revenue={dashboard.dailyRevenue} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderStatus stats={dashboard.orders} />
            <TopProducts products={dashboard.topProducts} />
          </div>
          <RecentOrders orders={dashboard.recentOrders} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
