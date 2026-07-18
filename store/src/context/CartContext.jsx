
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
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

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.patch("/carts/items", {
        productId,
        quantity,
      });

      getCart();
    } catch (err) {
      console.error(err);
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

  const clearCart = async () => {
    try {
      await api.delete("/carts/clear");
      getCart();
    } catch (err) {
      console.error(err);
    }
  };
  const applyCoupon = async (code) => {
  try {
    await api.post("/carts/coupon", {
      code,
    });
    getCart();
  } catch (err) {
    console.error(err);
  }
};
const removeCoupon = async () => {
  try {
    await api.delete("/carts/coupon");
    getCart();
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    getCart();
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
  }}
>
   {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}