import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiCheck, FiShare2 } from "react-icons/fi";
import { HiChevronDown, HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/env.constants";
const logoImg = "/logo.webp";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const navItems = [
  { path: "/", label: "হোম" },
  { path: "/about", label: "পরিচয়" },
  { path: "/articles", label: "প্রবন্ধ-নিবন্ধ" },
  {
    key: "islam",
    label: "ইসলাম",
    children: [
      {
        path: "/islam/quran-life-lessons",
        label: "কুরআন থেকে জীবনের পাঠ",
      },
      {
        path: "/islam/hadith-life-lessons",
        label: "হাদিস থেকে জীবনের পাঠ",
      },
      {
        path: "/islam/life-lessons",
        label: "জীবন থেকে নেওয়া শিক্ষা",
      },
    ],
  },
  {
    key: "miscellaneous",
    label: "জীবন ও জগৎ",
    children: [
      { path: "/miscellaneous/video", label: "ভিডিও" },
      { path: "/miscellaneous/culture", label: "কালচার, সংস্কৃতি" },
      { path: "/miscellaneous/travel", label: "ভ্রমণ" },
      { path: "/miscellaneous/history", label: "ইতিহাস" },
      { path: "/miscellaneous/politics", label: "রাজনীতি" },
      { path: "/miscellaneous/worldview", label: "বিশ্ব-দর্শন" },
    ],
  },
  { path: "/books", label: "বই পরিচিতি" },
  {
    key: "readers",
    label: "পাঠক রিভিউ",
    children: [
      { path: "/UserReview", label: "পাঠক রিভিউ" },
      { path: "/readers-love", label: "পাঠকের ভালোবাসা" },
    ],
  },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [darkMode] = useState(() => {
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
  const [copied, setCopied] = useState(false);

  const handleShareOrCopy = async () => {
    const shareUrl = "https://ubaydullah-tasnim.vercel.app/";
    const shareTitle = "উবায়দুল্লাহ তাসনিম";
    const shareText = "উবায়দুল্লাহ তাসনিম এর অফিশিয়াল ওয়েবসাইট। লেখক ও অনুবাদক।";

    // 1. Copy to clipboard
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard error:", err);
    }

    // 2. Open native Web Share on mobile if supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share error:", err);
        }
      }
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const searchWrapRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const desktopNavRef = useRef(null);
  const dropdownTimeoutRef = useRef({});

  const handleDropdownEnter = (key) => {
    if (dropdownTimeoutRef.current[key]) {
      clearTimeout(dropdownTimeoutRef.current[key]);
    }
    setOpenDropdown(key);
  };

  const handleDropdownLeave = (key) => {
    dropdownTimeoutRef.current[key] = setTimeout(() => {
      setOpenDropdown((current) => (current === key ? null : current));
    }, 180);
  };

  useEffect(() => {
    return () => {
      Object.values(dropdownTimeoutRef.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname, location.search]);

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
        setOpenDropdown(null);
        setSearchResults([]);
        setNoResults(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close floating menus when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      // We have multiple search wraps now (desktop, mobile), but this ref might only point to the last one.
      // A better approach is to close search results on escape, or when clicking outside.
      // For now, keep the existing logic.
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchResults([]);
        setNoResults(false);
      }

      const isOutsideDesktopNav = desktopNavRef.current && !desktopNavRef.current.contains(e.target);
      const isOutsideMobileDrawer = mobileDrawerRef.current && !mobileDrawerRef.current.contains(e.target);

      // If clicked outside BOTH desktop nav and mobile drawer, close the dropdown
      if (isOutsideDesktopNav && isOutsideMobileDrawer) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setMenuOpen(false);
    setOpenDropdown(null);
    setSearchQuery("");
    setSearchResults([]);
    setNoResults(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowSearch(false);
    setOpenDropdown(null);
    setSearchQuery("");
    setSearchResults([]);
    setNoResults(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const normalizedQuery = searchQuery.trim();
    if (!normalizedQuery) return;

    setIsSearching(true);
    setNoResults(false);

    try {
      const response = await axios.get(`${baseUrl}/book/`, {
        params: { search: normalizedQuery },
      });
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
        "after:bg-[#E5A93C]"
      )
    );

  const dropdownButtonClass = (isActive) =>
    cx(
      "relative inline-flex items-center gap-1 px-1 py-2 text-sm font-medium transition",
      "text-slate-700 hover:text-slate-900",
      "dark:text-slate-200 dark:hover:text-white",
      isActive &&
        cx(
          "text-slate-900 dark:text-white",
          "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full",
          "after:bg-[#E5A93C]"
        )
    );

  const isItemActive = useCallback((item) => {
    const matchesPath = (path) =>
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(`${path}/`));

    if (item.path && matchesPath(item.path)) return true;
    return item.children?.some((child) => matchesPath(child.path)) ?? false;
  }, [location.pathname]);


  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full",
        "border-b border-slate-200/80 bg-white shadow-xs",
        "dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 sm:h-24 items-center justify-between">
          {/* Left: Prominent Logo & Brand */}
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-13 w-13 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0f1117] border border-stone-200/80 shadow-xs dark:border-stone-800">
              <img
                src={logoImg}
                alt="উবায়দুল্লাহ তাসনিম"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="block text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif]">
              উবায়দুল্লাহ তাসনিম
            </span>
          </NavLink>

          {/* Center nav */}
          <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const itemKey = item.key || item.path;
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openDropdown === itemKey;

              if (hasChildren) {
                return (
                  <div
                    key={itemKey}
                    className="relative py-2"
                    onMouseEnter={() => handleDropdownEnter(itemKey)}
                    onMouseLeave={() => handleDropdownLeave(itemKey)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === itemKey ? null : itemKey
                        )
                      }
                      className={dropdownButtonClass(isItemActive(item))}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <HiChevronDown
                        className={cx(
                          "h-4 w-4 transition-transform duration-300",
                          isOpen && "rotate-180 text-[#E5A93C]"
                        )}
                      />
                    </button>

                    {/* Smooth Animated Desktop Dropdown */}
                    <div
                      className={cx(
                        "absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 overflow-hidden rounded-xl border py-2 shadow-xl",
                        "border-slate-200/90 bg-white/98 backdrop-blur-md",
                        "dark:border-slate-800 dark:bg-slate-950/98",
                        "before:absolute before:-top-3 before:left-0 before:right-0 before:h-3",
                        "transition-all duration-200 ease-out origin-top",
                        isOpen
                          ? "opacity-100 translate-y-1 pointer-events-auto visible scale-100"
                          : "opacity-0 translate-y-2 pointer-events-none invisible scale-95"
                      )}
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={() => setOpenDropdown(null)}
                          className={({ isActive }) =>
                            cx(
                              "block px-4 py-2.5 text-sm font-medium transition-all duration-150",
                              "text-slate-700 hover:bg-[#fcf8f0] hover:text-[#d6982b] hover:translate-x-1",
                              "dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-[#E5A93C]",
                              isActive &&
                                "bg-[#fcf8f0] text-[#d6982b] font-semibold dark:bg-[#E5A93C]/15 dark:text-[#E5A93C]"
                            )
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink key={item.path} to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <div ref={searchWrapRef} className="relative w-full max-w-md">
                <form onSubmit={handleSearch} className="relative" role="search" aria-label="বই অনুসন্ধান">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineSearch className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    name="book-search"
                    autoComplete="off"
                    className={cx(
                      "h-11 w-full rounded-xl border pl-10 pr-10 text-sm shadow-sm transition",
                      "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                      "focus:outline-none focus:ring-2 focus:ring-[#CCA764]/30 focus:border-[#CCA764]/50",
                      "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                    )}
                    placeholder="বইয়ের নাম সার্চ করুন"
                    aria-label="বইয়ের নাম দিয়ে অনুসন্ধান করুন"
                  />
                  {isSearching && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" />
                    </div>
                  )}
                </form>
                {(searchResults.length > 0 || noResults) && (
                  <div className={cx(
                    "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg",
                    "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                  )}>
                    {searchResults.length > 0 ? (
                      <ul className="max-h-72 overflow-auto py-1" aria-label="অনুসন্ধানের ফলাফল">
                        {searchResults.map((book) => (
                          <li key={book.id}>
                            <button
                              type="button"
                              className={cx(
                                "w-full px-4 py-3 text-left transition",
                                "hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none",
                                "dark:hover:bg-slate-900 dark:focus-visible:bg-slate-900"
                              )}
                              onClick={() => handleBookSelect(book.id)}
                            >
                              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{book.bookTitle}</span>
                              <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{book.author}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300" role="status" aria-live="polite">
                        কোনো বই পাওয়া যায়নি
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Share / Copy Link Button - Mobile ONLY (lg:hidden) */}
            <button
              onClick={handleShareOrCopy}
              className={cx(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                copied
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-label="ওয়েবসাইট লিংক কপি বা শেয়ার করুন"
              title="ওয়েবসাইট লিংক কপি করুন"
            >
              {copied ? (
                <FiCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <FiShare2 className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleSearch}
              className={cx(
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              )}
              aria-label={showSearch ? "অনুসন্ধান বন্ধ করুন" : "বই অনুসন্ধান করুন"}
              aria-expanded={showSearch}
              aria-controls="mobile-book-search"
            >
              <AiOutlineSearch className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button - Circular Dark Button matching tahmidulmaula.com */}
            <button
              onClick={toggleMenu}
              className={cx(
                "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full transition shadow-md",
                "bg-[#121624] text-white hover:bg-black active:scale-95",
                "dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            >
              {menuOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search area */}
        {showSearch && (
          <div id="mobile-book-search" className="pb-4 lg:hidden">
            <div ref={searchWrapRef} className="relative w-full max-w-md">
              <form onSubmit={handleSearch} className="relative" role="search" aria-label="বই অনুসন্ধান">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineSearch className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="book-search"
                  autoComplete="off"
                  className={cx(
                    "h-11 w-full rounded-xl border pl-10 pr-10 text-sm shadow-sm transition",
                    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                    "focus:outline-none focus:ring-2 focus:ring-[#CCA764]/30 focus:border-[#CCA764]/50",
                    "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                  )}
                  placeholder="বইয়ের নাম সার্চ করুন"
                  aria-label="বইয়ের নাম দিয়ে অনুসন্ধান করুন"
                />
                {isSearching && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" />
                  </div>
                )}
              </form>
              {(searchResults.length > 0 || noResults) && (
                <div className={cx(
                  "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg",
                  "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                )}>
                  {searchResults.length > 0 ? (
                    <ul className="max-h-72 overflow-auto py-1" aria-label="অনুসন্ধানের ফলাফল">
                      {searchResults.map((book) => (
                        <li key={book.id}>
                          <button
                            type="button"
                            className={cx(
                              "w-full px-4 py-3 text-left transition",
                              "hover:bg-slate-50 dark:hover:bg-slate-900"
                            )}
                            onClick={() => handleBookSelect(book.id)}
                          >
                            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{book.bookTitle}</span>
                            <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{book.author}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300" role="status" aria-live="polite">
                      কোনো বই পাওয়া যায়নি
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer — inline JSX to avoid remount on state change */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <button
            aria-label="মেনু বন্ধ করুন"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <aside
            id="mobile-navigation"
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
                  alt="উবায়দুল্লাহ তাসনিম"
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
                aria-label="মেনু বন্ধ করুন"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(100vh - 72px)' }}>
              <div className="mb-4">
                <div ref={searchWrapRef} className="relative w-full max-w-md">
                  <form onSubmit={handleSearch} className="relative" role="search" aria-label="বই অনুসন্ধান">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <AiOutlineSearch className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      name="book-search"
                      autoComplete="off"
                      className={cx(
                        "h-11 w-full rounded-xl border pl-10 pr-10 text-sm shadow-sm transition",
                        "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                        "focus:outline-none focus:ring-2 focus:ring-[#CCA764]/30 focus:border-[#CCA764]/50",
                        "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                      )}
                      placeholder="বইয়ের নাম সার্চ করুন"
                      aria-label="বইয়ের নাম দিয়ে অনুসন্ধান করুন"
                    />
                    {isSearching && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" />
                      </div>
                    )}
                  </form>
                  {(searchResults.length > 0 || noResults) && (
                    <div className={cx(
                      "absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg",
                      "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                    )}>
                      {searchResults.length > 0 ? (
                        <ul className="max-h-72 overflow-auto py-1">
                          {searchResults.map((book) => (
                            <li key={book.id}>
                              <button
                                type="button"
                                className={cx(
                                  "w-full px-4 py-3 text-left transition",
                                  "hover:bg-slate-50 dark:hover:bg-slate-900"
                                )}
                                onClick={() => handleBookSelect(book.id)}
                              >
                                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{book.bookTitle}</span>
                                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{book.author}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">কোনো বই পাওয়া যায়নি</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Drawer Share & Copy Link Option - Mobile ONLY */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={handleShareOrCopy}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold bg-[#fcf8f0] text-stone-900 border border-[#E5A93C]/40 transition active:scale-[0.98] dark:bg-slate-900 dark:text-stone-100 dark:border-stone-800"
                >
                  <span className="flex items-center gap-2.5">
                    {copied ? (
                      <FiCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <FiShare2 className="h-4 w-4 text-[#E5A93C]" />
                    )}
                    <span>
                      {copied ? "ওয়েবসাইট লিংক কপি হয়েছে!" : "ওয়েবসাইট লিংক শেয়ার / কপি"}
                    </span>
                  </span>
                  <span className="text-xs bg-[#E5A93C] text-stone-950 px-2.5 py-1 rounded-lg font-bold shadow-xs">
                    {copied ? "কপিকৃত" : "কপি"}
                  </span>
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const itemKey = item.key || item.path;
                  const hasChildren = Boolean(item.children?.length);
                  const isOpen = openDropdown === itemKey;
                  const isActive = isItemActive(item);

                  if (hasChildren) {
                    return (
                      <div key={itemKey} className="overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown((current) =>
                              current === itemKey ? null : itemKey
                            )
                          }
                          className={cx(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition duration-200",
                            "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                            "dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white",
                            isActive &&
                              "bg-[#fcf8f0] text-stone-950 font-semibold ring-1 ring-[#E5A93C]/40 dark:bg-[#E5A93C]/15 dark:text-[#E5A93C] dark:ring-[#E5A93C]/30"
                          )}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <HiChevronDown
                            className={cx(
                              "h-4 w-4 transition-transform duration-300 ease-in-out",
                              isOpen && "rotate-180 text-[#E5A93C]"
                            )}
                          />
                        </button>

                        {/* Mobile Smooth Accordion using CSS Grid Transition */}
                        <div
                          className={cx(
                            "grid transition-all duration-300 ease-in-out overflow-hidden",
                            isOpen
                              ? "grid-rows-[1fr] opacity-100 mt-1"
                              : "grid-rows-[0fr] opacity-0 mt-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="space-y-1 rounded-xl bg-stone-50/80 p-2 dark:bg-slate-900/70 border border-stone-200/50 dark:border-slate-800">
                              {item.children.map((child) => (
                                <NavLink
                                  key={child.path}
                                  to={child.path}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setOpenDropdown(null);
                                  }}
                                  className={({ isActive }) =>
                                    cx(
                                      "flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150",
                                      "text-slate-600 hover:bg-white hover:text-slate-900 hover:translate-x-1",
                                      "dark:text-slate-300 dark:hover:bg-slate-950 dark:hover:text-white",
                                      isActive &&
                                        "bg-white text-[#d6982b] font-semibold shadow-xs dark:bg-slate-950 dark:text-[#E5A93C]"
                                    )
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        cx(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
                          "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                          "dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white",
                          isActive &&
                            "bg-[#fcf8f0] text-stone-950 font-semibold ring-1 ring-[#E5A93C]/40 dark:bg-[#E5A93C]/15 dark:text-[#E5A93C] dark:ring-[#E5A93C]/30"
                        )
                      }
                    >
                      <span>{item.label}</span>
                      <span className={cx("text-sm transition-colors", isActive ? "text-[#E5A93C] font-bold" : "text-slate-300 dark:text-slate-700")}>›</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Floating notification for mobile link copy */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 text-white text-xs sm:text-sm font-medium shadow-2xl backdrop-blur border border-slate-700/60 animate-bounce">
          <FiCheck className="h-4 w-4 text-emerald-400" />
          <span>ওয়েবসাইট লিংক কপি হয়েছে!</span>
        </div>
      )}
    </header>
  );
};
