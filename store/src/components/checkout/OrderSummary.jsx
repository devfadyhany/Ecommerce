import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "../../context/CartContext";

function OrderSummary ({
    onPlaceOrder,
    loading,
}) {

    const { cart } = useCart();

    if (!cart || !cart.items?.length) {
      return (
        <div className="max-w-sm bg-card p-6 rounded-xl border border-card-line mt-26 mb-8 mx-auto px-6 shadow-sm h-fit lg:sticky lg:top-6">
            <h4 className="mb-4 text-lg font-bold text-ink">Order Summary</h4>
            <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-surface-fields p-4 text-gold-soft">
                    <LuShoppingCart className="size-7" />
                </div>
                <h5 className="text-base font-semibold text-ink">Your cart is empty.</h5>
                <p className="text-sm text-ink-soft">
                    Add some products to continue with checkout.
                </p>
                <Link
                    to="/shop"
                    className="mt-2 rounded-md bg-gold px-4 py-2 font-bold text-on-gold transition-all duration-200 hover:bg-gold-deep"
                >
                    Start Shopping
                </Link>
          </div>
        </div>
      );
    }

    const subtotal = Number(cart.subtotal ?? 0);
    const shipping = subtotal >= 1000 ? 0 : 50;
    const tax = subtotal * 0.14;
    const discount = Number(cart.discountAmount ?? 0);
    const total = subtotal + shipping + tax - discount;
    const isDisabled = loading || !cart.items?.length;

    return (
        <div className="bg-card rounded-xl border border-card-line p-6 shadow-sm h-fit lg:sticky lg:top-6">
          <h4 className="mb-4 text-lg font-bold text-ink">
            Order Summary
          </h4>
          
          <div className="space-y-2.5">
            {cart.items.map((item) => (
              <div 
                key={item._id}
                className="flex items-center justify-between py-1 px-2 bg-surface-soft rounded-lg"
              >
                <div className="flex items-center justify-between gap-6 text-ink-soft text-sm">
                  <img 
                    src={item.image} alt={item.name}
                    className="size-9 rounded-lg object-cover"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>x{item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm text-ink">
                  EGP {Number(item.price ?? 0).toLocaleString()}
                </span>
              </div>
          ))}
            <hr className="my-3 border-card-line"/>  
            <div className="flex justify-between text-sm text-ink-soft">
                <p>Subtotal</p>
                <p>EGP {subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-sm text-ink-soft">
                <p>Shipping</p>
                <p 
                  className={shipping === 0
                    ? "text-green-500"
                    : "" }
                >
                  {shipping === 0
                    ? "Free"
                    : `EGP ${shipping}`}
                </p>
            </div>
            <div className="flex justify-between text-sm text-ink-soft">
                <p>Tax (14%)</p>
                <p>{tax.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-sm text-ink-soft">
                <p>Discount</p>
                <p className="text-red-500">
                  - {discount.toLocaleString()}</p>
            </div>
            <hr className="my-3 border-card-line"/>
            <div className="flex justify-between font-semibold">
                <p className="text-ink">Total</p>
                <p className="text-gold-deep">
                  EGP {total.toLocaleString()}</p>
            </div>
          </div>  
          <button 
            className={`mt-6 w-full rounded-xl py-3 bg-gold font-semibold transition
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "text-on-gold hover:bg-gold-deep"}
            `}
            onClick={onPlaceOrder}
            disabled={isDisabled}
          >
            {loading ? "Place Order..." : "Place Order"}
          </button>            
        </div>
    )
}

export default OrderSummary;