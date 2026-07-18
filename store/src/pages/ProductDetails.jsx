import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} from "../utils/toastHelpers";
import api from "../api/axios";

import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token");
  const [isAddingMainToCart, setIsAddingMainToCart] = useState(false);
  const [addingRelatedId, setAddingRelatedId] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);

        let fetchedProduct = null;
        if (response.data && response.data.product) {
          fetchedProduct = response.data.product;
        } else {
          fetchedProduct = response.data;
        }

        setProduct(fetchedProduct);
        setError("");

        if (fetchedProduct && fetchedProduct.category) {
          // eslint-disable-next-line react-hooks/immutability
          fetchRelatedProducts(
            fetchedProduct.category,
            fetchedProduct._id || fetchedProduct.id,
          );
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        showErrorToast("Error fetching product details!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [id]);

  const fetchRelatedProducts = async (categoryName, currentProductId) => {
    try {
      const response = await api.get(`/products?category=${categoryName}`);
      const allProducts = response.data.products || response.data || [];

      const filtered = allProducts.filter(
        (item) => (item._id || item.id) !== currentProductId,
      );

      setRelatedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const handleDeleteReview = async (reviewId, index) => {
    try {
      if (reviewId) {
        await api.delete(`/products/${id}/reviews/${reviewId}`);
      }

      setProduct((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((_, idx) => idx !== index),
      }));
      showSuccessToast("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      showErrorToast("Failed to delete review.");
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1,
    );
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      if (quantity < product.stock) setQuantity((prev) => prev + 1);
      else
        showWarningToast(
          `Sorry, only ${product.stock} items available in stock.`,
        );
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingMainToCart(true);
      await api.post("/carts/items", { productId: id, quantity });
      showSuccessToast("Added to cart successfully! ");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Failed to add to cart. Please check your login status.");
    } finally {
      setIsAddingMainToCart(false);
    }
  };

  const handleAddRelatedToCart = async (productId) => {
    try {
      setAddingRelatedId(productId);
      await api.post("/carts/items", { productId, quantity: 1 });
      showSuccessToast("Added to cart successfully! ");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Failed to add to cart.");
    } finally {
      setAddingRelatedId(null);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (!isWishlisted) {
        await api.post(`/wishlists/add/${id}`);
        setIsWishlisted(true);
        showSuccessToast("Added to wishlist. ");
      } else {
        await api.delete(`/wishlists/remove/${id}`);
        setIsWishlisted(false);
        showInfoToast("Removed from wishlist.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Please login first to manage your wishlist.");
    }
  };

  const handleToggleRelatedWishlist = async (productId) => {
    try {
      const isAlreadyAdded = wishlistedIds.includes(productId);
      if (!isAlreadyAdded) {
        await api.post(`/wishlists/add/${productId}`);
        setWishlistedIds((prev) => [...prev, productId]);
        showSuccessToast("Added to wishlist.");
      } else {
        await api.delete(`/wishlists/remove/${productId}`);
        setWishlistedIds((prev) => prev.filter((favId) => favId !== productId));
        showInfoToast("Removed from wishlist.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Please login first to manage your wishlist.");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showWarningToast("Please write your review comment.");
      return;
    }
    try {
      setSubmittingReview(true);
      const response = await api.post(`/products/${id}/reviews`, {
        rating,
        comment: reviewComment,
      });
      showSuccessToast("Review submitted successfully ⭐");

      const newReview = response.data.review || {
        rating,
        comment: reviewComment,
        createdAt: new Date(),
      };
      setProduct((prev) => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
      }));
      setReviewComment("");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast(
        "Failed to add review. Only registered buyers can leave reviews.",
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-surface">
        <p className="text-red-500 font-semibold">
          {error || "Product not found."}
        </p>
      </div>
    );
  }

  const { title, name, description, images = [], reviews = [] } = product;
  const displayTitle = title || name;

  return (
    <div className="w-full bg-surface text-ink min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <ImageGallery
            images={images}
            displayTitle={displayTitle}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            handlePrevImage={handlePrevImage}
            handleNextImage={handleNextImage}
          />

          <ProductInfo
            product={product}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            isAddingMainToCart={isAddingMainToCart}
            handleToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
          />
        </div>

        <ProductTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          description={description}
          reviews={reviews}
          isLoggedIn={isLoggedIn}
          rating={rating}
          setRating={setRating}
          reviewComment={reviewComment}
          setReviewComment={setReviewComment}
          handleAddReview={handleAddReview}
          submittingReview={submittingReview}
          handleDeleteReview={handleDeleteReview}
        />

        <RelatedProducts
          relatedProducts={relatedProducts}
          wishlistedIds={wishlistedIds}
          addingRelatedId={addingRelatedId}
          onToggleWishlist={handleToggleRelatedWishlist}
          onAddToCart={handleAddRelatedToCart}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
