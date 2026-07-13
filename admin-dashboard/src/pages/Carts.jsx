import React, { useState, useEffect } from 'react'
import api from "../api/axios"

function CartsItemCard({ items }) {
  const itemTotal = items.price * items.quantity

  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 hover:bg-surface-fields rounded-xl p-2 transition">
      <div className="flex items-center gap-3 ">
        <img src={items.image} className="w-12 h-12 object-cover rounded-md border" />
        <div>
          <h4 className="font-semibold text-sm text-gray-800">{items.name}</h4>
          <p className="text-xs text-ink-soft">
            {items.price}$ * {items.quantity}
          </p>
        </div>
      </div>
      <span className="font-bold text-sm text-ink-soft">
        {itemTotal} $
      </span>
    </div>
  )
}












function UsercartsCard({ cartss }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-amber-900 p-5 mb-6 hover:shadow-lg transition-shadow max-h-70 overflow-y-auto pr-1">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <div>
          <h2 className="text-lg font-bold text-ink">
             {cartss.user?.username}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">ID: {cartss._id}</p>
        </div>
        <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {cartss.itemCount || cartss.items?.length || 0} 
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {cartss.items && cartss.items.length > 0 ? (
          cartss.items.map((item) => (
            <CartsItemCard key={item._id} items={item} />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-2">empty cart</p>
        )}
      </div>

      <div className="flex justify-between item-center pt-3 mt-3 border-t border-dashed border-gray-200">
        <span className="text-gray-600 font-medium"> TOTAL</span>
        <span className="text-xl font-bold text-ink-soft">
          {(cartss.subtotal || 0)} $
        </span>
      </div>
    </div>
  )
}







export default function Carts() {
  const [cartsData, setCartsData] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCartsData = async () => {
      try {
        setLoading(true)
        const res = await api.get("/orders/admin/carts") 
        
        setCartsData(res.data.carts || []) 
      } catch (err) {
        console.error("Failed to fetch Carts data:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getCartsData()
  }, [])

  if (loading) return <div className="text-center p-10">LOADING...</div>
  if (error) return <div className="text-center p-10 text-red-500">ERROR</div>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-black  mb-6  border-b bg-amber-500/10 text-amber-600/80 border-amber-400/30 rounded-xl p-3">
           Active Carts
        </h1>

        {cartsData  ? (
          cartsData.map((singleCart) => (
            <UsercartsCard key={singleCart._id} cartss={singleCart} />
          ))
        ) : (
          <p className="text-center text-gray-500">NO Active cart found</p>
        )}
      </div>
    </div>
  )
}