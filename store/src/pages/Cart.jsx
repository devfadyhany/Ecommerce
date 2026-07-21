import samsung from "../assets/logo.png";
import iphone from "../assets/logo.png";
import { useState } from "react";
const data = [
  {
    id: 1,
    name: "Samsung Galaxy S25 U",
    price: 6000,
    quantity: 1,
    image: samsung,
  },
  {
    id: 2,
    name: "iPhone 13",
    price: 86700,
    quantity: 1,
    image: iphone,
  },

];

function Cart() {
  const [cartItems, setCartItems] = useState(data);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
const shipping = 0;
const tax = subtotal * 0.14;
const total = subtotal + shipping + tax - discount;

const increaseQuantity = (id) => {
  setCartItems(
    cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
const decreaseQuantity = (id) => {
  setCartItems(
    cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

const removeItem = (id) => {
  setCartItems(cartItems.filter((item) => item.id !== id));
};

const applyCoupon = () => {
  if (coupon.trim().toUpperCase() === "DATA1"){
    setDiscount(subtotal * 0.1);
  } else {
    setDiscount(0);
    alert("Invalid Coupon");
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">      
   {/* cartitem */}
   {/* left*/}
          <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
       {
       cartItems.length === 0 ? (
  <div className="text-center py-10">
    <h2 className="text-2xl font-semibold text-gray-600">
      Your cart is empty
    </h2>

    <p className="text-gray-500 mt-2">
      Looks like you haven't added any products yet.
    </p>
  </div>
) : (
       cartItems.map((item) => (
         <div 
          key={item.id} 
       className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-100 py-6 last:border-0 last:pb-0 first:pt-0">
           
     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
       <img 
       src={item.image} 
     alt={item.name} 
     className="w-20 h-20 rounded-lg object-cover border border-gray-200" 
           />
     <div>
     <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
      <p className="text-yellow-600 font-bold">EGP {item.price}</p>

     <div className="flex items-center gap-3 mt-3 ">
        <button 
         onClick={() => decreaseQuantity(item.id)}
        className="w-7 h-7 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
            >-
          </button>

         <span className="w-8 text-center font-semibold text-gray-700">
  {item.quantity}
</span>

          <button 
           onClick={() => increaseQuantity(item.id)}
          className="w-7 h-7 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
            +
          </button>
     </div>
     </div>
   </div>

                 {/* right*/}
     <div className="flex flex-row md:flex-col justify-between md:items-end items-center gap-4 w-full md:w-auto">
       <button
  onClick={() => removeItem(item.id)}
  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
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
        
      <p className="font-bold text-gray-800">
  EGP {(item.price * item.quantity).toLocaleString()}
</p>
       </div>
       </div>
     ))
     )}
    </div>

          {/* coupon */}
     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Coupon Code</h3>
   <div className="flex flex-col sm:flex-row gap-3">
    <input
  type="text"
  placeholder="Enter coupon code"
  value={coupon}
  onChange={(e) => setCoupon(e.target.value)}
  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-600"
/>
     <button
  onClick={applyCoupon}
  className="w-full sm:w-auto px-6 py-3 border rounded-lg hover:bg-gray-100 text-yellow-600">
  Apply
</button>
     </div>
     
     </div>
    <p className="mt-5 text-yellow-600 cursor-pointer hover:underline text-l font-semibold">
         ← Continue Shopping
       </p>
          </div>
           {/* Order Summary */}
     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit lg:sticky lg:top-6">
       <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
      <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">EGP {subtotal.toLocaleString()}</span>
              </div>
        <div className="flex justify-between">                    
                <span>Shipping</span>
                <span className="font-semibold text-green-600">{shipping === 0 ? "Free" : `EGP ${shipping}`}</span>
              </div>
       <div className="flex justify-between">
                <span>Tax (14%)</span>
                <span className="font-semibold text-gray-800">EGP {tax.toLocaleString()}</span>
              </div>
            </div>

<div className="flex justify-between">
  <span>Discount</span>
  <span className="text-green-600">
    -EGP {discount.toFixed(2)}
  </span>
</div>
            <div className="flex justify-between items-center py-4 text-gray-800">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-xl text-yellow-600">EGP {total.toLocaleString()}</span>
            </div>

            <button className="w-full bg-yellow-600 text-white py-3 rounded-xl hover:bg-yellow-700 transition-colors font-bold text-l shadow-sm mt-2">
              Proceed to Checkout
            </button>
            <p className="mt-5 ml-25 text-yellow-600 cursor-pointer text-l font-semibold">
          Continue Shopping
       </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;       