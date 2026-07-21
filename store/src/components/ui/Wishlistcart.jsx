import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import api from "../../api/axios";
import { showErrorToast, showSuccessToast} from "../../utils/toastHelpers";
import { FaShoppingCart } from 'react-icons/fa'


function Wishlistcart({img,title,description,prise,discountPrice,id}) {

   const addcart =async (id)=>{
    try{
      const res = await api.post(`/wishlists/add/${id}`);
     await showSuccessToast("Success add cart")
          
    }catch(err){
      showErrorToast("Failed to add cart")
    }
   }

 const delcart = async  (id)=>{
  try{
    
      const res = await api.post(`/wishlists/remove/${id}`);
     await showSuccessToast("Success delete cart")
          
    }catch(err){
      showErrorToast("Failed to delete cart")
    }
   }
 

  return (
     <div className="w-full max-w-sm overflow-hidden rounded-b-2xl border transition-all duration-300 bg-[var(--sef-card-bg)] border-[var(--sef-card-border)] shadow-[var(--sef-card-shadow)] hover:shadow-[var(--sef-card-hover-shadow)] hover:bg-[var(--sef-gradient-card-hover)] group">
         
      {/* قسم الصورة */}
      <div className="relative h-56 w-full overflow-hidden bg-[var(--sef-bg-fields)]">
        <img 
          src={img} 
          alt={title}  
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* قسم تفاصيل المنتج */}
      <div className="p-3 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold line-clamp-1 text-[var(--sef-text-primary)] group-hover:text-black">
            {title}
          </h3>
          <p className="text-sm line-clamp-2 text-[var(--sef-text-secondary)]">
            {description}
          </p>
        </div>

        
        <div className="flex items-baseline space-x-5 ">
          <span className="text-xl font-extrabold text-[var(--sef-gold-primary)]">
            EGP {discountPrice}
          </span>
          {prise && (
            <del className="text-sm text-[var(--sef-text-fields)]">
              EGP &nbsp;{prise}
            </del>
          )}
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center space-x-2 space-x-reverse pt-2 gap-2">
          
          <button 
            className=" inline-flex flex-1 py-2.5 px-4 rounded-xl font-medium  transition-all duration-300  text-[var(--sef-text-secondary)] bg-[var(--sef-gradient-gold-subtle)] border border-1 border-[var(--sef-border-color)] hover:opacity-90 active:scale-95 shadow-sm"
            onClick={()=>{addcart(id)}}
            >
            <FaShoppingCart size={22}/>  &nbsp; Add to cart
          </button>
          
                  
          <button 
            
            className="p-2.5 rounded-xl border transition-all duration-300 text-[var(--sef-text-secondary)] border-[var(--sef-card-border)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 active:scale-95"
            title="Delete item"
            onClick={()=>{delcart(id)}}
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>

    </div>
  )
 
}

export default Wishlistcart;