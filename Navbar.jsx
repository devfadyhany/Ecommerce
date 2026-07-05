
import { useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const linkStyle = ({ isActive }) => 
    `hover:text-emerald-400 ${isActive ? 'text-emerald-400 font-bold' : 'text-gray-300'}`;

  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 z-50" dir="ltr">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-white">Logo</span>
        <div className="hidden md:flex gap-6 capitalize text-xl">
          <NavLink to="/" end className={linkStyle}>home</NavLink>
          <NavLink to="/about" className={linkStyle}>about us  </NavLink>
          <NavLink to="/contact" className={linkStyle}>contact us</NavLink>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-blue-600 p-4 capitalize rounded">
          <NavLink to="/" end className={linkStyle} onClick={() => setIsOpen(false)}>home</NavLink>
          <NavLink to="/about" className={linkStyle} onClick={() => setIsOpen(false)}>about us</NavLink>
          <NavLink to="/contact" className={linkStyle} onClick={() => setIsOpen(false)}>contact us </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
