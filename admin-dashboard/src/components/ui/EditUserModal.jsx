import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { showSuccessToast, showErrorToast } from "../../utils/toastHelpers";
import api from "../../api/axios";

function EditUserModal({ userId, onCancel, onSuccess }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;

      try {
        setSaving(true);
        const res = await api.get(`/users/${userId}`);
        setUsername(res.data.user.username);
        setPhone(res.data.user.phone);
        setAvatar(res.data.user.avatar);
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    };
    getUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      await api.patch(`/users/${userId}`, {
        username,
        phone,
        avatar,
      });

      showSuccessToast("User updated successfully!");
      onSuccess();
    } catch (err) {
      showErrorToast("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-[460px] rounded-3xl bg-card shadow-2xl p-6 mx-4">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-bold text-ink">Edit User</h2>
          <button
            onClick={onCancel}
            className="text-ink-faint hover:text-ink transition"
          >
            <IoClose className="w-8 h-8" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full rounded-2xl border border-line px-5 py-3 outline-none bg-card text-ink focus:border-gold"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Phone
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full rounded-2xl border border-line px-5 py-3 outline-none bg-card text-ink focus:border-gold"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Avatar URL
          </label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter avatar URL"
            className="w-full rounded-2xl border border-line px-5 py-3 outline-none bg-card text-ink focus:border-gold"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-2xl bg-gold py-3.5 text-lg font-semibold text-on-gold transition hover:bg-gold-deep disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default EditUserModal;
