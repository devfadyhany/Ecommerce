import { useState } from "react";
import { Search, SlidersHorizontal, Shapes, Tag } from "lucide-react";

const CATEGORIES = [
  "All",
  "electronics",
  "phones",
  "fashion",
  "home",
  "beauty",
  "sports",
];

function ProductsFilterBar({
  search,
  setSearch,
  onSearchSubmit,
  category,
  setCategory,
  subcategory,
  setSubcategory,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-card border border-line rounded-2xl p-4 mb-6 w-full mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchSubmit();
            }}
            className="w-full h-11 pl-11 pr-4 rounded-2xl border border-line bg-surface-fields text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-expanded={showFilters}
          className={`flex items-center gap-2 h-11 px-4 rounded-2xl border font-medium transition
            ${
              showFilters
                ? "border-gold bg-gold-light text-gold-deep"
                : "border-line bg-surface-fields text-ink-soft hover:bg-gold-light hover:text-gold-deep hover:border-gold"
            }`}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <button
          onClick={onSearchSubmit}
          disabled={!search.trim()}
          className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-gold text-on-gold font-semibold hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={16} />
          Search
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          showFilters ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 pt-4 border-t border-line transition-opacity duration-300 ${
              showFilters ? "opacity-100 delay-100" : "opacity-0"
            }`}
          >
            <div className="p-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
                <Shapes size={14} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-fields text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
                <Tag size={14} />
                Subcategory
              </label>
              <input
                type="text"
                placeholder="e.g. smartphones"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-line bg-surface-fields text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsFilterBar;
