import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold">
            MyBrand
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className="text-white hover:text-gray-300 transition">
              Home
            </NavLink>
            <NavLink to="/about" className="text-white hover:text-gray-300 transition">
              About
            </NavLink>
            <NavLink to="/services" className="text-white hover:text-gray-300 transition">
              Services
            </NavLink>
            <NavLink to="/contact" className="text-white hover:text-gray-300 transition">
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <NavLink to="/" className="block py-2 px-4 text-white hover:bg-blue-800" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className="block py-2 px-4 text-white hover:bg-blue-800" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/services" className="block py-2 px-4 text-white hover:bg-blue-800" onClick={toggleMenu}>
            Services
          </NavLink>
          <NavLink to="/contact" className="block py-2 px-4 text-white hover:bg-blue-800" onClick={toggleMenu}>
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
