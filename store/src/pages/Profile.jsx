import { useState } from "react";
import ProfileInfo from "../components/layout/ui/ProfileInfo";
import EditProfileForm from "../components/layout/ui/EditProfileForm";
import AddressForm from "../components/layout/ui/AddressForm";
import ChangePasswordCard from "../components/layout/ui/ChangePasswordCard";
import LogoutButton from "../components/layout/ui/LogoutButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";

function Profile() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [isEditing, setIsEditing] = useState(false);

  const { user, refreshUser } = useAuth();
  const onSave = async (updatedUser) => {
    setLoading(true);
    try {
      const res = await api.patch(`/users/${user._id}`, updatedUser);
      if (res.data.success) {
        await refreshUser();
        showSuccessToast(res.data.message || "Profile updated successfully.");
        setIsEditing(false);
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h2 className="text-ink font-bold text-3xl">My Profile</h2>
      {isEditing ? (
        <EditProfileForm
          user={user}
          loading={loading}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <ProfileInfo user={user} onEdit={() => setIsEditing(true)} />
      )}
      <AddressForm user={user} refreshUser={refreshUser} />
      <ChangePasswordCard />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
}

export default Profile;
