import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { CURRENCY, DEFAULT_CATEGORY_LABEL } from "../../constants";
import Button from "../ui/Button";

const ProductCard = ({
  product,
  isWishlisted,
  isAddingToCart,
  onToggleWishlist,
  onAddToCart,
}) => {
  const {
    _id,
    id,
    name,
    title,
    price,
    discountPrice,
    stock,
    category,
    images = [],
    averageRating = 0,
    numReviews,
    reviews = [],
  } = product;

  const productId = _id || id;
  const displayTitle = title || name;
  const displayImage = images?.[0]?.url || images?.[0] || "";
  const reviewCount = numReviews ?? reviews.length;

  const hasDiscount = Boolean(discountPrice) && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;
  const isOutOfStock = stock <= 0;

  return (
    <div className="bg-card border border-card-line rounded-3xl p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
      {/* Category + Discount + Wishlist */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <span className="bg-gold-light text-gold-deep text-xs font-semibold px-3 py-1 rounded-full capitalize truncate">
          {category || DEFAULT_CATEGORY_LABEL}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {hasDiscount && discountPercentage > 0 && (
            <span className="bg-danger-bg text-danger-text text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          <button
            onClick={onToggleWishlist}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="p-2 bg-card rounded-full border border-line shadow-sm transition-all"
          >
            {isWishlisted ? (
              <FaHeart
                className="text-danger-text scale-105 transition-transform"
                size={14}
              />
            ) : (
              <FaRegHeart
                className="text-ink-faint hover:text-danger-text transition-colors"
                size={14}
              />
            )}
          </button>
        </div>
      </div>

      {/* Image */}
      <Link
        to={`/products/${productId}`}
        className="relative flex justify-center items-center h-52 w-full overflow-hidden mb-5 bg-surface-soft rounded-2xl"
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayTitle}
            className={`max-h-full max-w-[90%] object-contain transition-transform duration-300 ${
              isOutOfStock ? "" : "group-hover:scale-105"
            }`}
          />
        ) : (
          <span className="text-ink-faint text-xs">No image</span>
        )}

        {isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-ink/40" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-danger-bg text-danger-text text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
              Out of Stock
            </span>
          </>
        )}
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        <Link to={`/products/${productId}`} className="block">
          <h3 className="font-semibold text-ink text-sm hover:text-gold transition-colors line-clamp-1 capitalize">
            {displayTitle}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex text-ink-faint">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  star <= averageRating ? "text-gold" : "text-ink-faint"
                }
                size={12}
              />
            ))}
          </div>
          <span className="text-ink-faint text-xs">({reviewCount})</span>
        </div>

        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-gold-deep">
                {CURRENCY} {discountPrice}
              </span>
              <span className="text-xs text-ink-faint line-through">
                {CURRENCY} {price}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-ink">
              {CURRENCY} {price}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="md"
          icon={FaShoppingCart}
          isLoading={isAddingToCart}
          loadingText="Adding..."
          disabled={isOutOfStock}
          fullWidth
          onClick={onAddToCart}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
