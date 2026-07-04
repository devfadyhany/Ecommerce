import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;