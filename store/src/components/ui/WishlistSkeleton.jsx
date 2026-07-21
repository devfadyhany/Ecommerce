// src/components/WishlistSkeleton.jsx
import React from "react";

function WishlistSkeleton() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-b-2xl border bg-[var(--sef-card-bg)] border-[var(--sef-card-border)] shadow-[var(--sef-card-shadow)] animate-pulse">
      
      {/* قسم الصورة الوهمي - يأخذ خلفية حقول متجرك المخصصة */}
      <div className="h-56 w-full bg-[var(--sef-bg-fields)] opacity-70"></div>

      {/* قسم تفاصيل المنتج الوهمي */}
      <div className="p-3 space-y-4">
        
        {/* العناوين الوهمية */}
        <div className="space-y-2">
          {/* عنوان عريض بلون النص الأساسي وبشفافية */}
          <div className="h-5 w-3/4 bg-[var(--sef-text-primary)] opacity-20 rounded-md"></div>
          {/* وصف سطر أول بلون النص الثانوي وبشفافية */}
          <div className="h-3 w-full bg-[var(--sef-text-secondary)] opacity-15 rounded-md"></div>
          {/* وصف سطر ثاني */}
          <div className="h-3 w-5/6 bg-[var(--sef-text-secondary)] opacity-15 rounded-md"></div>
        </div>

        {/* السعر الوهمي - يطابق اللون الذهبي لمتجرك */}
        <div className="flex items-baseline space-x-5">
          <div className="h-6 w-24 bg-[var(--sef-gold-primary)] opacity-30 rounded-md"></div>
          <div className="h-4 w-14 bg-[var(--sef-text-fields)] opacity-30 rounded-md"></div>
        </div>

        {/* أزرار التحكم الوهمية */}
        <div className="flex items-center pt-2 gap-2">
          {/* زر إضافة للسلة وهمي - يأخذ نفس لون خلفية الأزرار المخصصة في الكارت الحقيقي */}
          <div className="flex-1 h-11 bg-[var(--sef-text-secondary)] opacity-10 border border-[var(--sef-border-color)] rounded-xl"></div>
          {/* زر الحذف وهمي */}
          <div className="w-11 h-11 bg-[var(--sef-text-secondary)] opacity-10 border border-[var(--sef-card-border)] rounded-xl"></div>
        </div>

      </div>

    </div>
  );
}

export default WishlistSkeleton;
