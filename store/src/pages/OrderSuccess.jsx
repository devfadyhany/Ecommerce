import { useLocation , Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";

function OrderSuccess () {
    
    const { state } = useLocation();
    const orderId = state?.orderId || state?.order?.id;

    if (!orderId) {
      return (
        <div className="pt-32 pb-16 px-4">
            <div className="max-w-3xl mx-auto flex flex-col items-center space-y-3 text-center">
                <div className="size-24 flex justify-center items-center rounded-full bg-surface-fields p-5 text-gold-soft">
                    <LuShoppingCart className="size-15"/>  
                </div>  
                <h4 className="mb-4 text-lg font-bold text-ink">Your cart is empty.</h4>
                <p className="text-sm text-ink-soft">Looks like you haven't added anything to your cart yet. Start shopping and find something you love!</p>
                <Link to="/shop"
                    className="bg-gold font-bold text-on-gold py-2 px-4 rounded-md cursor-pointer hover:bg-gold-deep transition-all duration-200 mt-4 "
                >
                    Start Shopping
                </Link>
            </div>
        </div>
      );
    }

    return (
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-center">  
            <div className="size-24 flex justify-center items-center rounded-full bg-surface-fields p-5 text-gold-soft">
               <FiCheckCircle className="size-15"/>  
            </div>
            <h4 className="text-2xl text-ink-soft font-semibold">
                Order Placed Successfully!
            </h4>
            <p className="text-ink-soft">
                Thank you for your purchase. Your order has been confirmed.
            </p>
            <p className="text-sm text-ink-faint">
                Order ID: 
                <span className="text-gold-deep font-bold ml-1">
                    #{orderId}
                </span>
            </p>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center items-center sm:gap-5">
                <Link to={`/orders/${orderId}`}
                    className="bg-card font-bold text-gold-deep py-3 px-4 rounded-lg cursor-pointer border border-gold-soft
                    hover:bg-surface-fields transition-all duration-200 mt-4 flex items-center justify-center gap-2 "
                >
                    <BsBoxSeam /> Track My Order
                </Link>
                <Link to="/shop"
                    className="bg-gold font-bold text-on-gold py-3 px-4 rounded-lg cursor-pointer 
                    hover:bg-gold-deep transition-all duration-200 mt-4 flex items-center justify-center gap-2 "
                >
                    <RiShoppingBag3Line /> Continue Shopping
                </Link>
            </div>
          </div>  
        </div>
    )
}

export default OrderSuccess;