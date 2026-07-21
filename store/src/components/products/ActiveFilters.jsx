import { FaTimes } from "react-icons/fa";
import { PRODUCTS_SORT_OPTIONS } from "../../constants";

const Chip = ({ label, onRemove, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 bg-gold-light text-gold-deep text-xs font-semibold pl-3 pr-2 py-1.5 rounded-full ${className}`}
  >
    {label}
    <button
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
      className="hover:text-danger-text transition-colors"
    >
      <FaTimes size={10} />
    </button>
  </span>
);

const ActiveFilters = ({ filters, onRemove, onClearAll }) => {
  const { category, minPrice, maxPrice, sort } = filters;

  const hasActiveFilters = Boolean(category || minPrice || maxPrice || sort);
  if (!hasActiveFilters) return null;

  const sortLabel = PRODUCTS_SORT_OPTIONS.find(
    (opt) => opt.value === sort,
  )?.label;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {category && (
        <Chip
          label={category}
          className="capitalize"
          onRemove={() => onRemove("category")}
        />
      )}

      {minPrice && (
        <Chip
          label={`Min: ${minPrice}`}
          onRemove={() => onRemove("minPrice")}
        />
      )}

      {maxPrice && (
        <Chip
          label={`Max: ${maxPrice}`}
          onRemove={() => onRemove("maxPrice")}
        />
      )}

      {sort && <Chip label={sortLabel} onRemove={() => onRemove("sort")} />}

      <button
        onClick={onClearAll}
        className="text-danger-text text-xs font-semibold hover:underline ml-1"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
