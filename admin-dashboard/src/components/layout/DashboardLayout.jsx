import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import OrderState from"./OrderStatus";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <>
      <Sidebar />

      <main>
        <Navbar />
        <Outlet />
        <OrderState/>
      </main>
    </>
  );
}

export default DashboardLayout;
