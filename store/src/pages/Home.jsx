import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/products/ProductCard";
import { Link , useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaLaptop,
  FaTshirt,
  FaHome,
  FaHeadphones,
  FaShoppingBag,
  FaTruck,
  FaEnvelope,
} from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import api from "../api/axios";
import Skeleton from "../components/ui/Skeleton";

const CATEGORIES = [
  { key: "electronics", label: "Electronics", icon: FaLaptop },
  { key: "fashion", label: "Fashion", icon: FaTshirt },
  { key: "home", label: "Home", icon: FaHome },
  { key: "accessories", label: "Accessories", icon: FaHeadphones },
];

function Home() {
  const navigate = useNavigate();
  const {
    products,
    loading,
    wishlistedIds,
    addingProductId,
    handleAddToCart,
    handleToggleWishlist,
  } = useProducts();
  
  const links = ["Shop", "My Orders", "Wishlist", "Profile"];

  const [categoryCounts, setCategoryCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(true);


  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        setCountsLoading(true);

        const results = await Promise.all(
          CATEGORIES.map((cat) =>
            api.get("/products", { params: { category: cat.key, limit: 1 } }),
          ),
        );

        const counts = {};
        results.forEach((res, i) => {
          counts[CATEGORIES[i].key] = res.data?.totalProducts ?? 0;
        });

        setCategoryCounts(counts);
      } catch (err) {
        console.error("Failed to fetch category counts:", err);
      } finally {
        setCountsLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[image:var(--sef-gradient-gold-deep)]">
        {/* Background Glow */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold-light opacity-20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-dark opacity-20 blur-[120px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center min-h-[650px]">
            <div className="max-w-2xl">
              <span className="inline-block text-white/90 text-base font-medium mb-5">
                <IoSparklesOutline className="size-6 inline me-2" /> Premium
                Shopping Experience
              </span>

              <h1 className="text-white font-extrabold leading-tight text-3xl sm:text-4xl lg:text-5xl">
                Shop the Future,
                <br />
                Delivered Today
              </h1>

              <p className="text-white/80 mt-6 text-base sm:text-lg leading-8 max-w-xl">
                Discover premium products at unbeatable prices. Fast delivery,
                easy returns, and exceptional quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">
                <button onClick={() => navigate("/shop")} className="bg-card text-gold font-semibold px-7 py-3.5 rounded-xl shadow-xl hover:scale-105 transition duration-300">
                  Shop Now
                </button>

                <button
                  onClick={() =>
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-on-gold/40 text-on-gold px-7 py-3.5 rounded-xl hover:bg-card hover:text-gold transition duration-300"
                >
                  View Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}

      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink">Shop By Category</h2>

            <p className="text-ink-soft mt-3 text-lg">
              Browse our most popular collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                to={`/shop?category=${key}`}
                className="bg-card border border-card-line rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer block"
              >
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                  <Icon />
                </div>
                <h3 className="text-2xl font-semibold text-ink">{label}</h3>
                {countsLoading ? (
                  <div className="flex justify-center mt-3">
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : (
                  <p className="text-ink-soft mt-3">
                    {categoryCounts[key] ?? 0} Products
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS SECTION ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-ink">Featured Products</h2>

              <p className="text-ink-soft mt-2 text-base">
                Handpicked just for you
              </p>
            </div>

            <Link
              to="/shop"
              className="text-gold-deep text-sm font-semibold hover:underline transition"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <p className="text-center py-10 text-ink-soft ">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-ink">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="size-16 mx-auto rounded-2xl bg-gold-light flex items-center justify-center mb-4">
                <FaShoppingBag className="text-2xl text-gold-deep" />
              </div>

              <h3 className="text-xl font-semibold text-ink">
                Browse Products
              </h3>

              <p className="text-ink-soft text-md leading-8 max-w-sm mx-auto">
                Explore our wide range of premium products.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="size-16 mx-auto rounded-2xl bg-gold-light flex items-center justify-center mb-4">
                <FaShoppingCart className="text-2xl text-gold-deep" />
              </div>

              <h3 className="text-xl font-semibold text-ink">Add to Cart</h3>

              <p className="text-ink-soft text-md leading-8 max-w-sm mx-auto">
                Select your favorites and add them to your shopping cart.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="size-16 mx-auto rounded-2xl bg-gold-light flex items-center justify-center mb-4">
                <FaTruck className="text-2xl text-gold-deep" />
              </div>

              <h3 className="text-xl font-semibold text-ink">
                Order & Receive
              </h3>

              <p className="text-ink-soft text-md leading-8 max-w-sm mx-auto">
                Place your order and get it delivered safely to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[image:var(--sef-gradient-gold-deep)] rounded-[24px] px-6 py-12 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-on-gold/20 flex items-center justify-center">
              <FaEnvelope className="text-on-gold text-3xl" />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-on-gold">Stay Updated</h2>

            {/* Description */}
            <p className="text-on-gold/80 text-lg mt-4 max-w-xl mx-auto">
              Subscribe to our newsletter and get exclusive deals and new
              arrivals first.
            </p>

            {/* Form */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-[380px] h-14 rounded-xl px-5 bg-black/20 border border-on-gold/20 text-on-gold placeholder:text-on-gold/60 outline-none focus:border-on-gold"
              />

              <button className="h-14 px-8 rounded-xl bg-card text-gold-deep font-semibold text-base hover:bg-surface-fields transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
