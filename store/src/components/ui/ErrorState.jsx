import { FaExclamationTriangle } from "react-icons/fa";

const ErrorState = ({
  title = "Something went wrong",
  message = "",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-5">
        <FaExclamationTriangle size={24} className="text-danger-text" />
      </div>

      <p className="text-lg font-semibold text-ink mb-2">{title}</p>

      {message && <p className="text-ink-soft text-sm max-w-sm">{message}</p>}

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 border border-gold text-gold hover:bg-gold hover:text-on-gold font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
