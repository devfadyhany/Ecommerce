function LoadingSpinner({ size = "h-10 w-10" }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`${size} animate-spin rounded-full border-4 border-gold border-t-transparent`}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
