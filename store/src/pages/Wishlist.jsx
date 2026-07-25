import Getwishlist from "../components/ui/Getwishlist";
import WishlistCard from "../components/ui/WishlistCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Wishlist() {
  const { dataWishlist, loading, error } = Getwishlist();

  if (loading) {
    return <LoadingSpinner label="Loading your wishlist..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface-soft p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
        <p className="text-ink-soft mb-6">
          Failed to load your wishlist. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-gold text-on-gold rounded-xl font-bold hover:bg-gold-deep transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 bg-surface-soft">
      <div className="container max-w-7xl px-4 mx-auto">
        <h2 className="text-2xl font-bold text-ink mb-8">My Wishlist</h2>

        {!dataWishlist || dataWishlist.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-card-line shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gold-light mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <p className="text-xl font-semibold text-ink mb-2">
              Your wishlist is empty
            </p>
            <p className="text-ink-soft">
              Save items you love to review them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataWishlist.map((item) => {
              const itemId = item._id || item.id;
              const imageOfProduct =
                item.images && item.images.length > 0 ? item.images[0].url : "";

              return (
                <WishlistCard
                  key={itemId}
                  id={itemId}
                  img={imageOfProduct}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  discountPrice={item.discountPrice}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
