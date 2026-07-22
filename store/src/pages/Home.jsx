import { FaLaptop, FaTshirt, FaHome, FaHeadphones } from "react-icons/fa";

import { FaShoppingBag, FaShoppingCart, FaTruck } from "react-icons/fa";

import { FaEnvelope } from "react-icons/fa";

function Home() {
  const links = ["Shop", "My Orders", "Wishlist", "Profile"];
  return (
    <>
      {/* ================= HERO SECTION ================= */}

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
              <h2 className="text-4xl font-bold text-ink">Featured Products</h2>

              <p className="text-ink-soft mt-3 text-lg">
                Handpicked just for you
              </p>
            </div>

            <button className="text-gold font-semibold hover:text-gold-deep transition">
              View All →
            </button>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-card-line bg-card h-[450px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold-light mx-auto flex items-center justify-center mb-6">
                <span className="text-4xl">🛍️</span>
              </div>

              <h3 className="text-2xl font-semibold text-ink-soft">
                Featured Products Placeholder
              </h3>

              <p className="text-ink-faint mt-3">
                This section will be implemented later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-ink">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-light flex items-center justify-center mb-8">
                <FaShoppingBag className="text-4xl text-gold-deep" />
              </div>

              <h3 className="text-3xl font-semibold text-ink">
                Browse Products
              </h3>

              <p className="text-ink-soft text-lg mt-4 leading-8 max-w-sm mx-auto">
                Explore our wide range of premium products.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-light flex items-center justify-center mb-8">
                <FaShoppingCart className="text-4xl text-gold-deep" />
              </div>

              <h3 className="text-3xl font-semibold text-ink">Add to Cart</h3>

              <p className="text-ink-soft text-lg mt-4 leading-8 max-w-sm mx-auto">
                Select your favorites and add them to your shopping cart.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-light flex items-center justify-center mb-8">
                <FaTruck className="text-4xl text-gold-deep" />
              </div>

              <h3 className="text-3xl font-semibold text-ink">
                Order & Receive
              </h3>

              <p className="text-ink-soft text-lg mt-4 leading-8 max-w-sm mx-auto">
                Place your order and get it delivered safely to your doorstep.
              </p>
            </div>
          </div>
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
