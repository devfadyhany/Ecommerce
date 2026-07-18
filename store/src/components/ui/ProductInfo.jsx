import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";

const ProductInfo = ({
    product,
    quantity,
    handleQuantityChange,
    handleAddToCart,
    isAddingMainToCart,
    handleToggleWishlist,
    isWishlisted,
}) => {
const {
    title,
    name,
    description,
    price,
    discountPrice,
    brand,
    category,
    stock,
    reviews = [],
} = product;

const displayTitle = title || name;
const hasDiscount = discountPrice && discountPrice < price;
const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;
const isOutOfStock = stock <= 0;

return (
    <div className="flex flex-col justify-start space-y-5">
        <div className="flex gap-2">
            {brand && (
            <span className="bg-gold-light text-gold-deep text-xs font-semibold px-3 py-1 rounded-full uppercase">
                {brand}
            </span>
            )}
            {category && (
            <span className="bg-surface-soft text-ink-soft text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {category}
            </span>
            )}
        </div>

        <h1 className="text-3xl font-bold text-ink capitalize">
            {displayTitle}
        </h1>

        <div className="flex items-center gap-3">
            <div className="flex items-center text-ink-faint">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                key={star}
                className={
                    star <= (product.averageRating || 0)
                    ? "text-gold"
                    : "text-ink-faint"
                }
                size={16}
                />
            ))}
            </div>
            <span className="text-ink-faint text-sm">({reviews.length})</span>

            <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isOutOfStock
                ? "bg-red-50 text-red-500"
                : "bg-emerald-50 text-emerald-500"
            }`}
            >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
        </div>

        <div className="flex items-baseline gap-3 pt-2">
            {hasDiscount ? (
            <>
                <span className="text-3xl font-bold text-gold-deep">
                EGP {discountPrice}
                </span>
                <span className="text-base text-ink-faint line-through">
                EGP {price}
                </span>
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-md">
                -{discountPercentage}%
                </span>
            </>
            ) : (
            <span className="text-3xl font-bold text-ink">EGP {price}</span>
            )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <div className="flex items-center justify-between border border-line rounded-xl px-3 py-2 w-full sm:w-28 bg-surface-soft">
            <button
                onClick={() => handleQuantityChange("decrease")}
                disabled={isOutOfStock || quantity <= 1 || isAddingMainToCart}
                className="text-ink-faint hover:text-ink disabled:opacity-30 text-lg font-semibold px-2"
            >
                -
            </button>
            <span className="font-semibold text-ink text-sm">
                {quantity}
            </span>
            <button
                onClick={() => handleQuantityChange("increase")}
                disabled={isOutOfStock || isAddingMainToCart}
                className="text-ink-faint hover:text-ink disabled:opacity-30 text-lg font-semibold px-2"
            >
                +
            </button>
            </div>

            <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingMainToCart}
            className="flex-1 bg-gold hover:bg-gold-deep disabled:bg-surface-soft text-on-gold font-semibold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed min-h-[46px]"
            >
            {isAddingMainToCart ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
                <>
                <FaShoppingCart size={14} />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </>
            )}
            </button>

            <button
            onClick={handleToggleWishlist}
            className="p-3 border border-line hover:border-red-500 hover:bg-red-50/30 rounded-xl flex items-center justify-center transition-all group"
            >
            {isWishlisted ? (
                <FaHeart
                className="text-red-500 scale-105 transition-transform"
                size={18}
                />
            ) : (
                <FaRegHeart
                className="text-ink-faint group-hover:text-red-500 transition-colors"
                size={18}
                />
            )}
            </button>
        </div>

        <p className="text-ink-soft text-sm leading-relaxed pt-2">
            {description || "No description available for this product yet."}
        </p>
    </div>
);
};

export default ProductInfo;