import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} from "../utils/toastHelpers";
import {
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaUser,
  FaTrashAlt,
} from "react-icons/fa";
import { LuMaximize2 } from "react-icons/lu";
import api from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState([]);

  const isLoggedIn = !!localStorage.getItem("token");

  const [isAddingMainToCart, setIsAddingMainToCart] = useState(false);
  const [addingRelatedId, setAddingRelatedId] = useState(null);

  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);

        let fetchedProduct = null;
        if (response.data && response.data.product) {
          fetchedProduct = response.data.product;
        } else {
          fetchedProduct = response.data;
        }

        setProduct(fetchedProduct);
        setError("");

        if (fetchedProduct && fetchedProduct.category) {
          // eslint-disable-next-line react-hooks/immutability
          fetchRelatedProducts(
            fetchedProduct.category,
            fetchedProduct._id || fetchedProduct.id,
          );
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        showErrorToast("Error fetching product details!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [id]);

  const fetchRelatedProducts = async (categoryName, currentProductId) => {
    try {
      const response = await api.get(`/products?category=${categoryName}`);
      const allProducts = response.data.products || response.data || [];

      const filtered = allProducts.filter(
        (item) => (item._id || item.id) !== currentProductId,
      );

      setRelatedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const handleDeleteReview = async (reviewId, index) => {
    try {
      if (reviewId) {
        await api.delete(`/products/${id}/reviews/${reviewId}`);
      }

      setProduct((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((_, idx) => idx !== index),
      }));
      showSuccessToast("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      showErrorToast("Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5840e4]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-red-500 font-semibold">
          {error || "Product not found."}
        </p>
      </div>
    );
  }

  const {
    title,
    name,
    description,
    price,
    discountPrice,
    images = [],
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      if (quantity < stock) setQuantity((prev) => prev + 1);
      else showWarningToast(`Sorry, only ${stock} items available in stock.`);
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingMainToCart(true);
      await api.post("/carts/items", { productId: id, quantity });
      showSuccessToast("Added to cart successfully! ");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Failed to add to cart. Please check your login status.");
    } finally {
      setIsAddingMainToCart(false);
    }
  };

  const handleAddRelatedToCart = async (productId) => {
    try {
      setAddingRelatedId(productId);
      await api.post("/carts/items", { productId, quantity: 1 });
      showSuccessToast("Added to cart successfully! ");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Failed to add to cart.");
    } finally {
      setAddingRelatedId(null);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (!isWishlisted) {
        await api.post(`/wishlists/add/${id}`);
        setIsWishlisted(true);
        showSuccessToast("Added to wishlist. ");
      } else {
        await api.delete(`/wishlists/remove/${id}`);
        setIsWishlisted(false);
        showInfoToast("Removed from wishlist.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Please login first to manage your wishlist.");
    }
  };

  const handleToggleRelatedWishlist = async (productId) => {
    try {
      const isAlreadyAdded = wishlistedIds.includes(productId);
      if (!isAlreadyAdded) {
        await api.post(`/wishlists/add/${productId}`);
        setWishlistedIds((prev) => [...prev, productId]);
        showSuccessToast("Added to wishlist.");
      } else {
        await api.delete(`/wishlists/remove/${productId}`);
        setWishlistedIds((prev) => prev.filter((favId) => favId !== productId));
        showInfoToast("Removed from wishlist.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Please login first to manage your wishlist.");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showWarningToast("Please write your review comment.");
      return;
    }
    try {
      setSubmittingReview(true);
      const response = await api.post(`/products/${id}/reviews`, {
        rating,
        comment: reviewComment,
      });
      showSuccessToast("Review submitted successfully ⭐");

      const newReview = response.data.review || {
        rating,
        comment: reviewComment,
        createdAt: new Date(),
      };
      setProduct((prev) => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
      }));
      setReviewComment("");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast(
        "Failed to add review. Only registered buyers can leave reviews.",
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg h-[450px] bg-slate-50/50 border border-slate-100 rounded-3xl flex items-center justify-center overflow-hidden group shadow-sm">
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 hover:text-slate-600 transition-colors">
                <LuMaximize2 size={16} />
              </button>

              {images.length > 0 ? (
                <>
                  <img
                    src={
                      images[currentImageIndex]?.url ||
                      images[currentImageIndex]
                    }
                    alt={displayTitle}
                    className="max-h-[85%] max-w-[85%] object-contain p-4 transition-all duration-300"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 p-2 text-blue-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FaChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 p-2 text-blue-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FaChevronRight size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-400">No images available</div>
              )}
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto max-w-md py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 border rounded-xl overflow-hidden flex-shrink-0 bg-white transition-all ${
                    currentImageIndex === idx
                      ? "border-[#5840e4] ring-2 ring-indigo-100"
                      : "border-slate-200"
                  }`}
                >
                  <img
                    src={img?.url || img}
                    alt=""
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start space-y-5">
            <div className="flex gap-2">
              {brand && (
                <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  {brand}
                </span>
              )}
              {category && (
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {category}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-800 capitalize">
              {displayTitle}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-slate-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= (product.averageRating || 0)
                        ? "text-yellow-400"
                        : "text-slate-200"
                    }
                    size={16}
                  />
                ))}
              </div>
              <span className="text-slate-400 text-sm">({reviews.length})</span>

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
                  <span className="text-3xl font-bold text-[#5840e4]">
                    EGP {discountPrice}
                  </span>
                  <span className="text-base text-slate-400 line-through">
                    EGP {price}
                  </span>
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-1 rounded-md">
                    -{discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-slate-800">
                  EGP {price}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2 w-full sm:w-28 bg-slate-50/50">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={isOutOfStock || quantity <= 1 || isAddingMainToCart}
                  className="text-slate-400 hover:text-slate-800 disabled:opacity-30 text-lg font-semibold px-2"
                >
                  -
                </button>
                <span className="font-semibold text-slate-700 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={isOutOfStock || isAddingMainToCart}
                  className="text-slate-400 hover:text-slate-800 disabled:opacity-30 text-lg font-semibold px-2"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingMainToCart}
                className="flex-1 bg-[#5840e4] hover:bg-[#4730cb] disabled:bg-slate-200 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed min-h-[46px]"
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
                className="p-3 border border-slate-200 hover:border-red-500 hover:bg-red-50/30 rounded-xl flex items-center justify-center transition-all group"
              >
                {isWishlisted ? (
                  <FaHeart
                    className="text-red-500 scale-105 transition-transform"
                    size={18}
                  />
                ) : (
                  <FaRegHeart
                    className="text-slate-400 group-hover:text-red-500 transition-colors"
                    size={18}
                  />
                )}
              </button>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed pt-2">
              {description || "No description available for this product yet."}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 mb-2">
          <div className="flex border-b border-slate-100 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 px-6 font-semibold text-base border-b-2 transition-all ${
                activeTab === "description"
                  ? "border-[#5840e4] text-[#5840e4]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-6 font-semibold text-base border-b-2 transition-all ${
                activeTab === "reviews"
                  ? "border-[#5840e4] text-[#5840e4]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="mb-4">
            {activeTab === "description" ? (
              <div className="text-slate-600 leading-relaxed max-w-4xl text-sm">
                <p>{description || "No detailed description available."}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {isLoggedIn ? (
                  <div className="bg-[#f9f8f6] p-8 rounded-3xl max-w-2xl">
                    <h3 className="text-base font-bold text-slate-800 mb-4">
                      Write a Review
                    </h3>

                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">
                          Your Rating:
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="text-xl focus:outline-none transition-transform active:scale-95"
                            >
                              {star <= rating ? (
                                <FaStar className="text-amber-400" />
                              ) : (
                                <FaRegStar className="text-slate-300" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        rows="4"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience about this product..."
                        className="w-full p-4 bg-transparent border border-slate-200 rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none text-sm text-slate-700 resize-y"
                      ></textarea>

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="bg-[#5840e4] hover:bg-[#4730cb] disabled:bg-slate-300 text-white text-xs font-semibold px-6 py-3 rounded-2xl transition-all shadow-sm"
                      >
                        {submittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="py-2 text-slate-500 text-sm">
                    <p className="italic mb-2">No reviews yet. Be the first!</p>
                    <Link
                      to="/login"
                      className="text-xs text-[#5840e4] hover:underline font-semibold"
                    >
                      Log in to write a review →
                    </Link>
                  </div>
                )}

                {reviews.length > 0 && (
                  <div className="space-y-6 max-w-4xl pt-2">
                    {reviews.map((rev, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-5">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#5840e4] border border-slate-100">
                              <FaUser size={16} />
                            </div>

                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-800 text-sm">
                                {rev.user?.username ||
                                  rev.user?.name ||
                                  "Customer Account"}
                              </span>
                              <span className="text-xs text-slate-400">
                                {rev.createdAt
                                  ? new Date(rev.createdAt).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      },
                                    )
                                  : ""}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              handleDeleteReview(rev._id || rev.id, idx)
                            }
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Delete review"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>

                        <div className="flex text-amber-400 text-xs gap-0.5 ml-13 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={
                                star <= rev.rating
                                  ? "text-amber-400"
                                  : "text-slate-200"
                              }
                              size={14}
                            />
                          ))}
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed ml-13">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-100 pt-4 mt-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => {
                const itemId = item._id || item.id;
                const itemTitle = item.title || item.name;
                const itemHasDiscount =
                  item.discountPrice && item.discountPrice < item.price;
                const itemDiscountPct = itemHasDiscount
                  ? Math.round(
                      ((item.price - item.discountPrice) / item.price) * 100,
                    )
                  : 0;
                const itemImg =
                  item.images && item.images[0]
                    ? item.images[0]?.url || item.images[0]
                    : "";
                const isRelatedFav = wishlistedIds.includes(itemId);
                const isItemAdding = addingRelatedId === itemId;

                return (
                  <div
                    key={itemId}
                    className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group min-h-[520px]"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-[#eef2ff] text-[#5840e4] text-xs font-semibold px-3 py-1 rounded-full capitalize">
                        {item.category || "Fashion"}
                      </span>

                      <div className="flex items-center gap-2">
                        {itemHasDiscount && (
                          <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-md">
                            -{itemDiscountPct}%
                          </span>
                        )}
                        <button
                          onClick={() => handleToggleRelatedWishlist(itemId)}
                          className="p-2 bg-white rounded-full border border-slate-100 shadow-sm hover:bg-red-50/40 transition-all"
                        >
                          {isRelatedFav ? (
                            <FaHeart
                              className="text-red-500 scale-105 transition-transform"
                              size={14}
                            />
                          ) : (
                            <FaRegHeart
                              className="text-slate-400 hover:text-red-500 transition-colors"
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
                        <h3 className="font-semibold text-slate-800 text-sm hover:text-[#5840e4] transition-colors line-clamp-1 capitalize">
                          {itemTitle}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2">
                        <div className="flex text-slate-200">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={
                                star <= (item.averageRating || 0)
                                  ? "text-amber-400"
                                  : "text-slate-200"
                              }
                              size={12}
                            />
                          ))}
                        </div>
                        <span className="text-slate-400 text-xs">
                          ({item.reviews?.length || 0})
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 pt-1 pb-1">
                        {itemHasDiscount ? (
                          <>
                            <span className="text-base font-bold text-[#5840e4]">
                              EGP {item.discountPrice}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              EGP {item.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-base font-bold text-slate-800">
                            EGP {item.price}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddRelatedToCart(itemId)}
                        disabled={isItemAdding}
                        className="w-full mt-3 bg-[#5840e4] hover:bg-[#4730cb] disabled:bg-slate-200 text-white font-semibold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 min-h-[40px] disabled:cursor-not-allowed"
                      >
                        {isItemAdding ? (
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
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
