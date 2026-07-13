import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 min-w-0 transition-all duration-500 ${
          collapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Navbar collapsed={collapsed} />
        <div className="pt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
