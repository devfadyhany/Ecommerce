import { useState, useEffect } from "react";
import api from "../../api/axios";
import { showErrorToast, showSuccessToast } from '../../utils/toastHelpers';



function Getwishlist() {
  const [dataWishlist, setDataWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await api.get("/wishlists/my");
        console.log(res)
          setDataWishlist(res.data.wishlist.products);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };


    fetchWishlist();
  }, []); 


const delcard = async (id) => {

  setDataWishlist(prev => prev.filter(item => item._id !== id));

  try {
    const res = await api.delete(`/wishlists/remove/${id}`);
    await showSuccessToast('Success delete card');
  } catch (err) {
    showErrorToast('Failed to delete card');

  }
};



  return { dataWishlist, loading, error,delcard };
}


export default Getwishlist;
