import React from "react";
import Getwishlist from "../components/ui/Getwishlist";
import WishlistCard from "../components/ui/WishlistCard";
import WishlistSkeleton from "../components/ui/WishlistSkeleton";

function Wishlist() {
  const { dataWishlist, loading, error } = Getwishlist();

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--sef-bg-primary)]">
        <p className="text-[var(--sef-text-primary)] font-medium text-4xl">error fetch data</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen w-full bg-[var(--sef-bg-primary)] p-4">
      <div className="container mx-auto">
      <h2 className="my-10 text-[40px] text-[var(--sef-text-primary)]">My wishlist</h2>
         <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-2">
        
              {loading &&
                Array(10).fill("").map((_, index) => (
                  <WishlistSkeleton key={index} />
                ))
              }

              
              {!loading && dataWishlist && dataWishlist.map((item, index) => {
              
                const imageOfProduct = item.images && item.images.length > 0 ? item.images[0].url : "";

                return (
                  <WishlistCard 
                    key={ index} 
                    id={item._id || item.id}       
                    img={imageOfProduct} 
                    title={item.name}
                    description={item.description} 
                    price={item.price}
                    discountPrice={item.discountPrice}
                  />
                );
              })}

            </div>
      </div>
      

      
      {!loading && (!dataWishlist || dataWishlist.length === 0) && (
        <div className="text-center py-12">
          <p className="text-[var(--sef-text-secondary)] font-medium text-4xl">wishlist is free</p>
        </div>
      )}

    </div>
  );
}

export default Wishlist;
