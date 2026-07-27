import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/products/ProductCard";
import { Link } from "react-router-dom";
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

function Home() {
  

  const {
  products,
  loading,
  wishlistedIds,
  addingProductId,
  handleAddToCart,
  handleToggleWishlist,
} = useProducts();

const featuredProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "https://via.placeholder.com/200",
  },
];
  console.log(products);
console.log(featuredProducts);
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
                ✨ Premium Shopping Experience
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
                <button className="bg-card text-gold font-semibold px-7 py-3.5 rounded-xl shadow-xl hover:scale-105 transition duration-300">
                  Shop Now
                </button>

                <button className="border border-on-gold/40 text-on-gold px-7 py-3.5 rounded-xl hover:bg-card hover:text-gold transition duration-300">
                  View Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink">Shop By Category</h2>

            <p className="text-ink-soft mt-3 text-lg">
              Browse our most popular collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Electronics */}

            <div className="bg-card border border-card-line rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaLaptop />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Electronics</h3>

              <p className="text-ink-soft mt-3">120 Products</p>
            </div>

            {/* Fashion */}

            <div className="bg-card border border-card-line rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaTshirt />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Fashion</h3>

              <p className="text-ink-soft mt-3">95 Products</p>
            </div>

            {/* Home */}

            <div className="bg-card border border-card-line rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaHome />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Home</h3>

              <p className="text-ink-soft mt-3">80 Products</p>
            </div>

            {/* Accessories */}

            <div className="bg-card border border-card-line rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaHeadphones />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Accessories</h3>

              <p className="text-ink-soft mt-3">60 Products</p>
            </div>
          </div>
        </div>
      </section>

    
      {/* ================= FEATURED PRODUCTS SECTION ================= */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-ink">
          Featured Products
        </h2>

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
      <p className="text-center py-10 text-ink-soft">Loading...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featuredProducts.map((product) => {
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

    {/* ================= NEWSLETTER ================= */}

<section className="bg-card py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-[image:var(--sef-gradient-gold-deep)] rounded-[24px] px-6 py-12 text-center">

      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-on-gold/20 flex items-center justify-center">
        <FaEnvelope className="text-on-gold text-3xl" />
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-on-gold">
        Stay Updated
      </h2>

      {/* Description */}
      <p className="text-on-gold/80 text-lg mt-4 max-w-xl mx-auto">
        Subscribe to our newsletter and get exclusive deals and new arrivals first.
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