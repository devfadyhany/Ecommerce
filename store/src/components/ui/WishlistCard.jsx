import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import api from "../../api/axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelpers";
import { FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function WishlistCard({ img, title, description, price, discountPrice, id }) {
  const [loading, setLoading] = useState(false);

  const addcard = async (id) => {
    try {
      const res = await api.post(`/wishlists/add/${id}`);
      await showSuccessToast("Success add card");
      setLoading(true);
    } catch (err) {
      showErrorToast("Failed to add card");
    } finally {
      setLoading(false);
    }
  };

  const delcard = async (id) => {
    try {
      const res = await api.delete(`/wishlists/remove/${id}`);
      await showSuccessToast("Success delete card");
    } catch (err) {
      showErrorToast("Failed to delete card");
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden rounded-b-2xl border transition-all duration-300 bg-card border-card-line shadow-[var(--sef-card-shadow)] hover:shadow-[var(--sef-card-hover-shadow)] hover:bg-[image:var(--sef-gradient-card-hover)] group">
      {/* قسم الصورة */}
      <div className="relative h-80 w-full overflow-hidden bg-[var(--sef-bg-fields)]">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* قسم تفاصيل المنتج */}
      <div className="p-3 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold line-clamp-1 text-[var(--sef-text-primary)]">
            {title}
          </h3>
          <p className="text-sm line-clamp-2 text-[var(--sef-text-secondary)]">
            {description}
          </p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-xl font-extrabold text-[var(--sef-gold-primary)]">
            EGP {discountPrice ? discountPrice : price}
          </span>
          {discountPrice ? (
            <del className="text-sm text-[var(--sef-text-fields)]">
              EGP {price}
            </del>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            className="inline-flex flex-1 items-center justify-center py-2.5 px-4 rounded-xl font-medium transition-all duration-300 text-[var(--sef-text-secondary)] bg-[image:var(--sef-gradient-gold-subtle)] border border-[var(--sef-border-color)] hover:opacity-90 active:scale-95 shadow-sm"
            onClick={() => {
              addcard(id);
            }}
          >
            {loading ? (
              <ImSpinner2 size={20} className="animate-spin" />
            ) : (
              <>
                <FaShoppingCart size={22} />
                <span className="ms-2">Add to cart</span>
              </>
            )}
          </button>

          <button
            className="p-2.5 rounded-xl border transition-all duration-300 text-[var(--sef-text-secondary)] border-[var(--sef-card-border)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 active:scale-95"
            title="Delete item"
            onClick={() => {
              delcard(id);
            }}
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
