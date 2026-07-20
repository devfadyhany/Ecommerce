import React from "react";
import Getwishlist from "../components/ui/Getwishlist";
import Wishlistcart from "../components/ui/Wishlistcart";
function Wishlist() {
  const { dataWishlist, loading, error } = Getwishlist();
  console.log(dataWishlist)
  return <div className="min-h-screen w-[100%] bg-gray-100 p-4">
    <div className="grid grid-cols-5 gap-4">
          {dataWishlist && dataWishlist.map((item)=>{
        <Wishlistcart 
        img={item.images[0].url} 
        title={item.name}
         description={item.description} 
         prise={item.prise}
          discountPrice={item.discountPrice}/>
      })}
      <Wishlistcart 
      img={"https://www.tropicaltickets.com/cdn/shop/files/download_72.jpg?v=1691659648"} 
      title={"yahya"} 
      description={"qvudd mvoidjvri nobihbri nvobjnrjibt"}
      prise={20}
      discountPrice={40}
      />
      
      
     

  
    </div>
  
  </div>;
}

export default Wishlist;
