import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import api from "../../api/axios";
import { showErrorToast, showSuccessToast} from "../../utils/toastHelpers";
import { FaShoppingCart } from 'react-icons/fa'
import { ImSpinner2 } from "react-icons/im";


function WishlistCard({img,title,description,price,discountPrice,id}) {
const [loading,setLoading]= useState(false)

   const addcard =async (id)=>{
    try{
      const res = await api.post(`/wishlists/add/${id}`);
     await showSuccessToast("Success add card")
          setLoading(true)
    }catch(err){
      showErrorToast("Failed to add card")
    }finally{
      setLoading(false)
    }
   }

 const delcard = async  (id)=>{
  try{
    
      const res = await api.delete(`/wishlists/remove/${id}`);
     await showSuccessToast("Success delete card")
          
    }catch(err){
      showErrorToast("Failed to delete card")
    }
   }
 

  return (
     <div className="w-full max-w-sm overflow-hidden rounded-b-2xl border transition-all duration-300 bg-[var(--sef-card-bg)] border-[var(--sef-card-border)] shadow-[var(--sef-card-shadow)] hover:shadow-[var(--sef-card-hover-shadow)] hover:bg-[var(--sef-gradient-card-hover)] group">
         
      {/* قسم الصورة */}
      <div className="relative h-80 w-full overflow-hidden bg-[var(--sef-bg-fields)]">
        <img 
          src={img} 
          alt={title}  
          className="h-full w-full bg-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* قسم تفاصيل المنتج */}
      <div className="p-3 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold line-clamp-1 text-[var(--sef-text-primary)] ">
            {title}
          </h3>
          <p className="text-sm line-clamp-2 text-[var(--sef-text-secondary)]">
            {description}
          </p>
        </div>

        
        <div className="flex items-baseline space-x-5 ">
          
          <span className="text-xl font-extrabold text-[var(--sef-gold-primary)]">
            EGP {discountPrice? discountPrice : price}
          </span>
          {discountPrice ?
            <del className="text-sm text-[var(--sef-text-fields)]">
              EGP {price}
            </del>:""
          }
        </div>


        <div className="flex items-center space-x-2 space-x-reverse pt-2 gap-2">
          
          <button 
            className=" inline-flex flex-1 py-2.5 px-4 rounded-xl font-medium  transition-all duration-300  text-[var(--sef-text-secondary)] bg-[var(--sef-gradient-gold-subtle)] border border-1 border-[var(--sef-border-color)] hover:opacity-90 active:scale-95 shadow-sm"
            onClick={()=>{addcard(id)}}
            >
              {loading ? (      <ImSpinner2 size={20} className="animate-spin" />) : (
                      <>
                        <FaShoppingCart size={22} />
                        <span className="ms-2">Add to cart</span>
                      </>
                    )}

          </button>
          
                  
          <button 
            
            className="p-2.5 rounded-xl border transition-all duration-300 text-[var(--sef-text-secondary)] border-[var(--sef-card-border)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 active:scale-95"
            title="Delete item"
            onClick={()=>{delcard(id)}}
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>

    </div>
  )
 
}

export default WishlistCard;