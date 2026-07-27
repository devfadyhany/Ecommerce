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
              <span className="inline-block text-white/90 text-lg font-medium mb-6">
                ✨ Premium Shopping Experience
              </span>

              <h1 className="text-white font-extrabold leading-tight text-5xl sm:text-6xl lg:text-7xl">
                Shop the Future,
                <br />
                Delivered Today
              </h1>

              <p className="text-white/80 mt-8 text-lg sm:text-xl leading-9 max-w-xl">
                Discover premium products at unbeatable prices. Fast delivery,
                easy returns, and exceptional quality.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">
                <button className="bg-card text-gold font-semibold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition duration-300">
                  Shop Now
                </button>

                <button className="border border-on-gold/40 text-on-gold px-8 py-4 rounded-xl hover:bg-card hover:text-gold transition duration-300">
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
            <h2 className="text-4xl font-bold text-ink">Shop By Category</h2>

            <p className="text-ink-soft mt-4 text-lg">
              Browse our most popular collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Electronics */}

            <div className="bg-card border border-card-line rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaLaptop />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Electronics</h3>

              <p className="text-ink-soft mt-3">120 Products</p>
            </div>

            {/* Fashion */}

            <div className="bg-card border border-card-line rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaTshirt />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Fashion</h3>

              <p className="text-ink-soft mt-3">95 Products</p>
            </div>

            {/* Home */}

            <div className="bg-card border border-card-line rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaHome />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Home</h3>

              <p className="text-ink-soft mt-3">80 Products</p>
            </div>

            {/* Accessories */}

            <div className="bg-card border border-card-line rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-light text-gold-deep text-4xl mb-6">
                <FaHeadphones />
              </div>

              <h3 className="text-2xl font-semibold text-ink">Accessories</h3>

              <p className="text-ink-soft mt-3">60 Products</p>
            </div>
          </div>
        </div>
      </section>

    
       {/* FEATURED PRODUCTS SECTION */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-4xl font-bold text-ink">
          Featured Products
        </h2>

        <p className="text-ink-soft mt-3 text-lg">
          Handpicked just for you
        </p>
      </div>

      <Link
        to="/shop"
        className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
      >
        View All →
      </Link>
    </div>

    {loading ? (
      <p className="text-center py-10">Loading...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[image:var(--sef-gradient-gold-deep)] rounded-[30px] px-8 py-16 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-on-gold/20 flex items-center justify-center">
              <FaEnvelope className="text-on-gold text-4xl" />
            </div>

            {/* Title */}
            <h2 className="text-5xl font-bold text-on-gold">Stay Updated</h2>

            {/* Description */}
            <p className="text-on-gold/80 text-xl mt-5 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive deals and new
              arrivals first.
            </p>

            {/* Form */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-[420px] h-16 rounded-xl px-6 bg-black/20 border border-on-gold/20 text-on-gold placeholder:text-on-gold/60 outline-none focus:border-on-gold"
              />

              <button className="h-16 px-10 rounded-xl bg-card text-gold-deep font-bold text-lg hover:bg-surface-fields transition duration-300">
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
