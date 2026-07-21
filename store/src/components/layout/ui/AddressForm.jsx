import {MapPinHouse, Plus} from "lucide-react";
import { showErrorToast, showSuccessToast } from "../../../utils/toastHelpers";
import {useState} from "react";
import api from "../../../api/axios";
function AddressForm({ user, refreshUser }){
    const [address, setAddress] = useState({
        country:"",
        city:"",
        street:"",
        building:"",
        postalCode:""
    });
    const [addresses, setAddresses] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isComplete = Object.values(address).every((value) => value.trim() !== "");

        if (!isComplete) {
            showErrorToast("Please fill in all address fields.");
            return;
        }

        // setAddresses((prevAddresses) => [...prevAddresses, address]);
        // showSuccessToast("Address added successfully.");
        // setAddress({
        //     country:"",
        //     city:"",
        //     street:"",
        //     building:"",
        //     postalCode:""
        // });
        try {
    const updatedAddresses = [...(user.addresses || []), address];

    const res = await api.patch(`/users/${user._id}`, {
        addresses: updatedAddresses,
    });

    if (res.data.success) {
        await refreshUser();

        setAddresses(updatedAddresses);

        showSuccessToast("Address added successfully.");

        setAddress({
            country: "",
            city: "",
            street: "",
            building: "",
            postalCode: "",
        });
    }
} catch (error) {
    showErrorToast(
        error.response?.data?.message || "Failed to add address."
    );
}
    }
    const handleAddress = (field, value)=> {
        setAddress({
            ...address,
        [field]:value
        })
    }
    return(
        <div>
            <div className="bg-card p-4 space-y-4 rounded-2xl shadow-md max-w-6xl mx-auto p-4 space-y-6 ">
                <div className="title flex gap-3 justify-start items-center">
                    <MapPinHouse className="text-gold"/>
                    <h2 className="text-2xl font-bold text-ink">Addresses</h2>
                </div>
                {addresses.length === 0 ? (
                    <p className="text-sm font-light text-ink-soft">No addresses yet.</p>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((item, index) => (
                            <div key={`${item.country}-${index}`} className="rounded-2xl border border-gold/30 bg-gradient-to-br from-white to-gold/10 p-4 shadow-sm">
                                <div className="flex items-center gap-2 text-ink">
                                    <MapPinHouse className="text-gold" size={18} />
                                    <p className="font-semibold">{item.country}</p>
                                </div>
                                <div className="mt-2 space-y-1 text-sm text-ink-soft">
                                    <p><span className="font-medium text-ink">City:</span> <span className="text-gold">{item.city}</span></p>
                                    <p><span className="font-medium text-ink">Street:</span> {item.street}</p>
                                    <p><span className="font-medium text-ink">Building:</span> {item.building}</p>
                                    <p><span className="font-medium text-ink">Postal Code:</span> {item.postalCode}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center gap-4">
                            <input type="text" placeholder="Country" value={address.country} className="w-full border border-gold rounded-xl p-3 focus:outline-none placeholder:text-ink-soft" onChange={(e) => handleAddress("country", e.target.value)}/>
                            <input type="text" placeholder="City" value={address.city} className="w-full border border-gold rounded-xl p-3 focus:outline-none placeholder:text-ink-soft" onChange={(e) => handleAddress("city", e.target.value)}/>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <input type="text" placeholder="Street" value={address.street} className="w-full border border-gold rounded-xl p-3 focus:outline-none placeholder:text-ink-soft" onChange={(e) => handleAddress("street", e.target.value)}/>
                            <input type="text" placeholder="Building" value={address.building} className="w-full border border-gold rounded-xl p-3 focus:outline-none placeholder:text-ink-soft" onChange={(e) => handleAddress("building", e.target.value)}/>
                        </div>
                        <input type="text" placeholder="Postal Code" value={address.postalCode} className="w-full border border-gold rounded-xl p-3 focus:outline-none placeholder:text-ink-soft placeholder:font-normal" onChange={(e) => handleAddress("postalCode", e.target.value)}/>
                        <button type="submit" className="group w-50 flex gap-3 justify-start items-center px-4 py-3 rounded-md bg-gradient-to-r from-gold-deep to-gold text-on-gold transition hover:shadow-lg">
                            <Plus />
                            <span>Add Address</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddressForm;