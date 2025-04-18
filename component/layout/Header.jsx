import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import logoImg from "/logo.jpg";

const navLinks = [
  { path: "/", label: "হোম" },
  { path: "/about", label: "পরিচয়" },
  { path: "/articles", label: "প্রবন্ধ-নিবন্ধ" },
  { path: "/miscellaneous", label: "বিবিধ" },
  { path: "/books", label: "বই পরিচিতি" },
  { path: "/user-review", label: "পাঠক রিভিউ" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const location = useLocation();

  // Close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Apply theme changes and manage body overflow
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [darkMode, menuOpen]);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setShowSearch(false);
  };

  const SearchInput = () => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <AiOutlineSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm" placeholder="Search..." aria-label="Search" />
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between p-4">
          {/* Left section - Logo and mobile menu button */}
          <div className="flex items-center">
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none" aria-expanded={menuOpen} aria-label="Toggle menu">
              {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>

            <NavLink to="/" className="flex-shrink-0 flex items-center ml-2 md:ml-0">
              <img src={logoImg} className="rounded-full w-16 h-16 md:w-16 md:h-16 object-cover border-4 border-slate-200 dark:border-slate-600 shadow-lg" alt="Website Logo" loading="lazy" />
            </NavLink>
          </div>

          {/* Center section - Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8 md:ml-10">
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} className="navLink" activeClassName="font-medium text-blue-600 dark:text-blue-400">
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right section - Search and theme toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <SearchInput />
            </div>

            <button onClick={toggleSearch} className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none" aria-label="Search">
              <AiOutlineSearch className="h-5 w-5" />
            </button>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
              {darkMode ? <BsSun className="h-5 w-5" /> : <BsMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <SearchInput />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 mt-20 overflow-y-auto w-52">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" activeClassName="bg-gray-100 dark:bg-gray-800" onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};