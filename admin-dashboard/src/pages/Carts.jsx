import React, { useState, useEffect } from "react";
import api from "../api/axios";

import HeaderCard from "../components/ui/HeaderCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function CartsItemCard({ items }) {
  const itemTotal = items.price * items.quantity;

  return (
    <div className="flex items-center justify-between border-b border-card-line py-3 hover:bg-surface-fields rounded-xl p-2 transition">
      <div className="flex items-center gap-3">
        <img
          src={items.image}
          className="w-12 h-12 object-cover rounded-md border border-line"
        />
        <div>
          <h4 className="font-semibold text-sm text-ink">{items.name}</h4>
          <p className="text-xs text-ink-soft">
            {items.price}$ * {items.quantity}
          </p>
        </div>
      </div>
      <span className="font-bold text-sm text-ink-soft">{itemTotal} $</span>
    </div>
  );
}

function UsercartsCard({ cartss }) {
  return (
    <div className="bg-card rounded-xl shadow-md border border-gold-dark/40 p-5 mb-6 hover:shadow-lg transition-shadow max-h-70 overflow-y-auto pr-2">
      <div className="flex justify-between items-start gap-3 border-b border-card-line pb-4 mb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-ink leading-tight">
            {cartss.user?.username}
          </h2>
          <p className="text-xs text-ink-faint">ID: {cartss._id}</p>
        </div>
        <span className="bg-gold-light text-gold-deep text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
          {cartss.itemCount || cartss.items?.length || 0}
        </span>
      </div>

      <div className="divide-y divide-card-line space-y-1">
        {cartss.items && cartss.items.length > 0 ? (
          cartss.items.map((item) => (
            <CartsItemCard key={item._id} items={item} />
          ))
        ) : (
          <p className="text-sm text-ink-soft py-3">empty cart</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 mt-4 border-t border-dashed border-card-line">
        <span className="text-ink-soft font-medium tracking-wide">TOTAL</span>
        <span className="text-xl font-bold text-gold">
          {cartss.subtotal || 0} $
        </span>
      </div>
    </div>
  );
}

export default function Carts() {
  const [cartsData, setCartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCartsData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/orders/admin/carts");

        setCartsData(res.data.carts || []);
      } catch (err) {
        console.error("Failed to fetch Carts data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCartsData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center p-10 text-red-500">ERROR</div>;

  return (
    <div className="p-6 bg-surface-soft min-h-screen">
      <HeaderCard
        title1="Carts"
        title2="Cart overview"
        description="All active carts returned from the API are rendered here with their latest item details."
      />

      <div className="mt-8">
        {cartsData ? (
          cartsData.map((singleCart) => (
            <UsercartsCard key={singleCart._id} cartss={singleCart} />
          ))
        ) : (
          <p className="text-center text-ink-soft">NO Active cart found</p>
        )}
      </div>
    </div>
  );
}
