import HeaderCard from "../components/ui/HeaderCard";
import InfoSection from "../components/ui/InfoSection";
import OrderStatus from "../components/ui/OrderStatus";
import RecentOrders from "../components/ui/RecentOrders";
import TopProducts from "../components/ui/TopProducts";

function Dashboard() {
  return (
    <div className="p-4 lg:p-8">
      <div className="space-y-6">
        <HeaderCard
          title1="ADMIN OVERVIEW"
          title2="Real-time commerce health"
          description="Monitor Your storefront with AI-style clarity and live API metrics."
        />
        <InfoSection />
        <div className="flex gap-8">
          <OrderStatus />
          <TopProducts />
        </div>
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;
