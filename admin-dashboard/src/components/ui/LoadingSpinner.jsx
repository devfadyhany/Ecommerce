function LoadingSpinner({ size = "h-10 w-10", label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen">
      <div
        className={`${size} animate-spin rounded-full border-4 border-gold border-t-transparent`}
      ></div>
      {label && <p className="text-ink-soft text-sm font-medium">{label}</p>}
    </div>
  );
}

export default LoadingSpinner;
