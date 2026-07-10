
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
    path: "/add-product",
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
      } fixed top-0 left-0 h-screen transition-all duration-500 bg-white border-r flex flex-col`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="text-white w-6 h-6" />
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Commerce
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5 dark:text-white" />
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
                  isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
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
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          {!collapsed && (
            <div>
              <p className="font-semibold">{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
