import React, { useState } from "react";
import { FaBolt, FaGlobe, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

import Logo from "../../assets/logo.png";
import LogoDark from "../../assets/logo-dark.png";

function Footer() {
  const [active, setActive] = useState("Profile");
  const { theme } = useTheme();

  return (
    <footer className="bg-layout border-t border-card-line">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 text-gold text-3xl font-bold">
              <img
                src={theme == "dark" ? LogoDark : Logo}
                className="size-12"
              />
              <h3 className="font-bold text-ink">
                Elite <span className="text-gold">Cart</span>
              </h3>
            </div>

            <p className="mt-6 text-ink-soft text-xl leading-9 max-w-sm">
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-ink">Quick Links</h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setActive("Shop")}
                className={
                  active === "Shop"
                    ? "text-gold text-2xl font-semibold transition"
                    : "text-ink-soft text-xl hover:text-gold transition"
                }
              >
                Shop
              </button>

              <button
                onClick={() => setActive("Orders")}
                className={
                  active === "Orders"
                    ? "text-gold text-2xl font-semibold transition"
                    : "text-ink-soft text-xl hover:text-gold transition"
                }
              >
                My Orders
              </button>

              <button
                onClick={() => setActive("Wishlist")}
                className={
                  active === "Wishlist"
                    ? "text-gold text-2xl font-semibold transition"
                    : "text-ink-soft text-xl hover:text-gold transition"
                }
              >
                Wishlist
              </button>

              <button
                onClick={() => setActive("Profile")}
                className={
                  active === "Profile"
                    ? "text-gold text-2xl font-semibold transition"
                    : "text-ink-soft text-xl hover:text-gold transition"
                }
              >
                Profile
              </button>
            </div>
          </div>

          {/* Social */}
          <div className="ml-auto">
            <h2 className="text-3xl font-bold mb-6 text-ink">Follow Us</h2>

            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaGlobe />
              </div>

              <div className="w-14 h-14 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaRegCommentDots />
              </div>

              <div className="w-14 h-14 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaRegHeart />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-card-line mt-12 pt-8 text-center text-ink-faint text-lg">
          © 2026 Elite Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
