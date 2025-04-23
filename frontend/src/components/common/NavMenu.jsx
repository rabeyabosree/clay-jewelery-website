import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link for routing

function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu on small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-trasporent text-black">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-8">
          <Link
            to="/"
            className="text-black hover:text-gray-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-black hover:text-gray-600 transition duration-300"
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-gray-600 transition duration-300"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-white p-4`}
      >
        <Link
          to="/"
          className="block text-black py-2 hover:text-gray-600 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="block text-black py-2 hover:text-gray-600 transition duration-300"
        >
          Shop
        </Link>
        <Link
          to="/contact"
          className="block text-black py-2 hover:text-gray-600 transition duration-300"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default NavMenu;


