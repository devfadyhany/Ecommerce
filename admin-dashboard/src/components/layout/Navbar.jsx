import React from "react";
import { Link, useNavigate } from "react-router";
import { FiBell, FiMoon, FiLogOut } from "react-icons/fi";

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 right-0 z-40 flex justify-between items-center bg-white p-4 border-b shadow-sm transition-all duration-500 ${
        collapsed ? "left-20" : "left-72"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src="/src/assets/hero-3-6-631x544.png.webp"
          alt="Logo"
          className="size-12 rounded-full"
        />
        <div className="capitalize">
          <h1 className="text-base font-bold ">koda dashboard</h1>
          <p className="text-xs text-gray-600">e-commerce admin panel</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/notifications"
          className="p-2 border bg-white rounded-xl text-gray-600 hover:bg-gray-50"
        >
          <FiBell size={18} />
        </Link>

        <button className="p-2 border bg-white rounded-xl text-gray-600 hover:bg-gray-50">
          <FiMoon size={18} />
        </button>

        <Link
          to="/profile"
          className="hidden sm:flex items-center gap-2 border bg-white rounded-xl p-1 pr-3 hover:bg-gray-50"
        >
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            AA
          </div>
          <div className="text-left capitalize bg-white hover:bg-gray-50">
            <h2 className="text-xs font-semibold text-gray-800">
              admin account
            </h2>
            <p className="text-[10px] text-gray-400">admin</p>
          </div>
        </Link>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl px-2 sm:px-4 py-2 text-sm font-medium"
        >
          <FiLogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
