
import { IoClose } from "react-icons/io5";

function EditUserModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-[460px] rounded-3xl bg-white shadow-2xl p-6 mx-4">

        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-bold text-slate-900">
            Edit User
          </h2>
          <button className="text-slate-400 hover:text-slate-600 transition">
            <IoClose className="w-8 h-8" />
          </button>
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Username
          </label>

          <input
            type="text"
            placeholder=" Enter username"
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none focus:border-sky-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Phone
          </label>

          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none focus:border-sky-500"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Avatar URL
          </label>

          <input
            type="text"
            placeholder= "Enter avatar URL"
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none focus:border-sky-500"
          />
        </div>

        <button className="w-full rounded-2xl bg-sky-600 py-3.5 text-lg font-semibold text-white transition hover:bg-sky-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditUserModal;