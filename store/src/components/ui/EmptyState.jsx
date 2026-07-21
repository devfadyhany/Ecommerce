import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon: Icon = FaInbox,
  title = "Nothing here yet",
  message = "",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      <div className="w-16 h-16 rounded-full bg-surface-soft flex items-center justify-center mb-5">
        <Icon size={28} className="text-ink-faint" />
      </div>

      <p className="text-lg font-semibold text-ink mb-2">{title}</p>

      {message && (
        <p className="text-ink-soft text-sm max-w-sm">{message}</p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 bg-gold hover:bg-gold-deep text-on-gold font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;