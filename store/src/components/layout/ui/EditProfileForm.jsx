import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toastHelpers";
function EditProfileForm({ user, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState(user);
  function handleChange(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleSave() {
    const username = formData.username ?? formData.userName ?? "";
    const avatar = formData.avatar ?? formData.image ?? "";

    if (!username.trim() || !formData.phone?.trim() || !avatar.trim()) {
      showErrorToast("Please fill in all required fields.");
      return;
    }

    const updatedUser = {
      ...formData,
      username: username.trim(),
      avatar: avatar.trim(),
    };

    onSave(updatedUser);
    showSuccessToast("Profile updated successfully.");
  }
  return (
    <div className="bg-card p-4 space-y-4 rounded-2xl shadow-md max-w-6xl mx-auto p-4 space-y-6 ">
      <div className="p-header flex justify-start items-center gap-3">
        <img
          className="size-20 rounded-full"
          src={user.avatar || user.image}
          alt="profile"
        />
        <div className="user-info">
          <h3 className="text-xl font-bold text-ink">
            {user.username || user.userName}
          </h3>
          <p className="text-md font-thin text-ink-soft">{user.email}</p>
          <p className="text-md font-thin text-gold">{user.role}</p>
        </div>
      </div>
      <div className="contact-info">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label className="text-sm  text-ink-soft">Username</label>
            <input
              type="text"
              onChange={(e) => handleChange("username", e.target.value)}
              value={formData.username || formData.userName || ""}
              placeholder="Enter your username"
              className="w-full border border-gold rounded-xl p-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label className="text-sm  text-ink-soft">Phone</label>
            <input
              type="text"
              onChange={(e) => handleChange("phone", e.target.value)}
              value={formData.phone}
              placeholder="Enter your phone number"
              className="w-full border border-gold rounded-xl p-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label className="text-sm  text-ink-soft">Avatar URL</label>
            <input
              type="url"
              onChange={(e) => handleChange("avatar", e.target.value)}
              value={formData.avatar || formData.image || ""}
              placeholder="Enter your avatar URL"
              className="w-full border border-gold rounded-xl p-3 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 items-start justify-center mt-3">
            <button
              type="button"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-gold-deep to-gold text-on-gold hover:shadow-lg transition disabled:opacity-50"
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-gold-deep to-gold text-on-gold hover:shadow-lg transition"
              onClick={onCancel}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfileForm;
