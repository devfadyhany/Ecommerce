import { User, Pencil, BadgeCheck, Trash2, X, Check, ChevronLeft, ChevronRight } from "lucide-react";

function UsersTable({ users, onDelete, onEdit, onToggleVerify, currentPage = 1, totalPages = 2, onPageChange }) {
  return (
    <div className="bg-card rounded-2xl border border-card-line shadow-md w-full mx-auto overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-card-line bg-surface-fields">
              <th className="p-4 text-sm font-semibold">User</th>
              <th className="p-4 text-sm font-semibold">Role</th>
              <th className="p-4 text-sm font-semibold">Verified</th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!users || users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id || user.id}
                  className="border-b border-card-line hover:bg-surface-fields transition duration-150"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-fields border border-card-line flex items-center justify-center text-ink-soft shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-ink text-sm md:text-base">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-600">
                        {user.email}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? " text-bage-600"
                          : " text-gray-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      {user.isVerified ? (
                        <>
                          <Check className="text-emerald-500" size={16} />
                          <span className="text-ink-soft">Yes</span>
                        </>
                      ) : (
                        <>
                          <X className="text-red-500 font-bold" size={16} />
                          <span className="text-ink-soft">No</span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(user._id || user.id)}
                        className="p-2 bg-gray-900 hover:bg-gray-400 text-white rounded-full transition shadow-sm"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => onToggleVerify(user._id || user.id)}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition shadow-sm"
                        title="Toggle Verify"
                      >
                        <BadgeCheck size={15} />
                      </button>

                      <button
                        onClick={() => onDelete(user)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-card-line bg-card text-sm">
        <div className="text-ink-soft">
          Page <span className="font-semibold text-ink">{currentPage}</span> of{" "}
          <span className="font-semibold text-ink">{totalPages}</span>
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-card-line rounded-lg text-ink-soft hover:bg-surface-fields disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => onPageChange && onPageChange(1)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              currentPage === 1
                ? "bg-slate-900 text-white" 
                : "border border-card-line text-ink-soft hover:bg-surface-fields"
            }`}
          >
            1
          </button>

          <button
            onClick={() => onPageChange && onPageChange(2)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              currentPage === 2
                ? "bg-slate-900 text-white"
                : "border border-card-line text-ink-soft hover:bg-surface-fields"
            }`}
          >
            2
          </button>

          <button
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-card-line rounded-lg text-ink-soft hover:bg-surface-fields disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;