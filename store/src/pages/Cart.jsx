import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button"; // استيراد مكون الأزرار المشترك
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false); // حالة تحميل للكونبو

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/carts"); 
      setCartItems(res.data.items || res.data || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load your cart. Please try again later.");
      showErrorToast("Could not load cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.price || item.product?.price || 0) * item.quantity,
    0,
  );
  const shipping = 0;
  const tax = subtotal * 0.14;
  const total = subtotal + shipping + tax - discount;

  const increaseQuantity = async (id) => {
    try {
      setCartItems(
        cartItems.map((item) =>
          item.id === id || item._id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } catch (err) {
      showErrorToast("Failed to update quantity");
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      setCartItems(
        cartItems.map((item) =>
          (item.id === id || item._id === id) && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } catch (err) {
      showErrorToast("Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      setCartItems(
        cartItems.filter((item) => item.id !== id && item._id !== id),
      );
      showSuccessToast("Removed item from cart");
    } catch (err) {
      showErrorToast("Failed to remove item");
    }
  };

  const applyCoupon = async () => {
    try {
      setIsApplyingCoupon(true);
      // محاكاة وقت طلب الكوبون لو احتجت لـ API
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (coupon.trim().toUpperCase() === "DATA1") {
        setDiscount(subtotal * 0.1);
        showSuccessToast("Coupon applied successfully!");
      } else {
        setDiscount(0);
        showErrorToast("Invalid Coupon Code");
      }
    } catch (err) {
      showErrorToast("Error applying coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading your cart..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-soft text-center p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-ink-soft mb-6">{error}</p>
        <Button onClick={fetchCart} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-soft py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-ink">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-card-line p-6 shadow-sm">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-ink-soft">
                    Your cart is empty
                  </h2>
                  <p className="text-ink-faint mt-2">
                    Looks like you haven't added any products yet.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => {
                  const itemId = item.id || item._id;
                  const itemName = item.name || item.product?.name;
                  const itemPrice = item.price || item.product?.price || 0;
                  const itemImage = item.image || item.product?.image;

                  return (
                    <div
                      key={itemId}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-card-line py-6 last:border-0 last:pb-0 first:pt-0"
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        {itemImage && (
                          <img
                            src={itemImage}
                            alt={itemName}
                            className="w-20 h-20 rounded-lg object-cover border border-card-line"
                          />
                        )}
                        <div>
                          <h2 className="text-lg font-semibold text-ink">
                            {itemName}
                          </h2>
                          <p className="text-gold font-bold">EGP {itemPrice}</p>

                          <div className="flex items-center gap-3 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => decreaseQuantity(itemId)}
                              className="w-7 h-7 !p-0"
                            >
                              -
                            </Button>

                            <span className="w-8 text-center font-semibold text-ink">
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => increaseQuantity(itemId)}
                              className="w-7 h-7 !p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* right */}
                      <div className="flex flex-row md:flex-col justify-between md:items-end items-center gap-4 w-full md:w-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(itemId)}
                          className="p-2 text-ink-faint hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </Button>

                        <p className="font-bold text-ink">
                          EGP {(itemPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* coupon */}
            <div className="bg-card rounded-xl border border-card-line p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink mb-4">
                Coupon Code
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-line bg-card text-ink rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                />
                <Button
                  variant="outline"
                  isLoading={isApplyingCoupon}
                  loadingText="Applying..."
                  onClick={applyCoupon}
                  className="w-full sm:w-auto px-6 py-3"
                >
                  Apply
                </Button>
              </div>
            </div>
            <Link
              to="/shop"
              className="mt-5 text-gold cursor-pointer hover:underline text-l font-semibold inline-block"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-xl border border-card-line p-6 shadow-sm h-fit lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-ink mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm text-ink-soft border-b border-card-line pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">
                  EGP {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {shipping === 0 ? "Free" : `EGP ${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (14%)</span>
                <span className="font-semibold text-ink">
                  EGP {tax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-ink-soft pt-4">
              <span>Discount</span>
              <span className="text-emerald-600">
                -EGP {discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-4 text-ink">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-xl text-gold">
                EGP {total.toLocaleString()}
              </span>
            </div>

            <Button
              variant="primary"
              fullWidth
              className="py-3 text-l my-2"
              onClick={() => showSuccessToast("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </Button>
            <Link
              to="/shop"
              className="mt-5 text-gold cursor-pointer text-l font-semibold block text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;