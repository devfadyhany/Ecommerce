import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { showErrorToast } from "../utils/toastHelpers";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    try {
      setLoading(true);

      const res = await api.get("/carts");
      if (res.data.success) {
        setCart(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWishlist = async () => {
    try {
      const res = await api.get("/wishlists/my");

      if (res.data.success) {
        setWishlist(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post("/carts/items", {
        productId,
        quantity,
      });

      getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post(`/wishlists/add/${productId}`);

      getWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.patch("/carts/items", {
        productId,
        quantity,
      });

      getCart();
    } catch (err) {
      if (err.status == 404) showErrorToast("Cart or item not found");
      else if (err.status == 400) showErrorToast("Insufficient stock");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/carts/items/${productId}`);
      getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlists/remove/${productId}`);

      getWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/carts/clear");
      getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete("/wishlists/clear");
      getWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  const applyCoupon = async (code) => {
    try {
      const res = await api.post("/carts/coupon", {
        code,
      });

      if (res?.data?.success) {
        setCart((prev) =>
          prev
            ? {
                ...prev,
                ...res.data,
                items: prev.items || [],
              }
            : res.data,
        );
      }

      return res?.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeCoupon = async () => {
    try {
      const res = await api.delete("/carts/coupon");

      if (res?.data?.success) {
        setCart((prev) =>
          prev
            ? {
                ...prev,
                ...res.data,
                coupon: undefined,
                discountAmount: 0,
                total: res.data.total ?? prev.total,
                items: prev.items || [],
              }
            : res.data,
        );
      }

      return res?.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    getCart();
    getWishlist();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        setLoading,
        getCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        setWishlist,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
