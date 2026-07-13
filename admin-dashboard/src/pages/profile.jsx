import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EditUserModal from "../components/ui/EditUserModal";

function Profile() {
  const { user, loading, refreshUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  const numericDate = dayjs(user?.updatedAt);

  function inputdisabild(valueEdit, title) {
    return (
      <div className="relative">
        <input
          type="text"
          disabled
          className="w-full border border-line bg-surface-fields text-ink-soft h-12 rounded-md tracking-[1.5px] pt-4 pl-2 cursor-not-allowed"
          value={valueEdit}
        />
        <p className="absolute top-[1px] text-sm left-2 text-gold">{title}</p>
      </div>
    );
  }

  function inputdisabild2(valueEdit, title) {
    return (
      <div className="flex-1 relative">
        <input
          type="text"
          disabled
          className="w-full h-12 border border-line bg-surface-fields text-ink-soft rounded-md tracking-[1.5px] pt-4 pl-2 cursor-not-allowed"
          value={valueEdit}
        />
        <p className="absolute top-[1px] left-2 text-sm text-gold">{title}</p>
      </div>
    );
  }

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="w-full px-0 py-4">
        <div className="space-y-5 w-full bg-surface-soft rounded-xl flex flex-col items-center">
          <div>
            <img
              src={user.avatar || "../hero.png"}
              className="size-40 rounded-full object-cover"
            />
          </div>
          <div className="p-5 space-y-4 w-[90%] lg:w-[78%] h-auto bg-card border border-card-line rounded-xl">
            {inputdisabild(user.username, "Your name")}
            {inputdisabild(user.email, "Email")}
            {inputdisabild("••••••••", "Password")}
            {inputdisabild(user.phone, "Phone")}

            <div className="flex gap-4">
              {inputdisabild2(numericDate.year(), "Year")}
              {inputdisabild2(numericDate.format("DD/MMMM"), "Date")}
              {inputdisabild2(numericDate.format(" HH:mm"), "Time")}
            </div>

            <button
              onClick={() => setOpenEdit(true)}
              className="w-full h-10 text-xl bg-gold hover:bg-gold-deep text-on-gold tracking-[2px] rounded-md transition-colors"
            >
              Update
            </button>
          </div>
        </div>

        {openEdit && (
          <EditUserModal
            userId={user._id}
            onCancel={() => setOpenEdit(false)}
            onSuccess={refreshUser}
          />
        )}
      </div>
    </>
  );
}

export default Profile;
