import HeaderCard from "../components/ui/HeaderCard";
import InfoSection from "../components/ui/InfoSection";
import OrderStatus from "../components/ui/OrderStatus";
import RecentOrders from "../components/ui/RecentOrders";
 import TopProducts from "../components/ui/TopProducts";

function Dashboard() {
  return (
    <div className="p-4 lg:p-8">
      <div className="space-y-6">
        <HeaderCard />
        <InfoSection />
        <OrderStatus />
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}

export default Dashboard;