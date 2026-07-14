import React from "react";
import { Link, useNavigate } from "react-router";
import { FiBell, FiMoon, FiLogOut, FiSun } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`fixed top-0 right-0 z-40 flex justify-between items-center bg-layout px-8 py-4 border-b border-line shadow-sm transition-all duration-500 ${
        collapsed ? "left-20" : "left-72"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={`${theme === "dark" ? logoDark : logo}`}
          alt="Logo"
          className="size-12"
        />
        <div className="capitalize hidden md:flex flex-col">
          <h1 className="text-base font-bold text-ink">
            Elite <span className="text-gold">Cart</span>
          </h1>
          <p className="text-xs text-ink-soft">e-commerce admin panel</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/notifications"
          className="p-2 border border-line bg-layout rounded-xl text-ink-soft hover:bg-surface-fields"
        >
          <FiBell size={18} />
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 border border-line bg-layout rounded-xl text-ink-soft hover:bg-surface-fields"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <Link
          to="/profile"
          className="group hidden sm:flex items-center gap-2 border border-line bg-layout rounded-xl p-1 pr-3 py-2 hover:bg-surface-fields"
        >
          <img
            src={user?.avatar}
            className="w-8 h-8 bg-gold text-on-gold rounded-full flex items-center justify-center font-bold text-sm"
          />
          <div className="text-left capitalize bg-layout group-hover:bg-surface-fields">
            <h2 className="text-xs font-semibold text-ink">{user?.username}</h2>
            <p className="text-[10px] text-ink-faint">{user?.role}</p>
          </div>
        </Link>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl px-2 sm:px-4 py-2 text-sm font-medium"
        >
          <FiLogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
