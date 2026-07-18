import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaTrashAlt, FaUser } from "react-icons/fa";

// ---- Single review card ----
const ReviewItem = ({ review, onDelete }) => {
    return (
        <div className="border-b border-line pb-5">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center text-gold-deep border border-line">
                <FaUser size={16} />
            </div>

            <div className="flex flex-col">
                <span className="font-semibold text-ink text-sm">
                {review.user?.username || review.user?.name || "Customer Account"}
                </span>
                <span className="text-xs text-ink-faint">
                {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                    : ""}
                </span>
            </div>
            </div>

            <button
            onClick={onDelete}
            className="text-ink-faint hover:text-red-500 transition-colors p-1"
            title="Delete review"
            >
            <FaTrashAlt size={14} />
            </button>
        </div>

        <div className="flex text-gold text-xs gap-0.5 ml-13 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
                key={star}
                className={
                star <= review.rating ? "text-gold" : "text-ink-faint"
                }
                size={14}
            />
            ))}
        </div>

        <p className="text-ink-soft text-sm leading-relaxed ml-13">
            {review.comment}
        </p>
        </div>
    );
    };

    // ---- Write-a-review form ----
    const ReviewForm = ({
    rating,
    setRating,
    reviewComment,
    setReviewComment,
    handleAddReview,
    submittingReview,
    }) => {
    return (
        <div className="bg-surface-soft p-8 rounded-3xl max-w-2xl">
            <h3 className="text-base font-bold text-ink mb-4">
                Write a Review
            </h3>

            <form onSubmit={handleAddReview} className="space-y-4">
                <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink-soft">
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
                        <FaStar className="text-gold" />
                        ) : (
                        <FaRegStar className="text-ink-faint" />
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
                className="w-full p-4 bg-transparent border border-line rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold focus:outline-none text-sm text-ink resize-y"
                ></textarea>

                <button
                type="submit"
                disabled={submittingReview}
                className="bg-gold hover:bg-gold-deep disabled:bg-surface-fields text-on-gold text-xs font-semibold px-6 py-3 rounded-2xl transition-all shadow-sm"
                >
                {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
    };

    // ---- Main tabs component (Description / Reviews) ----
    const ProductTabs = ({
    activeTab,
    setActiveTab,
    description,
    reviews,
    isLoggedIn,
    rating,
    setRating,
    reviewComment,
    setReviewComment,
    handleAddReview,
    submittingReview,
    handleDeleteReview,
    }) => {
    return (
        <div className="border-t border-line pt-8 mb-2">
            <div className="flex border-b border-line mb-6">
                <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 px-6 font-semibold text-base border-b-2 transition-all ${
                    activeTab === "description"
                    ? "border-gold text-gold"
                    : "border-transparent text-ink-faint hover:text-ink-soft"
                }`}
                >
                Description
                </button>
                <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 px-6 font-semibold text-base border-b-2 transition-all ${
                    activeTab === "reviews"
                    ? "border-gold text-gold"
                    : "border-transparent text-ink-faint hover:text-ink-soft"
                }`}
                >
                Reviews ({reviews.length})
                </button>
            </div>

            <div className="mb-4">
                {activeTab === "description" ? (
                <div className="text-ink-soft leading-relaxed max-w-4xl text-sm">
                    <p>{description || "No detailed description available."}</p>
                </div>
                ) : (
                <div className="space-y-6">
                    {isLoggedIn ? (
                    <ReviewForm
                        rating={rating}
                        setRating={setRating}
                        reviewComment={reviewComment}
                        setReviewComment={setReviewComment}
                        handleAddReview={handleAddReview}
                        submittingReview={submittingReview}
                    />
                    ) : (
                    <div className="py-2 text-ink-soft text-sm">
                        <p className="italic mb-2">No reviews yet. Be the first!</p>
                        <Link
                        to="/login"
                        className="text-xs text-gold hover:underline font-semibold"
                        >
                        Log in to write a review →
                        </Link>
                    </div>
                    )}

                    {reviews.length > 0 && (
                    <div className="space-y-6 max-w-4xl pt-2">
                        {reviews.map((rev, idx) => (
                        <ReviewItem
                            key={idx}
                            review={rev}
                            onDelete={() => handleDeleteReview(rev._id || rev.id, idx)}
                        />
                        ))}
                    </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;