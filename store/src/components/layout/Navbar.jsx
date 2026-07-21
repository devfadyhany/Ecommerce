import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Moon,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Sun,
} from "lucide-react";
import Logo from "../../assets/logo.png";
import LogoDark from "../../assets/logo-dark.png";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { cart } = useCart();

  console.log(user);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "My Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  return (
    <nav className="w-full bg-layout border-b border-card-line shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={theme == "dark" ? LogoDark : Logo} className="size-12" />
          <div className="hidden lg:flex flex-col">
            <h3 className="text-xl font-bold text-ink">
              Elite <span className="text-gold">Cart</span>
            </h3>
          </div>
        </a>

        <div className="hidden md:flex items-center bg-surface-fields border border-line rounded-full p-1.5 shadow-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold text-on-gold"
                    : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button className="hidden sm:flex size-10 sm:size-12 rounded-full border border-line items-center justify-center text-ink group">
            <Search
              size={16}
              className="sm:w-[18px] sm:h-[18px] group-hover:text-gold"
            />
          </button>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-line flex items-center justify-center text-ink group"
          >
            {theme == "dark" ? (
              <Sun
                size={16}
                className="sm:w-[18px] sm:h-[18px] group-hover:text-gold"
              />
            ) : (
              <Moon
                size={16}
                className="sm:w-[18px] sm:h-[18px] group-hover:text-gold"
              />
            )}
          </button>

          <Link
            to="/wishlist"
            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-line flex items-center justify-center text-ink group"
          >
            <Heart
              size={16}
              className="sm:w-[18px] sm:h-[18px] group-hover:text-gold"
            />
            <span className="absolute -top-1 -right-1 bg-gold text-on-gold text-[9px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-card">
              7
            </span>
          </Link>

          <NavLink
            to="/cart"
            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-line flex items-center justify-center text-ink group"
          >
            <ShoppingCart
              size={16}
              className="sm:w-[18px] sm:h-[18px] group-hover:text-gold"
            />
            {cart && (
              <span className="absolute -top-1 -right-1 bg-gold text-on-gold text-[9px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-card">
                {cart.itemCount}
              </span>
            )}
          </NavLink>

          <Link
            to={user ? "/profile" : "/login"}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-line text-ink font-medium text-xs sm:text-sm group"
          >
            <User
              size={16}
              className="text-ink sm:w-[18px] sm:h-[18px] group-hover:text-gold"
            />
            <span className="hidden sm:inline group-hover:text-gold">
              {user ? user.username : "Login"}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-soft hover:bg-surface-fields ml-1"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-card-line px-4 pt-2 pb-4 flex flex-col gap-2 transition-all">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold text-on-gold"
                    : "text-ink-soft hover:bg-surface-fields"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
