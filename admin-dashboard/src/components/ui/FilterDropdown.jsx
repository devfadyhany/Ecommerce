import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function FilterDropdown({
  value,
  onChange,
  options,
  allLabel = "All",
  icon: Icon,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : allLabel;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (optValue) => {
    onChange(optValue);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-10 sm:h-12 ${
          Icon ? "pl-9 sm:pl-10" : "pl-3 sm:pl-4"
        } pr-8 sm:pr-10 rounded-[10px] border border-line bg-card text-ink-soft text-xs sm:text-sm text-left capitalize focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer truncate`}
      >
        {displayLabel}
      </button>

      {Icon && (
        <Icon
          size={16}
          className="stroke-3 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none sm:w-[18px] sm:h-[18px]"
        />
      )}

      <ChevronDown
        size={14}
        className={`stroke-3 absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none transition-transform duration-200 sm:w-4 sm:h-4 ${
          open ? "rotate-180" : ""
        }`}
      />

      {open && (
        <ul className="thin-scrollbar absolute z-20 mt-2 w-full px-1 max-h-56 sm:max-h-64 overflow-y-auto rounded-[10px] border border-line bg-card shadow-lg py-1">
          <li
            onClick={() => handleSelect("")}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer capitalize hover:bg-surface-fields rounded-[11px] ${
              value === "" ? "text-ink-faint font-semibold" : "text-ink"
            }`}
          >
            {allLabel}
          </li>

          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer capitalize hover:bg-surface-fields rounded-[11px] ${
                value === opt.value ? "text-ink-faint font-semibold" : "text-ink"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterDropdown;