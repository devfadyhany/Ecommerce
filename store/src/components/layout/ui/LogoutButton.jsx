import { LogOut } from "lucide-react";

function LogoutButton({ onLogout }) {
  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;