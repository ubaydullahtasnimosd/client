import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImg from "/logo2.jpg";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const islamLinks = [
  {
    label: "কুরআন থেকে জীবনের পাঠ",
    path: "/islam/quran-life-lessons",
  },
  {
    label: "হাদিস থেকে জীবনের পাঠ",
    path: "/islam/hadith-life-lessons",
  },
  {
    label: "জীবন থেকে নেওয়া শিক্ষা",
    path: "/islam/life-lessons",
  },
];

const exploreLinks = [
  { label: "প্রবন্ধ-নিবন্ধ", path: "/articles" },
  { label: "বই পরিচিতি", path: "/books" },
  { label: "কালচার ও সংস্কৃতি", path: "/miscellaneous/culture" },
  { label: "ভ্রমণ", path: "/miscellaneous/travel" },
  { label: "ইতিহাস", path: "/miscellaneous/history" },
  { label: "বিশ্ব-দর্শন", path: "/miscellaneous/worldview" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100094697794310",
    icon: <FaFacebookF className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ubaydullahtasnim",
    icon: <FaInstagram className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: "Telegram",
    href: "https://t.me/ubaydullahtasnim",
    icon: <FaTelegramPlane className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Ubaydullah12",
    icon: <FaYoutube className="h-4 w-4" aria-hidden="true" />,
  },
];

const FooterLink = ({ path, children }) => (
  <li>
    <Link
      to={path}
      className={cx(
        "inline-flex py-1 text-sm leading-6 transition-colors",
        "text-slate-600 hover:text-emerald-700",
        "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
        "dark:text-slate-400 dark:hover:text-emerald-300"
      )}
    >
      {children}
    </Link>
  </li>
);

export const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 500);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={cx(
        "relative border-t",
        "border-slate-200 bg-white",
        "dark:border-slate-800 dark:bg-slate-950"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5 lg:pr-12">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              aria-label="উবায়দুল্লাহ তাসনিম হোম"
            >
              <img
                src={logoImg}
                alt="উবায়দুল্লাহ তাসনিম"
                className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-900/10 dark:ring-white/10"
                loading="lazy"
              />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                উবায়দুল্লাহ তাসনিম
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              ইসলাম, জীবন, ইতিহাস, সংস্কৃতি ও সমকালীন বিশ্ব নিয়ে চিন্তাশীল
              লেখা, পাঠ এবং বই পরিচিতির একটি ব্যক্তিগত জ্ঞানভিত্তিক আয়োজন।
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="সামাজিক যোগাযোগমাধ্যম">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}-এ উবায়দুল্লাহ তাসনিম`}
                  title={label}
                  className={cx(
                    "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition",
                    "border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
                    "dark:border-slate-800 dark:text-slate-400 dark:hover:border-emerald-800 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                  )}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              ইসলামী জীবনপাঠ
            </h2>
            <ul className="mt-4 space-y-1">
              {islamLinks.map((item) => (
                <FooterLink key={item.path} path={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              ঘুরে দেখুন
            </h2>
            <ul className="mt-4 space-y-1">
              {exploreLinks.slice(0, 3).map((item) => (
                <FooterLink key={item.path} path={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              আরও বিষয়
            </h2>
            <ul className="mt-4 space-y-1">
              {exploreLinks.slice(3).map((item) => (
                <FooterLink key={item.path} path={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} উবায়দুল্লাহ তাসনিম। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center justify-center gap-4 sm:justify-end">
            <Link
              to="/about"
              className="text-xs text-slate-500 transition hover:text-emerald-700 dark:text-slate-500 dark:hover:text-emerald-300"
            >
              পরিচয়
            </Link>
            <Link
              to="/UserReview"
              className="text-xs text-slate-500 transition hover:text-emerald-700 dark:text-slate-500 dark:hover:text-emerald-300"
            >
              পাঠক রিভিউ
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="পাতার শুরুতে ফিরুন"
        title="পাতার শুরুতে ফিরুন"
        className={cx(
          "fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full",
          "bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10",
          "transition duration-200 hover:-translate-y-0.5 hover:text-emerald-700 hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
          "dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10 dark:hover:text-emerald-300",
          showScrollButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <FaArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
    </footer>
  );
};
