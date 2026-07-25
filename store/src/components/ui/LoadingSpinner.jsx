function LoadingSpinner({ size = "h-10 w-10", label, className = "h-screen" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${size} animate-spin rounded-full border-t-2 border-b-2 border-gold`}
      ></div>
      {label && <p className="text-ink-soft text-sm font-medium">{label}</p>}
    </div>
  );
}

export default LoadingSpinner;

