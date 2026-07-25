function AuthButton({
    text,
    loading = false,
    type = "submit",
    disabled = false
}) {
    return (
        <button
            disabled={loading || disabled}
            className=
            {`form-submit-btn bg-gold font-bold text-on-gold py-2 px-4 rounded-md cursor-pointer 
                hover:bg-gold-deep transition-all duration-200 mt-4 flex items-center justify-center gap-2 
                ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            type={type}
        >
            {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-gold" />
            ) : (
                text
            )}
        </button>
    );
}

export default AuthButton;