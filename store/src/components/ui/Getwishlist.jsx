import { useState, useEffect } from "react";
import api from "../../api/axios";

function Getwishlist() {
  const [dataWishlist, setDataWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await api.get("/wishlists/my");
        
          setDataWishlist(res.data.wishlist.products);
        
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []); 


  return { dataWishlist, loading, error };
}

export default Getwishlist;
