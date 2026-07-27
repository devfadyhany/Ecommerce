import React from "react";
import WishlistCard from "../components/ui/WishlistCard";
import WishlistSkeleton from "../components/ui/WishlistSkeleton";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";

function Wishlist() {
  const { wishlist, setWishlist, removeFromWishlist } = useCart();
  const Navigate = useNavigate();

  const loading = wishlist === null;
  const dataWishlist = wishlist?.wishlist?.products || [];

  const delcard = async (id) => {
    setWishlist((prev) => ({
      ...prev,
      wishlist: {
        ...prev.wishlist,
        products: prev.wishlist.products.filter((item) => item._id !== id),
      },
    }));

    try {
      await removeFromWishlist(id);
      showSuccessToast("Success delete card");
    } catch (err) {
      showErrorToast("Failed to delete card");
    }
  };

  return (
    <div className="min-h-screen w-full py-4">
      <div className="container max-w-7xl px-4 mx-auto">
        <h2 className="text-2xl font-bold text-ink mt-2 mb-8">My Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
          {loading &&
            Array(10)
              .fill("")
              .map((_, index) => <WishlistSkeleton key={index} />)}

          {!loading &&
            dataWishlist &&
            dataWishlist.map((item, index) => {
              const imageOfProduct =
                item.images && item.images.length > 0 ? item.images[0].url : "";

              return (
                <WishlistCard
                  key={index}
                  id={item._id || item.id}
                  img={imageOfProduct}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  deletedata={delcard}
                />
              );
            })}
        </div>
      </div>

      {!loading && (!dataWishlist || dataWishlist.length === 0) && (
        <div className="flex flex-col items-center py-12 gap-5">
          <p className="mb-5 ">
            <CiHeart size={90} className="text-[var(--sef-text-primary)]" />
          </p>
          <p className="text-4xl text-[var(--sef-text-primary)]">
            Your wishlist is empty
          </p>
          <p className="w-100 text-center text-[var(--sef-text-primary)]">
            Save items you love to your wishlist. They'll be waiting for you
            here.
          </p>
          <button
            onClick={() => {
              Navigate("/shop");
            }}
            className="py-3 px-25 mt-6 rounded-xl text-xl bg-[var(--sef-gold-secondary)]"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
