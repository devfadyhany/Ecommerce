import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";

// ---- Single related product card ----
    const RelatedProductCard = ({
        item,
        isFavorite,
        isAdding,
        onToggleWishlist,
        onAddToCart,
    }) => {
    const itemId = item._id || item.id;
    const itemTitle = item.title || item.name;
    const itemHasDiscount = item.discountPrice && item.discountPrice < item.price;
    const itemDiscountPct = itemHasDiscount
        ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
        : 0;
    const itemImg =
        item.images && item.images[0] ? item.images[0]?.url || item.images[0] : "";

    return (
        <div className="bg-card border border-line rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group min-h-[520px]">
        <div className="flex justify-between items-center mb-3">
            <span className="bg-gold-light text-gold-deep text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {item.category || "Fashion"}
            </span>

            <div className="flex items-center gap-2">
            {itemHasDiscount && (
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-md">
                -{itemDiscountPct}%
                </span>
            )}
            <button
                onClick={onToggleWishlist}
                className="p-2 bg-card rounded-full border border-line shadow-sm hover:bg-red-50/40 transition-all"
            >
                {isFavorite ? (
                <FaHeart
                    className="text-red-500 scale-105 transition-transform"
                    size={14}
                />
                ) : (
                <FaRegHeart
                    className="text-ink-faint hover:text-red-500 transition-colors"
                    size={14}
                />
                )}
            </button>
            </div>
        </div>

        <Link
            to={`/products/${itemId}`}
            className="flex justify-center items-center h-60 w-full overflow-hidden mb-5"
        >
            <img
            src={itemImg}
            alt={itemTitle}
            className="max-h-full max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-105"
            />
        </Link>

        <div className="space-y-3">
            <Link to={`/products/${itemId}`} className="block">
            <h3 className="font-semibold text-ink text-sm hover:text-gold transition-colors line-clamp-1 capitalize">
                {itemTitle}
            </h3>
            </Link>

            <div className="flex items-center gap-2">
            <div className="flex text-ink-faint">
                {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={
                    star <= (item.averageRating || 0)
                        ? "text-gold"
                        : "text-ink-faint"
                    }
                    size={12}
                />
                ))}
            </div>
            <span className="text-ink-faint text-xs">
                ({item.reviews?.length || 0})
            </span>
            </div>

            <div className="flex items-baseline gap-2 pt-1 pb-1">
            {itemHasDiscount ? (
                <>
                <span className="text-base font-bold text-gold-deep">
                    EGP {item.discountPrice}
                </span>
                <span className="text-xs text-ink-faint line-through">
                    EGP {item.price}
                </span>
                </>
            ) : (
                <span className="text-base font-bold text-ink">
                EGP {item.price}
                </span>
            )}
            </div>

            <button
            onClick={onAddToCart}
            disabled={isAdding}
            className="w-full mt-3 bg-gold hover:bg-gold-deep disabled:bg-surface-soft text-on-gold font-semibold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 min-h-[40px] disabled:cursor-not-allowed"
            >
            {isAdding ? (
                <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white border-t-transparent"></div>
            ) : (
                <>
                <FaShoppingCart size={12} />
                Add to Cart
                </>
            )}
            </button>
        </div>
        </div>
    );
    };

    // ---- Related products grid ----
    const RelatedProducts = ({
    relatedProducts,
    wishlistedIds,
    addingRelatedId,
    onToggleWishlist,
    onAddToCart,
    }) => {
    if (!relatedProducts || relatedProducts.length === 0) return null;

    return (
        <div className="border-t border-line pt-4 mt-4">
        <h2 className="text-2xl font-bold text-ink mb-8">
            Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => {
            const itemId = item._id || item.id;
            return (
                <RelatedProductCard
                key={itemId}
                item={item}
                isFavorite={wishlistedIds.includes(itemId)}
                isAdding={addingRelatedId === itemId}
                onToggleWishlist={() => onToggleWishlist(itemId)}
                onAddToCart={() => onAddToCart(itemId)}
                />
            );
            })}
        </div>
        </div>
    );
};

export default RelatedProducts;