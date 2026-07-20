import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Moon, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'My Orders', path: '/orders' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-white p-1.5 sm:p-2 rounded-lg mr-2 font-mono font-bold text-base sm:text-lg">
            </div>
            <div className="flex flex-col leading-none">
              <span>KODA</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-700">STORE</span>
              <span className="text-[7px] sm:text-[8px] font-normal tracking-widest text-slate-400">ONLINE STORE</span>
            </div>
          </div>
        </div>

<div className="hidden md:flex items-center bg-[#F8F9FD] border border-gray-200/80 rounded-full p-1.5 shadow-inner">          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#5B4EFF] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
           
           
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
            <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button> 
          
          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
            <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          <button className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="absolute -top-1 -right-1 bg-[#5B4EFF] text-white text-[9px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
             7
            </span>
          </button>

          <NavLink
            to="/cart"
            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="absolute -top-1 -right-1 bg-[#5B4EFF] text-white text-[9px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
              15
            </span>
          </NavLink>

          <button className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gray-200 text-slate-700 font-medium text-xs sm:text-sm hover:bg-gray-50 transition-colors">
            <User size={16} className="text-slate-600 sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Login</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 ml-1"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 flex flex-col gap-2 transition-all">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#5B4EFF] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

