import { useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";
import { RiDeleteBinLine } from "react-icons/ri";

function Cart() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [activeCoupon, setActiveCoupon] = useState("");
  const {
    cart,
    loading,
    updateQuantity,
    removeFromCart,
    applyCoupon: applyCouponContext,
    removeCoupon: removeCouponContext,
  } = useCart();

  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.price || item.product?.price || 0) * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.14;
  const activeDiscount = Number(cart?.discountAmount ?? discount);
  const total = Number(cart?.total ?? subtotal + shipping + tax - activeDiscount);
  const couponCode = cart?.coupon || activeCoupon;

  const increaseQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity + 1);
  };

  const decreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const applyCoupon = async () => {
    const normalizedCoupon = coupon.trim().toUpperCase();

    if (!normalizedCoupon) {
      setCouponMessage("Pleare write the coupon");
      setDiscount(0);
      setActiveCoupon("");
      return;
    }

    try {
      const response = await applyCouponContext(normalizedCoupon);
      const appliedDiscount = Number(response?.discountAmount ?? 0);
      const appliedCoupon = response?.coupon || normalizedCoupon;

      if (response?.success && appliedDiscount > 0) {
        setDiscount(appliedDiscount);
        setActiveCoupon(appliedCoupon);
        setCouponMessage("Coupon is applied");
        showSuccessToast("Coupon is applied");
      } else {
        setDiscount(0);
        setActiveCoupon("");
        const errorMessage = response?.message || "Coupon is invalid";
        setCouponMessage(errorMessage);
        showErrorToast(errorMessage);
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Coupon is invaled";
      setDiscount(0);
      setActiveCoupon("");
      setCouponMessage(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await removeCouponContext();

      if (response?.success) {
        setDiscount(0);
        setActiveCoupon("");
        setCouponMessage("Coupon removed");
        showSuccessToast("Coupon removed");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Failed to remove coupon";
      setCouponMessage(errorMessage);
      showErrorToast(errorMessage);
    }
  };
  
  if (loading) {
    return <LoadingSpinner label="Loading cart..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-soft p-6">
        <div className="text-center bg-card p-8 rounded-xl border border-card-line shadow-sm max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-ink-soft mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gold text-on-gold py-3 rounded-xl hover:bg-gold-deep transition-colors font-bold shadow-sm"
          >
            Retry
          </button>
        </div>
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
                  const itemId = item.product;
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
                            <button
                              onClick={() =>
                                decreaseQuantity(itemId, item.quantity)
                              }
                              className="w-7 h-7 text-ink-soft border border-line rounded-md hover:bg-surface-fields transition duration-200"
                            >
                              -
                            </button>

                            <span className="w-8 text-center font-semibold text-ink">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(itemId, item.quantity)
                              }
                              className="w-7 h-7 text-ink-soft border border-line rounded-md hover:bg-surface-fields transition duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* right */}
                      <div className="flex flex-row md:flex-col justify-between md:items-end items-center gap-4 w-full md:w-auto">
                        <button
                          onClick={() => removeItem(itemId)}
                          className="p-2 text-ink-faint hover:text-red-500 transition-colors duration-200"
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
                        </button>

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
                <button
                  onClick={applyCoupon}
                  className="w-full sm:w-auto px-6 py-3 border border-line rounded-lg hover:bg-surface-fields text-gold"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <div
                  className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                    discount > 0
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-red-400 bg-red-50 text-red-600"
                  }`}
                >
                  {couponMessage}
                </div>
              )}
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
              <p className="text-xs">Free shipping on orders over EGP 1,000</p>
              <div className="flex justify-between">
                <span>Tax (14%)</span>
                <span className="font-semibold text-ink">
                  EGP {tax.toLocaleString().split(".")[0]}
                </span>
              </div>
            </div>

            {couponCode && (
              <div className="flex justify-between items-center text-ink-soft pt-4">
                <span>Coupon</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600">{couponCode}</span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="flex gap-1 text-xs text-red-500 hover:underline"
                  >
                    <RiDeleteBinLine /> Remove
                  </button>
                </div>
              </div>
            )}

            {activeDiscount > 0 && (
              <div className="flex justify-between text-ink-soft pt-2">
                <span>Discount</span>
                <span className="text-emerald-600">
                  -EGP {activeDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-4 text-ink">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-xl text-gold">
                EGP {total.toLocaleString().split(".")[0]}
              </span>
            </div>

            <button className="w-full bg-gold text-on-gold py-3 rounded-xl hover:bg-gold-deep transition-colors font-bold text-l shadow-sm my-2"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
