import React from "react";
import { Package2, Plus } from "lucide-react";
function ProductsHeader(){
    return(
        <div className="flex justify-between items-center px-7 py-10 bg-card rounded-4xl shadow-md">
            <div className="flex items-center gap-4">
                <div className="size-18 rounded-2xl bg-surface-soft flex justify-center items-center "><Package2 className="w-8 h-8 text-gold"/></div>
                <div>
                <p className="uppercase tracking-[6px] font-thin text-gold text-xs">Product Dashboard</p>
                <h2 className="text-4xl font-extrabold text-ink">Products</h2>
                </div>
            </div>
            <div>
                <button className="group flex justify-center items-center bg-gold hover:bg-gold-soft hover:shadow-[0_8px_20px_rgba(191,149,63,0.28)] text-on-gold font-bold py-4 px-5 rounded-2xl gap-2 shadow-[0_4px_10px_rgba(191,149,63,0.12)]">
                    <Plus className="transition-transform duration-300 group-hover:rotate-90" /> Add Product
                </button>
            </div>
        </div>
    )
}
export default ProductsHeader;