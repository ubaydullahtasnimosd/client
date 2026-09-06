import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Media } from "../component/layout/Media";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const heroBg = "/hero-section2.webp";
const Logo = "/logo.webp";

// API URLs
const BOOK_API_URL = `${baseUrl}/book/`;
const SUBSCRIBE_API_URL = `${baseUrl}/subscribe/subscribe/`;
const VERIFY_API_URL = `${baseUrl}/subscribe/subscribe/verify/`;

// API Services
const fetchBooks = async () => {
  const { data } = await axios.get(BOOK_API_URL);
  return data;
};

const subscribeEmail = async (formData) => {
  const response = await axios.post(SUBSCRIBE_API_URL, formData);
  return response.data;
};

const verifySubscription = async (token) => {
  const response = await axios.get(`${VERIFY_API_URL}${token}/`);
  return response.data;
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

// Unified Section Container with strictly White & #f5f5f5 backgrounds
const SectionShell = ({ children, className = "", id }) => (
  <section id={id} className={cx("py-16 sm:py-20 lg:py-24", className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  </section>
);

// Consistent Section Header
const SectionHeader = ({ badge, title, subtitle, align = "center" }) => (
  <div
    className={cx(
      "mb-10 sm:mb-14",
      align === "center"
        ? "text-center max-w-2xl mx-auto"
        : "text-left max-w-2xl",
    )}
  >
    {badge && (
      <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-[#E5A93C] uppercase mb-2">
        {badge}
      </span>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif]">
      {title}
    </h2>
    <div
      className={cx(
        "mt-3 h-0.5 w-16 bg-[#E5A93C]",
        align === "center" && "mx-auto",
      )}
    />
    {subtitle && (
      <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
        {subtitle}
      </p>
    )}
  </div>
);

// 1. Hero Section - Flawless mobile & desktop responsiveness matching tahmidulmaula.com
const HeroSection = () => (
  <section className="relative w-full overflow-hidden bg-[#0c0e14] min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] py-10 sm:py-20 lg:py-28 flex items-center">
    {/* Background Image - Artfully positioned on mobile to prevent calligraphy collision with text */}
    <div className="absolute inset-0 z-0">
      <img
        src={heroBg}
        alt="উবায়দুল্লাহ তাসনিম"
        className="h-full w-full object-cover object-center"
      />
      {/* Crystal-clear background scrim: bright and visible across left, bottom and center */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
    </div>

    {/* Content Container - Direct text without card box background, scaled for mobile and desktop */}
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl text-left">
        {/* Roles Subheading - White per user request */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-white uppercase font-sans flex flex-wrap items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          <span>লেখক</span>
          <span className="text-white/80">•</span>
          <span>অনুবাদক</span>
          <span className="text-white/80">•</span>
          <span>শিক্ষক</span>
        </p>

        {/* Main Name Heading - Golden/Champagne Typography matching tahmidulmaula.com */}
        <h1 className="mt-3.5 sm:mt-5 text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#E5A93C] font-['Noto_Serif_Bengali',_serif] leading-[1.16] sm:leading-[1.12] drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
          উবায়দুল্লাহ তাসনিম
        </h1>

        {/* Biography / Description */}
        <p className="mt-4 sm:mt-7 text-base sm:text-lg md:text-xl text-white font-light leading-relaxed sm:leading-8 font-sans max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
        লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো এবং ভালোর কথা।
        </p>

        {/* Action Buttons - Sharp Rectangular Styling matching tahmidulmaula.com */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto max-w-md">
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-none border border-[#E5A93C] bg-[#E5A93C] px-7 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-stone-950 shadow-lg shadow-black/40 transition-all duration-200 hover:bg-[#d6982b] hover:border-[#d6982b] text-center"
          >
            পরিচিতি পড়ুন
          </Link>
          <Link
            to="/books"
            className="inline-flex items-center justify-center rounded-none border border-white/90 bg-black/40 backdrop-blur-xs px-7 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-medium text-white shadow-lg shadow-black/40 transition-all duration-200 hover:bg-white hover:text-stone-950 text-center"
          >
            বই ও প্রকাশনাসমূহ
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// 2. Books Showcase Section - Exact tahmidulmaula.com UX: Smooth CSS transform slider, side-mounted arrows, 4-book layout, no price/cart
const BookShowcase = ({ books = [], isLoading, isError, error, refetch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
    }
    return 4;
  });
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Exactly 1 book per view on mobile
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalBooks = books?.length || 0;
  const maxIndex = Math.max(0, Math.ceil(totalBooks - itemsPerView));

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  return (
    <SectionShell id="books" className="bg-white dark:bg-slate-950">
      {/* Title - Bengali Heading */}
      <div className="mb-8 sm:mb-10 text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-['Noto_Serif_Bengali',_serif]">
          উবায়দুল্লাহ তাসনিম এর লিখিত বই সমূহ
        </h2>
        <div className="mt-3 h-0.5 w-16 bg-[#E5A93C]" />
      </div>

      {isLoading ? (
        <div className="py-16 flex justify-center">
          <Loading />
        </div>
      ) : isError ? (
        <div className="py-12">
          <ErrorMessage message={error?.message} onRetry={refetch} />
        </div>
      ) : (
        <div className="relative group/slider px-9 sm:px-14">
          {/* Left Floating Navigation Arrow - Outside with gap to books */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isAtStart}
            aria-label="পূর্ববর্তী বইসমূহ"
            className={cx(
              "absolute left-0 top-[38%] -translate-y-1/2 z-20 flex h-11 w-8 sm:w-9 items-center justify-center transition-all duration-200 rounded-none shadow-md",
              isAtStart
                ? "bg-[#F2ECE4]/70 text-stone-400 cursor-not-allowed opacity-50 dark:bg-stone-800/60 dark:text-stone-500"
                : "bg-[#F2ECE4] text-stone-700 hover:bg-stone-300 cursor-pointer dark:bg-stone-800 dark:text-stone-200",
            )}
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Floating Navigation Arrow - Outside with gap to books (Gold Accent) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isAtEnd}
            aria-label="পরবর্তী বইসমূহ"
            className={cx(
              "absolute right-0 top-[38%] -translate-y-1/2 z-20 flex h-11 w-8 sm:w-9 items-center justify-center transition-all duration-200 rounded-none shadow-md",
              isAtEnd
                ? "border border-stone-300 bg-stone-200 text-stone-400 cursor-not-allowed opacity-50 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-500"
                : "border border-[#E5A93C] bg-[#E5A93C] text-stone-950 hover:bg-[#d6982b] cursor-pointer",
            )}
          >
            <HiChevronRight className="h-5 w-5" />
          </button>

          {/* Slider Track Viewport */}
          <div
            className="overflow-hidden w-full pb-4 pt-2"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const diff = touchStartX - e.changedTouches[0].clientX;
              if (diff > 45) handleNext();
              if (diff < -45) handlePrev();
              setTouchStartX(null);
            }}
          >
            {/* Smooth CSS Transform Sliding Row */}
            <div
              className="flex transition-transform duration-500 ease-out -mx-2 sm:-mx-3"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {books?.map((book) => (
                <div
                  key={book.id}
                  className="shrink-0 px-2 sm:px-3 flex flex-col items-center text-center group/card"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Book Cover - Standalone cover linking directly to book details */}
                  <Link
                    to={`/books/${book.id}`}
                    className="relative block w-full aspect-[1/1.42] max-w-[260px] overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-md group-hover/card:shadow-xl transition-all duration-300 group-hover/card:-translate-y-1.5 border border-stone-200/60 dark:border-stone-800"
                  >
                    <img
                      src={book.bookImage || Logo}
                      alt={book.bookTitle}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = Logo;
                      }}
                    />
                  </Link>

                  {/* Book Title */}
                  <Link
                    to={`/books/${book.id}`}
                    className="mt-4 text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug min-h-[2.5rem] px-1 hover:text-[#E5A93C] transition-colors"
                  >
                    {book.bookTitle}
                  </Link>

                  {/* Author Attribution */}
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    by{" "}
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      {book.author || "মাওলানা উবায়দুল্লাহ তাসনিম"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
};

// 3. Profile Section - bg-[#f5f5f5]
const ProfileSection = () => (
  <SectionShell
    id="about"
    className="bg-[#f5f5f5] dark:bg-[#0f1117] border-y border-stone-200/60 dark:border-stone-800/60"
  >
    <SectionHeader badge="পরিচিতি" title="লেখক সম্পর্কে" align="left" />

    <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-[#E5A93C]/30 blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
          <img
            src={Logo}
            alt="উবায়দুল্লাহ তাসনিম"
            className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full object-cover border-2 border-[#E5A93C] shadow-lg bg-slate-950"
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full md:w-2/3 text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif]">
          উবায়দুল্লাহ তাসনিম
        </h3>
        <p className="mt-2 text-sm font-medium text-[#E5A93C]">
          লেখক • অনুবাদক • শিক্ষক
        </p>

        <p className="mt-4 text-base md:text-lg leading-relaxed sm:leading-8 text-slate-700 dark:text-slate-300 text-justify">
          সামান্য একজন লেখক। লেখালিখি পেশা নয়, জীবনের মূল স্বপ্ন ও সাধনা। লেখেন,
          লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো
          এবং ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল দিয়ে।
          প্রতিটি লেখায় ফুটে ওঠে সমাজের প্রতি মমত্ববোধ ও মানবতার চিরন্তন বার্তা।
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {["লেখক", "অনুবাদক", "শিক্ষক"].map((role) => (
            <span
              key={role}
              className={cx(
                "inline-flex items-center rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium",
                "bg-white text-slate-800 border border-slate-200 shadow-xs",
                "dark:bg-slate-950 dark:text-slate-200 dark:border-slate-800",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C] mr-2" />
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  </SectionShell>
);

// 4. Email Subscribe Section - bg-[#f5f5f5]
export const EmailSubscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: () => {
      const message =
        "সাবস্ক্রিপশন সফল! ভেরিফিকেশনের জন্য আপনার ইমেইল চেক করুন।";
      toast.success(message);
      setSuccessMessage(message);
      setName("");
      setEmail("");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "সাবস্ক্রিপশন ব্যর্থ। আবার চেষ্টা করুন।",
      );
    },
  });

  const token = new URLSearchParams(window.location.search).get("token");

  useQuery({
    queryKey: ["verifySubscription", token],
    queryFn: () => verifySubscription(token),
    enabled: !!token,
    onSuccess: () => {
      toast.success("ইমেইল ভেরিফিকেশন সফল!");
      window.history.replaceState({}, document.title, window.location.pathname);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "ভেরিফিকেশন ব্যর্থ। আবার চেষ্টা করুন।",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.warning("দয়া করে নাম এবং ইমেইল ঠিকানা প্রদান করুন");
      return;
    }
    setSuccessMessage("");
    subscribeMutation.mutate({ name, email });
  };

  return (
    <SectionShell id="newsletter" className="bg-[#f5f5f5] dark:bg-[#0f1117]">
      <div
        className={cx(
          "rounded-3xl border p-6 sm:p-10 md:p-12",
          "border-[#E5A93C]/20 bg-[#fdfbf7] shadow-xs",
          "dark:border-slate-800 dark:bg-slate-900/60",
        )}
      >
        <SectionHeader
          badge="নিউজলেটার"
          title="ই-মেইলে নতুন লেখা পেতে সাবস্ক্রাইব করুন"
          subtitle="নতুন বই, প্রবন্ধ ও চিন্তাশীল লেখার আপডেট সরাসরি আপনার ইনবক্সে পান"
        />

        {successMessage && (
          <div
            className={cx(
              "mx-auto -mt-6 mb-8 max-w-md rounded-xl border px-4 py-3 text-center text-sm",
              "border-[#E5A93C]/40 bg-[#E5A93C]/10 text-stone-900",
              "dark:border-slate-800 dark:bg-slate-900 dark:text-[#E5A93C]",
            )}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
            >
              নাম*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার সম্পূর্ণ নাম"
              required
              className={cx(
                "h-12 w-full rounded-xl border px-4 text-sm shadow-xs transition",
                "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/40 focus:border-[#E5A93C]",
                "dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
              )}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5"
            >
              ইমেইল*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল ঠিকানা"
              required
              className={cx(
                "h-12 w-full rounded-xl border px-4 text-sm shadow-xs transition",
                "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/40 focus:border-[#E5A93C]",
                "dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500",
              )}
            />
          </div>

          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className={cx(
              "h-12 w-full rounded-xl text-sm font-semibold shadow-md transition-all duration-200",
              "bg-[#E5A93C] text-stone-950 hover:bg-[#d6982b]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]/40",
              "disabled:opacity-70 disabled:cursor-not-allowed",
            )}
          >
            {subscribeMutation.isPending
              ? "প্রক্রিয়াধীন..."
              : "সাবস্ক্রাইব করুন"}
          </button>
        </form>

        <p className="mt-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
          বই সংক্রান্ত যে কোনো তথ্যের জন্য যোগাযোগ করুন{" "}
          <a
            href="https://www.facebook.com/profile.php?id=100094697794310"
            className="font-semibold text-[#E5A93C] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ubaydullah Tasnim
          </a>{" "}
          ফেসবুক পেইজে।
        </p>
      </div>
    </SectionShell>
  );
};

// Main Home Component
export const Home = () => {
  const {
    data: books,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Title key="Home" title="উবায়দুল্লাহ তাসনিম" />
      <HeroSection />
      <BookShowcase
        books={books}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
      <ProfileSection />
      <Media />
      <EmailSubscribe />
    </div>
  );
};
