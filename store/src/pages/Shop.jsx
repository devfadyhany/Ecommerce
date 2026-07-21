import { useProducts } from "../hooks/useProducts";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../components/products/ProductCard";
import ProductFilters from "../components/products/ProductFilters";
import SearchInput from "../components/ui/SearchInput";
import ProductCardSkeleton from "../components/products/ProductCardSkeleton";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import { useState } from "react";
import ActiveFilters from "../components/products/ActiveFilters";
import Button from "../components/ui/Button";

function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    products,
    categories,
    loading,
    loadingMore,
    error,
    hasMore,
    isEmpty,
    filters,
    searchTerm,
    setSearchTerm,
    wishlistedIds,
    addingProductId,
    handleLoadMore,
    handleSearch,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortChange,
    handleClearFilters,
    removeFilter,
    handleAddToCart,
    handleToggleWishlist,
  } = useProducts();

  return (
    <div className="w-full bg-surface text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-6">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            placeholder="Search products..."
            className="flex-1"
          />

          <button
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open filters"
            className="lg:hidden shrink-0 h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center rounded-[11px] border border-line bg-card text-ink-soft hover:text-gold hover:border-gold transition-colors"
          >
            <FaFilter size={16} />
          </button>
        </div>

        <ActiveFilters
          filters={filters}
          onRemove={removeFilter}
          onClearAll={handleClearFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </aside>

          {/* Products grid */}
          <div className="lg:col-span-3">
            {error ? (
              <ErrorState
                message={error}
                onRetry={() => handleClearFilters()}
              />
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isEmpty ? (
              <EmptyState
                title="No products found"
                message="Try adjusting your filters or search term."
                actionLabel="Clear Filters"
                onAction={handleClearFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => {
                    const productId = product._id || product.id;
                    return (
                      <ProductCard
                        key={productId}
                        product={product}
                        isWishlisted={wishlistedIds.includes(productId)}
                        isAddingToCart={addingProductId === productId}
                        onToggleWishlist={() => handleToggleWishlist(productId)}
                        onAddToCart={() => handleAddToCart(productId)}
                      />
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="outline"
                      isLoading={loadingMore}
                      loadingText="Loading more..."
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
