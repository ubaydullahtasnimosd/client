import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import { BsMoon, BsSun } from "react-icons/bs";
import logoImg from "../../public/logo.jpg";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Toggle search visibility on mobile
  const toggleSearch = () => {
    setShowSearch(prev => !prev);
    if (menuOpen) setMenuOpen(false);
  };

  // Toggle mobile menu with fullscreen background
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    if (showSearch) setShowSearch(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left section - Logo and mobile menu button */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center ml-2 md:ml-0"
            >
              <img
                src={logoImg}
                className="h-16 w-16 rounded-4xl object-cover"
                alt="Website Logo"
                width={32}
                height={32}
                loading="lazy"
              />
            </NavLink>
          </div>

          {/* Center section - Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8 md:ml-10">
            <NavLink
              to="/"
              className="navLink"
              activeClassName="font-medium text-blue-600 dark:text-blue-400"
            >
              হোম
            </NavLink>
            <NavLink
              to="/about"
              className="navLink"
              activeClassName="font-medium text-blue-600 dark:text-blue-400"
            >
              লেখক সম্পর্কে
            </NavLink>
            <NavLink
              to="/articles"
              className="navLink"
              activeClassName="font-medium text-blue-600 dark:text-blue-400"
            >
              প্রবন্ধ-নিবন্ধ
            </NavLink>
            <NavLink
              to="/miscellaneous"
              className="navLink"
              activeClassName="font-medium text-blue-600 dark:text-blue-400"
            >
              বিবিধ
            </NavLink>
            <NavLink
              to="/books"
              className="navLink"
              activeClassName="font-medium text-blue-600 dark:text-blue-400"
            >
              বই পরিচিতি
            </NavLink>
          </nav>

          {/* Right section - Search and theme toggle */}
          <div className="flex items-center space-x-4">
            {/* Desktop search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

            {/* Mobile search button */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Search"
            >
              <AiOutlineSearch className="h-5 w-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <BsSun className="h-5 w-5" />
              ) : (
                <BsMoon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu - Full screen overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 mt-20 overflow-y-auto w-52">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              activeClassName="bg-gray-100 dark:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              হোম
            </NavLink>
            <NavLink
              to="/about"
              className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              activeClassName="bg-gray-100 dark:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              লেখক সম্পর্কে
            </NavLink>
            <NavLink
              to="/articles"
              className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              activeClassName="bg-gray-100 dark:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              প্রবন্ধ-নিবন্ধ
            </NavLink>
            <NavLink
              to="/miscellaneous"
              className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              activeClassName="bg-gray-100 dark:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              বিবিধ
            </NavLink>
            <NavLink
              to="/books"
              className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              activeClassName="bg-gray-100 dark:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              বই পরিচিতি
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};