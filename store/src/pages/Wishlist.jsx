import React, { use } from "react";
import Getwishlist from "../components/ui/Getwishlist";
import WishlistCard from "../components/ui/WishlistCard";
import WishlistSkeleton from "../components/ui/WishlistSkeleton";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";

function Wishlist() {
  const { dataWishlist, loading, error,delcard } = Getwishlist();
  const Navigate =useNavigate()

  // if (error) {
  //   return (
  //     <div className="min-h-screen w-full flex items-center justify-center bg-[var(--sef-bg-primary)]">
  //       <p className="text-[var(--sef-text-primary)] font-medium text-4xl">
  //         error fetch data
  //       </p>
  //     </div>
  //   );
  // }
      console.log(dataWishlist)
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
        <p className="mb-5 "><CiHeart size={90} className="text-[var(--sef-text-primary)]"/></p>
        <p className="text-4xl text-[var(--sef-text-primary)]">Your wishlist is empty</p>
        <p className="w-100 text-center text-[var(--sef-text-primary)]">Save items you love to your wishlist. They'll be waiting for you here.</p>
        <button onClick={()=>{Navigate('/shop')}} className="py-3 px-25 mt-6 rounded-xl text-xl bg-[var(--sef-gold-secondary)]">Browse Products</button>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
