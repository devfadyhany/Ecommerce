import Skeleton from "../ui/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card border border-card-line rounded-3xl p-5 flex flex-col justify-between">
      {/* Category + Wishlist */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Image */}
      <Skeleton className="h-52 w-full rounded-2xl mb-5" />

      {/* Info */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4 rounded-md" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-3 w-8 rounded-md" />
        </div>

        <Skeleton className="h-5 w-24 rounded-md" />

        <Skeleton className="h-[42px] w-full rounded-xl mt-1" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;