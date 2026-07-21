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
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-on-gold border-t-transparent" />
            ) : (
                text
            )}
        </button>
    );
}

export default AuthButton;