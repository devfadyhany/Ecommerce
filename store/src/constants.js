export const PRODUCTS_PAGE_LIMIT = 12;

export const CURRENCY = "EGP";

export const DEFAULT_CATEGORY_LABEL = "General";

export const PRODUCT_MESSAGES = {
  ADDED_TO_CART: "Added to cart successfully!",
  ADD_TO_CART_ERROR: "Failed to add to cart. Please check your login status.",
  ADDED_TO_WISHLIST: "Added to wishlist.",
  REMOVED_FROM_WISHLIST: "Removed from wishlist.",
  WISHLIST_ERROR: "Please login first to manage your wishlist.",
  FETCH_ERROR: "Failed to load products. Please try again.",
};

export const PRODUCTS_SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];