import { Search } from "lucide-react";

function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  showButton = false,
  className = "",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`}>
      <div className="relative flex-1 min-w-36 sm:min-w-44">
        <Search
          size={16}
          className="stroke-3 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-ink-faint sm:w-[18px] sm:h-[18px]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-10 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-[11px] border border-line bg-card text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {showButton && (
        <button
          type="button"
          onClick={() => onSearch?.(value)}
          disabled={!value?.trim()}
          className="flex items-center gap-1.5 sm:gap-2 h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm bg-gold text-on-gold rounded-lg hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
          Search
        </button>
      )}
    </div>
  );
}

export default SearchInput;
