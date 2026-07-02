import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <>
      <Sidebar />

      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
