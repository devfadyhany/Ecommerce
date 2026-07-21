import { Link } from "react-router-dom";

function AuthLink({ to, linkText, text, onClick, disabled = false }) {
    return (
        <p className="text-sm text-ink text-center mt-4">
            {text}
            {onClick ? (
                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    className={`text-gold text-decoration-none hover:underline hover:text-gold-deep ml-1
                         ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {linkText}
                </button>
            ) : (
                <Link to={to}
                    className="text-gold text-decoration-none hover:underline hover:text-gold-deep ml-1"
                >
                    {linkText}
                </Link>
            )}
        </p>
    )
}

export default AuthLink;