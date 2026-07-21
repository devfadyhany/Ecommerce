import React from "react";
import Getwishlist from "../components/ui/Getwishlist";
import Wishlistcart from "../components/ui/Wishlistcart";
import WishlistSkeleton from "../components/ui/WishlistSkeleton";

function Wishlist() {
  const { dataWishlist, loading, error } = Getwishlist();



  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--sef-bg-primary)]">
        <p className="text-[var(--sef-text-primary)] font-medium">error fetch data</p>
      </div>
    );
  }

  return (
    // 💡 تم استبدال bg-gray-100 بخلفية متجرك المخصصة var(--sef-bg-primary)
    <div className="min-h-screen w-full bg-[var(--sef-bg-primary)] p-4">
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        
       
        {loading && 
          Array(5).fill("").map((_, index) => (
            <WishlistSkeleton key={index} />
          ))
        }

        
        {!loading && dataWishlist && dataWishlist.map((item, index) => {
         
          const imageOfProduct = item.images && item.images.length > 0 ? item.images[0].url : "";

          return (
            <Wishlistcart 
              key={item._id || item.id || index} 
              id={item._id || item.id}       
              img={imageOfProduct} 
              title={item.name}
              description={item.description} 
              prise={item.prise}
              discountPrice={item.discountPrice}
            />
          );
        })}

      </div>

      
      {!loading && (!dataWishlist || dataWishlist.length === 0) && (
        <div className="text-center py-12">
          <p className="text-[var(--sef-text-secondary)] font-medium text-lg">wishlist is free</p>
        </div>
      )}

    </div>
  );
}

export default Wishlist;
