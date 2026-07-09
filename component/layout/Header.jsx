import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/env.constants";
import logoImg from "/logo1.webp";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

  const searchWrapRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // lock body scroll for mobile drawer
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setShowSearch(false);
        setSearchResults([]);
        setNoResults(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) {
        setSearchResults([]);
        setNoResults(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

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
    setSearchQuery("");
    setSearchResults([]);
    setNoResults(false);
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
        setSearchResults([]);
        setNoResults(true);
      } else {
        setSearchResults(response.data);
        setNoResults(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
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
    setNoResults(false);
  };

  const navLinkClass = ({ isActive }) =>
    cx(
      "relative inline-flex items-center px-1 py-2 text-sm font-medium transition",
      "text-slate-700 hover:text-slate-900",
      "dark:text-slate-200 dark:hover:text-white",
      isActive &&
      cx(
        "text-slate-900 dark:text-white",
        "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full",
        "after:bg-emerald-600 dark:after:bg-emerald-400"
      )
    );

  const SearchInput = ({ autoFocus = false }) => (
    <div ref={searchWrapRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <AiOutlineSearch className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>

        <input
          autoFocus={autoFocus}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cx(
            "h-11 w-full rounded-xl border pl-10 pr-10 text-sm shadow-sm transition",
            "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
            "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          )}
          placeholder="বইয়ের নাম সার্চ করুন"
          aria-label="Search"
        />

        {isSearching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" />
          </div>
        )}
      </form>

      {(searchResults.length > 0 || noResults) && (
        <div
          className={cx(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg",
            "border-slate-200 bg-white",
            "dark:border-slate-800 dark:bg-slate-950"
          )}
        >
          {searchResults.length > 0 ? (
            <ul className="max-h-72 overflow-auto py-1">
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  className={cx(
                    "cursor-pointer px-4 py-3 transition",
                    "hover:bg-slate-50 dark:hover:bg-slate-900"
                  )}
                  onClick={() => handleBookSelect(book.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {book.bookTitle}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {book.author}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
              কোনো বই পাওয়া যায়নি
            </div>
          )}
        </div>
      )}
    </div>
  );

  const MobileDrawer = useMemo(() => {
    if (!menuOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />

        {/* Drawer */}
        <aside
          ref={mobileDrawerRef}
          className={cx(
            "fixed left-0 top-0 z-50 h-full w-[78%] max-w-xs lg:hidden",
            "border-r border-slate-200 bg-white shadow-2xl",
            "dark:border-slate-800 dark:bg-slate-950"
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-900/10 dark:ring-white/10"
                alt="Website Logo"
                loading="lazy"
              />
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                মেনু
              </div>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className={cx(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg transition",
                "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-label="Close"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-4">
            <div className="mb-4">
              <SearchInput />
            </div>

            <nav className="space-y-1">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cx(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                      "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                      "dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white",
                      isActive &&
                      "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                    )
                  }
                >
                  <span>{label}</span>
                  <span className="text-slate-300 dark:text-slate-700">›</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-6">
              <button
                onClick={() => setDarkMode((v) => !v)}
                className={cx(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                )}
              >
                <span>{darkMode ? "লাইট মোড" : "ডার্ক মোড"}</span>
                {darkMode ? (
                  <BsSun className="h-4 w-4" />
                ) : (
                  <BsMoon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }, [menuOpen, darkMode]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full",
        "border-b border-slate-200 bg-white",
        "dark:border-slate-800 dark:bg-slate-950"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className={cx(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src={logoImg}
                alt="Website Logo"
                loading="lazy"
                className="
                h-16
                w-16
                rounded-full
                object-cover
                shadow-sm
              "
              />

              <span
                className="
      hidden
      sm:block
      text-base
      font-bold
      tracking-tight
      text-slate-900
      dark:text-slate-100
    "
              >
                উবায়দুল্লাহ তাসনিম
              </span>
            </NavLink>
          </div>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <SearchInput />
            </div>

            <button
              onClick={toggleSearch}
              className={cx(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-label="Search"
            >
              <AiOutlineSearch className="h-5 w-5" />
            </button>

            <button
              onClick={() => setDarkMode((v) => !v)}
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <BsSun className="h-5 w-5" />
              ) : (
                <BsMoon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search area */}
        {showSearch && (
          <div className="pb-4 lg:hidden">
            <SearchInput autoFocus />
          </div>
        )}
      </div>

      {MobileDrawer}
    </header>
  );
};
