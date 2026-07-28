import { CiLocationOn } from "react-icons/ci";

function CheckoutForm ({
    shippingAddress,
    setShippingAddress,
    showErrors,
}) {

    const handleChange =  (e) => {
        const { name , value } = e.target;

        setShippingAddress((prev) => ({
            ...prev,
            [name]: value,
        }))
    };
    
    const isFullNameError =
        showErrors && !shippingAddress.fullName.trim();

    const isPhoneError =
        showErrors && !shippingAddress.phone.trim();

    const isCityError =
        showErrors && !shippingAddress.city.trim();  
        
    const isCountryError =
        showErrors && !shippingAddress.country.trim(); 
        
    const isAddressError =
        showErrors && !shippingAddress.address.trim();    

    return (
        <div className="bg-card rounded-xl border border-card-line p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                <CiLocationOn className="text-gold"/> 
                Shipping Address
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="">
                <label className=" text-ink text-sm font-medium">Full Name
                    <span className="ml-1 text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="fullName"
                    value={shippingAddress.fullName}
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded border border-line focus:outline-none bg-surface-soft text-sm text-ink
                        ${isFullNameError ? "border-red-500" : "border-line focus:ring-1 focus:ring-gold"}`}
                />
              </div>  
              <div className="">
                <label className=" text-ink text-sm font-medium">Phone No.
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input 
                    type="tel" 
                    name="phone"
                    value={shippingAddress.phone}
                    placeholder="+201234567890"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded border border-line focus:outline-none bg-surface-soft text-sm text-ink
                        ${isPhoneError ? "border-red-500" : "border-line focus:ring-1 focus:ring-gold"}`}
                />
              </div>
              <div className="">
                <label className=" text-ink text-sm font-medium">Country
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="country"
                    value={shippingAddress.country}
                    placeholder="Country"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded border border-line focus:outline-none bg-surface-soft text-sm text-ink
                        ${isCountryError ? "border-red-500" : "border-line focus:ring-1 focus:ring-gold"}`}
                />
              </div>  
                <div className="">
                <label className=" text-ink text-sm font-medium">City
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="city"
                    value={shippingAddress.city}
                    placeholder="City"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded border border-line focus:outline-none bg-surface-soft text-sm text-ink
                        ${isCityError ? "border-red-500" : "border-line focus:ring-1 focus:ring-gold"}`}
                />
              </div>
              <div className="lg:col-span-2">
                <label className=" text-ink text-sm font-medium">Address
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="address"
                    value={shippingAddress.address}
                    placeholder="Address"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded border border-line focus:outline-none bg-surface-soft text-sm text-ink
                        ${isAddressError ? "border-red-500" : "border-line focus:ring-1 focus:ring-gold"}`}
                />
              </div>  
              <div className=" ">
                <label className=" text-ink text-sm font-medium">Postal Code</label>
                <input 
                    type="text" 
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    placeholder="Postal Code"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded border border-line focus:outline-none focus:ring-1 focus:ring-gold bg-surface-soft text-sm text-ink"
                />
              </div>
            </div>    
        </div>
    )
}

export default CheckoutForm;