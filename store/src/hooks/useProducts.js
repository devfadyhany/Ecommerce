import { useState, useEffect, useCallback, useRef } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { showSuccessToast, showErrorToast, showInfoToast } from "../utils/toastHelpers";
import {PRODUCT_MESSAGES, PRODUCTS_PAGE_LIMIT} from "../constants"

export function useProducts() {
  const { addToCart } = useCart();

  //Data state 
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  //Filters  
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    search: "",
  });

  //Local, immediate-feedback copies for price inputs — debounced into `filters`
  const [priceDraft, setPriceDraft] = useState({ minPrice: "", maxPrice: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // categories accumulate across every response so the filter list never shrinks just because the user narrowed results down
  const [categories, setCategories] = useState([]);

  //Per-card action state (kept local, not global) 
  const [wishlistedIds, setWishlistedIds] = useState([]);
  const [addingProductId, setAddingProductId] = useState(null);

  const isFirstRun = useRef(true);
  const isFirstPriceRun = useRef(true);
  const isFirstSearchRun = useRef(true);

  const fetchProducts = useCallback(async (pageToFetch, activeFilters, append) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError("");

      const params = {
        page: pageToFetch,
        limit: PRODUCTS_PAGE_LIMIT,
        ...(activeFilters.category && { category: activeFilters.category }),
        ...(activeFilters.minPrice && { minPrice: activeFilters.minPrice }),
        ...(activeFilters.maxPrice && { maxPrice: activeFilters.maxPrice }),
        ...(activeFilters.sort && { sort: activeFilters.sort }),
        ...(activeFilters.search && { search: activeFilters.search }),
      };

      const res = await api.get("/products", { params });

      if (res.data?.success) {
        const fetched = res.data.products || [];

        setProducts((prev) => (append ? [...prev, ...fetched] : fetched));
        setTotalPages(res.data.totalPages || 1);
        setPage(pageToFetch);

        setCategories((prev) => {
          const incoming = fetched.map((p) => p.category).filter(Boolean);
          return Array.from(new Set([...prev, ...incoming]));
        });
      }
    } catch (err) {
      setError(PRODUCT_MESSAGES.FETCH_ERROR);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Debounce price inputs
  useEffect(() => {
    if (isFirstPriceRun.current) {
      isFirstPriceRun.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        minPrice: priceDraft.minPrice,
        maxPrice: priceDraft.maxPrice,
      }));
    }, 600);
    return () => clearTimeout(timeout);
  }, [priceDraft]);

  // Debounce search input 
  useEffect(() => {
    if (isFirstSearchRun.current) {
      isFirstSearchRun.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Whenever filters change (anything except page), reset to page 1 and refetch
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } 
    fetchProducts(1, filters, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchProducts(nextPage, filters, true);
  };

  const handleSearch = (term) => {
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleMinPriceChange = (minPrice) => {
    setPriceDraft((prev) => ({ ...prev, minPrice }));
  };

  const handleMaxPriceChange = (maxPrice) => {
    setPriceDraft((prev) => ({ ...prev, maxPrice }));
  };

  const handleSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  const handleClearFilters = () => {
    setPriceDraft({ minPrice: "", maxPrice: "" });
    setSearchTerm("");
    setFilters({ category: "", minPrice: "", maxPrice: "", sort: "", search: "" });
  };

  const removeFilter = (key) => {
    if (key === "minPrice" || key === "maxPrice") {
      setPriceDraft((prev) => ({ ...prev, [key]: "" }));
    }
    if (key === "search") {
      setSearchTerm("");
    }
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingProductId(productId);
      await addToCart(productId, 1);
      showSuccessToast(PRODUCT_MESSAGES.ADDED_TO_CART);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast(PRODUCT_MESSAGES.ADD_TO_CART_ERROR);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const isAlreadyWishlisted = wishlistedIds.includes(productId);
      if (!isAlreadyWishlisted) {
        await api.post(`/wishlists/add/${productId}`);
        setWishlistedIds((prev) => [...prev, productId]);
        showSuccessToast(PRODUCT_MESSAGES.ADDED_TO_WISHLIST);
      } else {
        await api.delete(`/wishlists/remove/${productId}`);
        setWishlistedIds((prev) => prev.filter((id) => id !== productId));
        showInfoToast(PRODUCT_MESSAGES.REMOVED_FROM_WISHLIST);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast(PRODUCT_MESSAGES.WISHLIST_ERROR);
    }
  };

  const hasMore = page < totalPages;
  const isEmpty = !loading && !error && products.length === 0;

  return {
    // data
    products,
    categories,
    loading,
    loadingMore,
    error,
    hasMore,
    isEmpty,

    // filters
    filters,
    priceDraft,
    searchTerm,
    setSearchTerm,

    // wishlist 
    wishlistedIds,
    addingProductId,

    // actions
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
  };
}