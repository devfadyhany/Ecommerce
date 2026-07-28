import { MdPayment } from "react-icons/md";
import { BsCash , BsCreditCard} from "react-icons/bs";

const paymentMethods = [
    {
        id:"cash",
        title:"Cash on Delivery",
        description: "Pay when your order arrives",
        icon: <BsCash />
    },
    {
        id:"card",
        title:"Credit / Debit Card",
        description: "Coming Soon",
        icon: <BsCreditCard /> ,
        disabled:true
    },
];

function PaymentMethod ({
    paymentMethod,
    setPaymentMethod,
}) {
    
    return (
        <div className="mt-6 bg-card rounded-xl border border-card-line p-6 shadow-sm">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">  
            <MdPayment className="text-gold text-2xl" />
            Payment Method
          </h4>
          {paymentMethods.map((method) => (
            <label key={method.id}
              className={`flex items-center gap-4 mb-3 rounded-lg border border-line p-4 transition
                 ${method.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-gold"
                }
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => {
                    if (method.disabled) return;
                    setPaymentMethod(method.id)
                }}
                disabled={method.disabled}
                className="accent-gold-deep"
              />  
              <div className="p-2 bg-surface-soft rounded-full text-2xl text-gold-soft">
                {method.icon}  
              </div>  
              <div>
                <h5 className="text-ink opacity-90">
                    {method.title}
                </h5>
                <p className="text-sm text-ink-soft">
                    {method.description}
                </p>
              </div>
          </label>
          ))}
        </div>
    )
}

export default PaymentMethod;