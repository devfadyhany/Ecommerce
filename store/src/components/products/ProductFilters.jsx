import { FaTimes } from "react-icons/fa";
import { PRODUCTS_SORT_OPTIONS } from "../../constants";
import Button from "../ui/Button";

const ProductFilters = ({
  categories = [],
  filters,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearFilters,
  isOpen = false,
  onClose,
}) => {
  const { category, minPrice, maxPrice, sort } = filters;

  const isDefault = !category && !minPrice && !maxPrice && !sort;

  return (
    <>
      {/* Backdrop, mobile/tablet only */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-ink/40 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-[85%] max-w-xs z-50 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:h-fit lg:w-auto lg:max-w-none lg:translate-x-0 lg:z-auto lg:overflow-visible
        `}
      >
        <div className="bg-card border border-card-line lg:rounded-2xl p-6 space-y-8 h-full lg:h-fit">
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="font-bold text-ink text-lg">Filters</h2>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="p-2 text-ink-faint hover:text-ink transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-bold text-ink mb-4">Category</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={!category}
                  onChange={() => onCategoryChange("")}
                  className="w-4 h-4 accent-gold cursor-pointer"
                />
                <span
                  className={`text-sm ${
                    !category ? "text-ink font-semibold" : "text-ink-soft"
                  } group-hover:text-ink transition-colors`}
                >
                  All
                </span>
              </label>

              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => onCategoryChange(cat)}
                    className="w-4 h-4 accent-gold cursor-pointer"
                  />
                  <span
                    className={`text-sm capitalize ${
                      category === cat
                        ? "text-ink font-semibold"
                        : "text-ink-soft"
                    } group-hover:text-ink transition-colors`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-ink mb-4">Price Range</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full rounded-lg py-2.5 px-3 border border-line bg-surface-fields text-ink text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full rounded-lg py-2.5 px-3 border border-line bg-surface-fields text-ink text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-bold text-ink mb-4">Sort By</h3>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-lg py-2.5 px-3 border border-line bg-card text-ink text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold appearance-none cursor-pointer"
            >
              {PRODUCTS_SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear All Filters */}
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={isDefault}
            fullWidth
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
