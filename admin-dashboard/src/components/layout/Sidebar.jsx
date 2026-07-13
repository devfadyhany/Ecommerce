import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  PlusSquare,
  ShoppingBag,
  ShoppingCart,
  Settings,
  X,
} from "lucide-react";
const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    id: 3,
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    id: 4,
    title: "Add Product",
    icon: PlusSquare,
    path: "/products/add",
  },
  {
    id: 5,
    title: "Orders",
    icon: ShoppingBag,
    path: "/orders",
  },
  {
    id: 6,
    title: "Carts",
    icon: ShoppingCart,
    path: "/carts",
  },
  {
    id: 7,
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } fixed top-0 left-0 h-screen transition-all duration-500 bg-layout border-r border-line flex flex-col`}
    >
      <div className="p-6">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="text-on-gold w-6 h-6" />
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-ink">Admin Panel</h1>
                <p className="text-sm text-ink-soft">Commerce</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:block p-2 rounded-lg hover:bg-surface-fields transition"
            >
              <X className="w-5 h-5 text-ink" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } p-3 rounded-lg transition ${
                  isActive
                    ? "bg-gold-light text-gold-deep"
                    : "text-ink-soft hover:bg-surface-fields"
                }`
              }
            >
              <Icon className="w-5 h-5" />

              {!collapsed && (
                <span className="text-medium font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile */}
      {/* <div className="p-4 border-t border-line">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3`}
        >
          <img
            src={user?.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          {!collapsed && (
            <div>
              <p className="font-semibold text-ink">{user?.username}</p>
              <p className="text-sm text-ink-soft">{user?.role}</p>
            </div>
          )}
        </div>
      </div> */}

      {/* Connection Status */}
      <div className="p-4 border-t border-line">
        {collapsed ? (
          <div className="flex justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
            </span>
          </div>
        ) : (
          <div className="bg-[image:var(--sef-gradient-gold)] text-amber-950 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-950 opacity-60"></span>
                <span className="relative inline-flex rounded-full size-2 bg-amber-950"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Live
              </span>
            </div>
            <p className="text-sm font-bold leading-snug">
              Connected to the E-commerce API
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
