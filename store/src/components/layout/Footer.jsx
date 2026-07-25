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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-20">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={theme == "dark" ? LogoDark : Logo}
                className="h-12 w-auto"
              />
              <h3 className="text-[30px] font-bold text-ink leading-none">
                Elite <span className="text-gold">Cart</span>
              </h3>
            </div>

            <p className="mt-6 text-md text-ink-soft leading-7 max-w-[340px]">
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
          </div>

          {/* Quick Links */}
          <div className="justify-self-start md:justify-self-center">
            <h2 className="text-xl font-semibold mb-6 text-ink">Quick Links</h2>

            <div className="flex flex-col gap-2 justify-center items-start">
              <button
                onClick={() => setActive("Shop")}
                className={
                  active === "Shop"
                    ? "text-gold text-lg font-medium transition"
                    : "text-ink-soft text-lg font-medium hover:text-gold transition"
                }
              >
                Shop
              </button>

              <button
                onClick={() => setActive("Orders")}
                className={
                  active === "Orders"
                    ? "text-gold text-lg font-medium transition"
                    : "text-ink-soft text-lg font-medium hover:text-gold transition"
                }
              >
                My Orders
              </button>

              <button
                onClick={() => setActive("Wishlist")}
                className={
                  active === "Wishlist"
                    ? "text-gold text-lg font-medium  transition"
                    : "text-ink-soft text-lg font-medium hover:text-gold transition"
                }
              >
                Wishlist
              </button>

              <button
                onClick={() => setActive("Profile")}
                className={
                  active === "Profile"
                    ? "text-gold text-lg font-medium transition"
                    : "text-ink-soft text-lg font-medium hover:text-gold transition"
                }
              >
                Profile
              </button>
            </div>
          </div>

          {/* Social */}
          <div className="justify-self-start md:justify-self-end">
            <h2 className="text-xl font-semibold mb-6 text-ink">Follow Us</h2>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaGlobe className="text-lg" />
              </div>

              <div className="w-10 h-10 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaRegCommentDots className="text-lg" />
              </div>

              <div className="w-10 h-10 rounded-full bg-surface-fields text-ink-soft flex items-center justify-center hover:bg-gold hover:text-on-gold transition cursor-pointer">
                <FaRegHeart className="text-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-card-line mt-16 pt-10 text-center text-ink-faint text-sm">
          © 2026 Elite Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
