import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function StoreLayout() {
  return (
    <main>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default StoreLayout;
