import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { BsMoon, BsSun } from "react-icons/bs";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded absolute top-3 right-3"
        >
          <BsMoon className="hidden dark:inline w-5 h-5" />
          <BsSun className="inline dark:hidden w-5 h-5" />
        </button>
        {/* Logo */}
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="../../public/logo.jpg"
            className="size-8 rounded-2xl"
            alt="Flowbite Logo"
          />
        </a>

        {/* Right buttons */}
        <div className="flex md:order-2 items-center gap-2">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <HiMenuAlt3 className="w-5 h-5" />
            <span className="sr-only">Open main menu</span>
          </button>

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 rounded-lg text-sm p-2.5"
          >
            <AiOutlineSearch className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </button>

          {/* Desktop search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Mobile Search Field */}
        {showSearch && (
          <div className="w-full mt-4 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <AiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search..."
              />
            </div>
          </div>
        )}

        {/* Menu items */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="navMenu">
            <li>
              <NavLink to="/" className="navLink">
                হোম
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink">
                লেখক সম্পর্কে
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink">
                প্রবন্ধ-নিবন্ধ
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink">
                বিবিধ
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink">
                বই পরিচিতি
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navLink">
                পাঠক রিভিউ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
