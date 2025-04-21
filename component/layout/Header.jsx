import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "/logo.jpg";
import axios from "axios";
import { baseUrl } from "../../constants/env.constants";

const navLinks = [
  { path: "/", label: "হোম" },
  { path: "/about", label: "পরিচয়" },
  { path: "/articles", label: "প্রবন্ধ-নিবন্ধ" },
  { path: "/miscellaneous", label: "বিবিধ" },
  { path: "/books", label: "বই পরিচিতি" },
  { path: "/UserReview", label: "পাঠক রিভিউ" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [darkMode, menuOpen]);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setMenuOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setNoResults(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowSearch(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setNoResults(false);

    try {
      const response = await axios.get(
        `${baseUrl}/book/?search=${searchQuery}`
      );
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Search error:", error);
      setNoResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookSelect = (bookId) => {
    navigate(`/books/${bookId}`);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
  };

  const SearchInput = () => (
    <div className="relative p-2 w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-5 pl-10 py-3 border border-gray-300 rounded-md leading-5 bg-[#f5f5f5] placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:text-sm"
            placeholder="বইয়ের নাম সার্চ করুন"
            aria-label="Search"
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-200"></div>
            </div>
          )}
        </div>
      </form>

      {(searchResults.length > 0 || noResults) && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md max-h-60 overflow-auto">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleBookSelect(book.id)}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {book.bookTitle}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {book.author}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-700 dark:text-gray-300">
              কোনো বই পাওয়া যায়নি
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-[#f5f5f5] border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>

            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center ml-2 lg:ml-0"
            >
              <img
                src={logoImg}
                className="rounded-full w-16 h-16 object-cover border-4 border-slate-200 dark:border-slate-600 shadow-lg"
                alt="Website Logo"
                loading="lazy"
              />
            </NavLink>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:space-x-8 lg:ml-10">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className="navLink"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <SearchInput />
            </div>

            <button
              onClick={toggleSearch}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Search"
            >
              <AiOutlineSearch className="h-5 w-5" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <BsSun className="h-5 w-5" /> : <BsMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="lg:hidden pb-3">
            <SearchInput />
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 mt-20 overflow-y-auto w-64">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};