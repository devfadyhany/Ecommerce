import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

function AuthInput({
    label,
    icon,
    type,
    placeholder,
    value,
    onChange,
    required,
    minLength,
    maxLength
}) {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-ink">
                {label}
            </label>
            <div className="relative">
                <div className='absolute left-3 top-3 text-ink '>
                    {icon}
                </div>
                <input
                    className="pl-10 pr-4 rounded-md py-2 border border-line focus:outline-none focus:ring-1 focus:ring-gold w-full bg-surface-fields text-ink"
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-ink cursor-pointer hover:text-gold transition-all duration-200"
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                )}
            </div>
        </div>
    );
}



export default AuthInput;