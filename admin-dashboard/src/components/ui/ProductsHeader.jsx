import React from "react";
import { Package2, Plus } from "lucide-react";
import { Link } from "react-router";
function ProductsHeader() {
  return (
    <div className="flex gap-4 flex-col justify-center items-start md:flex-row md:justify-between md:items-center px-7 py-10 bg-[image:var(--sef-gradient-gold-subtle)] rounded-4xl shadow-md mb-8 border border-card-line">
      <div className="flex items-center gap-4">
        <div className="size-18 rounded-2xl bg-card flex justify-center items-center">
          <Package2 className="w-8 h-8 text-gold" />
        </div>
        <div>
          <p className="uppercase tracking-[6px] font-thin text-gold text-xs">
            Product Dashboard
          </p>
          <h2 className="text-4xl font-extrabold text-ink">Products</h2>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <Link
          to="/products/add"
          className="group flex justify-center items-center bg-gold hover:bg-gold-soft hover:shadow-[0_8px_20px_rgba(191,149,63,0.28)] text-on-gold font-bold py-4 px-5 rounded-2xl gap-2 shadow-[0_4px_10px_rgba(191,149,63,0.12)]"
        >
          <Plus className="transition-transform duration-300 group-hover:rotate-90" />{" "}
          Add Product
        </Link>
      </div>
    </div>
  );
}
export default ProductsHeader;
