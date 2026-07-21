const VARIANT_CLASSES = {
  primary:
    "bg-gold hover:bg-gold-deep disabled:bg-surface-soft text-on-gold disabled:text-ink-faint",
  outline:
    "border border-gold text-gold hover:bg-gold hover:text-on-gold disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold",
  danger: "bg-danger-bg/5 hover:bg-danger-bg disabled:opacity-50 text-white",
  ghost:
    "text-ink-soft hover:text-ink hover:bg-surface-soft disabled:opacity-40",
};

const SIZE_CLASSES = {
  sm: "text-xs px-4 py-2 min-h-[36px] rounded-lg gap-1.5",
  md: "text-sm px-6 py-2.5 min-h-[42px] rounded-xl gap-2",
  lg: "text-sm px-8 py-3 min-h-[46px] rounded-xl gap-2",
};

const SPINNER_BORDER_BY_VARIANT = {
  primary: "border-white border-t-transparent",
  outline: "border-gold border-t-transparent",
  danger: "border-white border-t-transparent",
  ghost: "border-ink-soft border-t-transparent",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading = false,
  loadingText = "Loading...",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        font-semibold transition-all flex items-center justify-center
        disabled:cursor-not-allowed shadow-sm
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {isLoading ? (
        <>
          <div
            className={`animate-spin rounded-full h-4 w-4 border-2 ${SPINNER_BORDER_BY_VARIANT[variant]}`}
          />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon size={14} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
