import { useEffect, useState } from "react";
import { FiSearch, FiX, FiUsers, FiShield, FiUserCheck } from "react-icons/fi";
import { IoPersonAddOutline, IoChevronDown } from "react-icons/io5";
import UsersTable from "../components/ui/UserTable";
import EditUserModal from "../components/ui/EditUserModal";
import DeleteConfirmationModal from "../components/ui/DeleteConfirmationModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";
import api from "../api/axios";

const ITEMS_PER_PAGE = 8;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/all");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      showErrorToast("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({ username: "", email: "", password: "", phone: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/users/add", formData);
      showSuccessToast("User added successfully!");
      handleClear();
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      showErrorToast(err.response?.data?.message || "Failed to add user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    const id = deletingUser._id || deletingUser.id;
    try {
      await api.delete(`/users/${id}`);
      showSuccessToast("User deleted successfully!");
      setDeletingUser(null);
      // if last item on the page was removed, step back a page
      setUsers((prev) => {
        const next = prev.filter((u) => (u._id || u.id) !== id);
        const maxPage = Math.max(1, Math.ceil(next.length / ITEMS_PER_PAGE));
        setCurrentPage((p) => Math.min(p, maxPage));
        return next;
      });
    } catch (err) {
      console.error(err);
      showErrorToast("Failed to delete user");
    }
  };

  const handleToggleRole = async (id) => {
    const target = users.find((u) => (u._id || u.id) === id);
    if (!target) return;
    const nextRole = target.role === "admin" ? "customer" : "admin";

    // optimistic update
    setUsers((prev) =>
      prev.map((u) => ((u._id || u.id) === id ? { ...u, role: nextRole } : u)),
    );

    try {
      await api.patch("/auth/change-role", { userId: id, role: nextRole });
      showSuccessToast(`User role updated to ${nextRole}`);
    } catch (err) {
      console.error(err);
      // revert on failure
      setUsers((prev) =>
        prev.map((u) =>
          (u._id || u.id) === id ? { ...u, role: target.role } : u,
        ),
      );
      showErrorToast("Failed to update role");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const tableUsers = paginatedUsers.map((u) => ({
    ...u,
    name: u.username,
  }));

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <FiUsers className="text-gold text-2xl" />,
    },
    {
      title: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      icon: <FiShield className="text-gold text-2xl" />,
    },
    {
      title: "Customers",
      value: users.filter((u) => u.role === "customer").length,
      icon: <FiUsers className="text-gold text-2xl" />,
    },
    {
      title: "Verified",
      value: users.filter((u) => u.isVerified).length,
      icon: <FiUserCheck className="text-gold text-2xl" />,
    },
  ];

  if (loading) return <LoadingSpinner label="Loading users..." />;

  return (
    <div className="bg-surface-soft min-h-screen p-4 sm:p-6 lg:p-8">
      {/* 1. Header Container */}
      <div className="bg-card rounded-3xl shadow-sm p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 border border-card-line">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            User Management
          </p>
          <h1 className="text-3xl font-extrabold mt-2 text-ink">
            Manage Users
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex items-center bg-surface-fields border border-line rounded-2xl px-4 py-3 w-full sm:w-80">
            <FiSearch className="text-ink-faint text-xl" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search users..."
              className="bg-transparent outline-none ml-3 w-full text-ink placeholder:text-ink-faint"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-deep text-on-gold px-6 py-3 rounded-2xl transition-all font-medium shadow-sm"
          >
            <IoPersonAddOutline className="text-lg" />
            <span>Add User</span>
            <IoChevronDown
              className={`text-sm transition-transform duration-300 ${showForm ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* 2. Dropdown Form */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          showForm
            ? "grid-rows-[1fr] opacity-100 mt-8"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-card rounded-3xl shadow-sm overflow-hidden border border-card-line">
            <div className="flex items-center justify-between p-6 bg-surface-soft border-b border-card-line">
              <div className="flex items-center gap-3">
                <div className="bg-gold-light p-3 rounded-xl shadow-sm">
                  <IoPersonAddOutline className="text-gold-deep text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink">
                    Create New User
                  </h2>
                  <p className="text-ink-soft text-sm mt-0.5">
                    Fill in the details below to add a new user
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-ink-faint hover:text-ink p-2 hover:bg-surface-fields rounded-xl transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Username Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-surface-fields border border-line focus:border-gold focus:bg-card rounded-xl px-4 py-2 outline-none text-ink transition-all placeholder:text-ink-faint"
                    placeholder="e.g. john_doe"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-surface-fields border border-line focus:border-gold focus:bg-card rounded-xl px-4 py-2 outline-none text-ink transition-all placeholder:text-ink-faint"
                    placeholder="e.g. john@gmail.com"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-surface-fields border border-line focus:border-gold focus:bg-card rounded-xl px-4 py-2 outline-none text-ink transition-all placeholder:text-ink-faint"
                    placeholder="Min. 6 characters"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-surface-fields border border-line focus:border-gold focus:bg-card rounded-xl px-4 py-2 outline-none text-ink transition-all placeholder:text-ink-faint"
                    placeholder="e.g. +1 234 567 890"
                  />
                </div>
              </div>

              {/* Form Actions Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-card-line">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 rounded-2xl bg-surface-fields hover:bg-line text-ink-soft font-medium transition-all"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-2xl bg-gold hover:bg-gold-deep text-on-gold font-medium shadow-sm transition-all disabled:opacity-60"
                >
                  {submitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((card, index) => (
          <div
            key={index}
            className="bg-card rounded-3xl p-6 shadow-sm border border-card-line flex justify-between items-center transition-all hover:shadow-md"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-ink-faint text-sm font-medium">
                {card.title}
              </span>
              <span className="text-4xl font-bold text-ink mt-2">
                {card.value}
              </span>
            </div>

            <div className="bg-gold-light p-4 rounded-2xl shadow-sm flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <UsersTable
          users={tableUsers}
          onDelete={setDeletingUser}
          onEdit={setEditingUserId}
          onToggleRole={handleToggleRole}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {editingUserId && (
        <EditUserModal
          userId={editingUserId}
          onCancel={() => setEditingUserId(null)}
          onSuccess={() => {
            setEditingUserId(null);
            fetchUsers();
          }}
        />
      )}

      {deletingUser && (
        <DeleteConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete "${deletingUser.username}"? This action cannot be undone.`}
          onCancel={() => setDeletingUser(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Users;
