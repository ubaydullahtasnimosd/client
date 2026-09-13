import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiArrowRight, FiBookOpen, FiExternalLink, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Media } from "../component/layout/Media";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";

const authorBannerLight = "/author.webp";
const Logo = "/logo.webp";

const cx = (...classes) => classes.filter(Boolean).join(" ");

// Unified Section Shell matching Home.jsx with alternating white & #f5f5f5
const SectionShell = ({ children, className = "", id }) => (
  <section id={id} className={cx("py-14 sm:py-18 lg:py-22", className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  </section>
);

// Consistent Section Header matching Home.jsx
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
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif]">
      {title}
    </h2>
    <div
      className={cx(
        "mt-3 h-0.5 w-16 bg-[#E5A93C]",
        align === "center" && "mx-auto",
      )}
    />
    {subtitle && (
      <p className="mt-3.5 text-sm sm:text-base text-slate-600 ">
        {subtitle}
      </p>
    )}
  </div>
);

// Online book stores list
const bookStores = [
  {
    name: "রকমারি.কম",
    domain: "rokomari.com",
    href: "https://www.rokomari.com/book/author/78295/ubayodullah-tasnim",
    badge: "শীর্ষ অনলাইন শপ",
    description: "দেশজুড়ে ক্যাশ অন ডেলিভারিতে রকমারি থেকে সহজেই অর্ডার করুন।",
  },
  {
    name: "ওয়াফি লাইফ",
    domain: "wafilife.com",
    href: "https://www.wafilife.com/ramadan-package/dp/913631",
    badge: "ইসলামিক বই",
    description: "ইসলামিক ও মননশীল বইয়ের নির্ভরযোগ্য অনলাইন বুকস্টোর।",
  },
  {
    name: "কিতাবঘর",
    domain: "kitabghor.com",
    href: "https://www.kitabghor.com/products/details/aa998903558311efb60a2a6c60b8696b/fire-elo-ramadan.html",
    badge: "অনলাইন বুকস্টোর",
    description: "কিতাবঘর থেকে দ্রুত ডেলিভারিতে বই সংগ্রহ করতে পারেন।",
  },
  {
    name: "বইবাজার",
    domain: "boibazar.com",
    href: "https://www.boibazar.com/author-books/ubaidullah-tasnim",
    badge: "বইয়ের বিশাল সম্ভার",
    description: "বইবাজারের মাধ্যমে দেশের যেকোনো প্রান্ত থেকে অর্ডার করুন।",
  },
  {
    name: "নিয়ামাহ শপ",
    domain: "niyamahshop.com",
    href: "https://www.niyamahshop.com/book-author/উবায়দুল্লাহ-তাসনিম/",
    badge: "ইসলামিক লাইফস্টাইল",
    description: "নিয়ামাহ শপ থেকে সহজেই লেখকের বইগুলো সংগ্রহ করা যাবে।",
  },
  {
    name: "অফিসিয়াল বুক ক্যাটালগ",
    domain: "এই ওয়েবসাইটের বই তালিকা",
    href: "/books",
    isInternal: true,
    badge: "সম্পূর্ণ তালিকা",
    description: "লেখকের সকল প্রকাশিত বইয়ের বিবরণ, সূচিপত্র ও বিস্তারিত রিভিউ পড়ুন।",
  },
];

export const AboutAuthor = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["aboutAuthor"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/about_author/`);
      return response.data;
    },
    retry: 1,
  });

  const authorData = data && data.length > 0 ? data[0] : null;

  const authorName = authorData?.aboutAuthorName || "উবায়দুল্লাহ তাসনিম";
  const authorImg = authorData?.aboutAuthorImg || Logo;
  const authorDesc =
    authorData?.aboutAuthorDescription ||
    `সামান্য একজন লেখক। লেখালিখি পেশা নয়, জীবনের মূল স্বপ্ন ও সাধনা। লেখেন, লিখতে ভালোবাসেন। কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো এবং ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল দিয়ে। প্রতিটি লেখায় ফুটে ওঠে সমাজের প্রতি মমত্ববোধ ও মানবতার চিরন্তন বার্তা।\n\nইসলামি দর্শন, ঐতিহ্য, সমকালীন চিন্তাধারা ও মননশীল অনুবাদের মাধ্যমে পাঠকের হৃদয় স্পর্শ করাই তাঁর লেখার মূল উদ্দেশ্য। তাঁর লেখনীতে ফুটে ওঠে গভীর তত্ত্ব ও সহজবোধ্য উপস্থাপন শৈলী।`;

  return (
    <main className="w-full overflow-x-hidden min-h-screen">
      <Title key="AboutAuthor" title="লেখক পরিচিতি — উবায়দুল্লাহ তাসনিম" />

      {/* SECTION 1: HERO / BANNER & INTRODUCTION (bg-white) */}
      <SectionShell
        id="intro"
        className="bg-white  pt-10 sm:pt-14 lg:pt-18"
      >
        <SectionHeader
          badge="পরিচিতি"
          title="লেখক পরিচিতি"
          subtitle="লেখক, অনুবাদক ও শিক্ষক — জ্ঞান, সত্য ও কল্যাণের আলো ছড়িয়ে দেওয়ার নিরন্তর সাধনা"
          align="center"
        />

        {/* Decorative Arabesque Banner */}
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5A93C]/30 shadow-md bg-[#0c0e14]">
          <img
            src={authorBannerLight}
            alt="লেখক সম্পর্কে"
            className="w-full h-auto block object-cover min-h-[90px] sm:min-h-[120px] aspect-[1024/180] sm:aspect-[1024/140]"
            loading="eager"
          />
        </div>

        {/* Quick Section Anchors for Seamless UX */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="#biography"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-[#f5f5f5] px-4 py-1.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C]   "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
            জীবন ও কর্মপ্রয়াস
          </a>
          <a
            href="#purchase-sources"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-[#f5f5f5] px-4 py-1.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C]   "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
            বই সংগ্রহের স্থানসমূহ
          </a>
          <a
            href="#social-connect"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-[#f5f5f5] px-4 py-1.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C]   "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
            সোশ্যাল মিডিয়া
          </a>
        </div>
      </SectionShell>

      {/* SECTION 2: DETAILED BIOGRAPHY & LITERARY JOURNEY (bg-[#f5f5f5]) */}
      <SectionShell
        id="biography"
        className="bg-[#f5f5f5]  border-y border-stone-200/60 "
      >
        {isLoading ? (
          <div className="py-16 flex justify-center">
            <Loading />
          </div>
        ) : isError && !authorData ? (
          <div className="py-10 max-w-xl mx-auto">
            <ErrorMessage message={error?.message} onRetry={refetch} />
          </div>
        ) : (
          <div>
            <SectionHeader
              badge="জীবন ও সাধনা"
              title={authorName}
              subtitle="লেখক • অনুবাদক • শিক্ষক"
              align="left"
            />

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
              {/* Left Column: Avatar & Roles */}
              <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Author Avatar with Gold Ring & Halo */}
                <div className="relative group mx-auto lg:mx-0">
                  <div className="absolute -inset-1.5 rounded-full bg-[#E5A93C]/30 blur-md opacity-80 group-hover:opacity-100 transition duration-300" />
                  <img
                    src={authorImg}
                    alt={authorName}
                    className="relative h-48 w-48 sm:h-60 sm:w-60 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full object-cover border-2 border-[#E5A93C] shadow-xl bg-slate-950"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = Logo;
                    }}
                  />
                </div>

                {/* Roles Pills */}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
                  {["লেখক", "অনুবাদক", "শিক্ষক"].map((role) => (
                    <span
                      key={role}
                      className={cx(
                        "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium",
                        "bg-white text-slate-800 border border-slate-200 shadow-xs",
                        "  ",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C] mr-2" />
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Biography & Quotation */}
              <div className="w-full lg:w-8/12 text-left">
                {/* Main Biography Text */}
                <div className="prose prose-slate  max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-slate-700  text-justify whitespace-pre-line font-sans">
                    {authorDesc}
                  </p>
                </div>

                {/* Literary Philosophy & Quote Box */}
                <div className="mt-8 rounded-2xl border border-stone-200/80 border-l-4 border-l-[#E5A93C] bg-white   p-5 sm:p-7 shadow-xs">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl text-[#E5A93C] leading-none font-serif select-none">
                      “
                    </div>
                    <div className="flex-1">
                      <p className="text-base sm:text-lg italic text-slate-800  font-['Noto_Serif_Bengali',_serif] leading-relaxed sm:leading-8">
                        কলমের আঁচড়েই বলে যেতে চান স্বপ্ন ও সম্ভাবনার কথা, আলো এবং
                        ভালোর কথা। মানুষের মনের গহীনে আলো জ্বালাতে চান শব্দের মশাল
                        দিয়ে।
                      </p>
                      <p className="mt-3 text-xs sm:text-sm font-semibold text-[#E5A93C]">
                        — উবায়দুল্লাহ তাসনিম
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons matching Home Page */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
                  <Link
                    to="/books"
                    className="inline-flex items-center justify-center gap-2 rounded-none border border-[#E5A93C] bg-[#E5A93C] px-7 py-3 text-sm sm:text-base font-semibold text-stone-950 shadow-md transition-all duration-200 hover:bg-[#d6982b] hover:border-[#d6982b]"
                  >
                    <FiShoppingBag className="h-4 w-4" />
                    <span>বই ও প্রকাশনাসমূহ</span>
                  </Link>

                  <Link
                    to="/articles"
                    className="inline-flex items-center justify-center gap-2 rounded-none border border-stone-300 bg-white px-7 py-3 text-sm sm:text-base font-medium text-stone-900 shadow-xs transition-all duration-200 hover:border-[#E5A93C] hover:text-[#E5A93C]   "
                  >
                    <FiBookOpen className="h-4 w-4" />
                    <span>প্রবন্ধ-নিবন্ধ পড়ুন</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </SectionShell>

      {/* SECTION 3: WHERE TO BUY BOOKS (bg-white) */}
      <SectionShell id="purchase-sources" className="bg-white ">
        <SectionHeader
          badge="বই সংগ্রহ"
          title="কোথায় পাবেন উবায়দুল্লাহ তাসনিম এর বইসমূহ?"
          subtitle="দেশজুড়ে যেকোনো বইয়ের স্টোর ও শীর্ষস্থানীয় অনলাইন বুকশপগুলো থেকে ঘরে বসেই সংগ্রহ করুন"
          align="center"
        />

        {/* E-commerce Store Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bookStores.map((store) => {
            const isExternal = !store.isInternal;
            const CardComponent = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? {
                  href: store.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {
                  to: store.href,
                };

            return (
              <CardComponent
                key={store.name}
                {...linkProps}
                className={cx(
                  "group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200",
                  "border-stone-200/80 bg-[#fdfbf7] shadow-xs",
                  "hover:-translate-y-1 hover:border-[#E5A93C] hover:shadow-md",
                  " ",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]/40",
                )}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#E5A93C]/10 text-[#E5A93C] font-bold text-sm">
                      ৳
                    </div>
                    <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700  ">
                      {store.badge}
                    </span>
                  </div>

                  {/* Store Name & Domain */}
                  <h3 className="mt-4 text-lg font-bold text-stone-900  font-['Noto_Serif_Bengali',_serif] group-hover:text-[#E5A93C] transition-colors">
                    {store.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500  font-mono">
                    {store.domain}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600  leading-relaxed">
                    {store.description}
                  </p>
                </div>

                {/* Footer Action Link */}
                <div className="mt-5 pt-4 border-t border-stone-200/60  flex items-center justify-between text-xs sm:text-sm font-semibold text-[#E5A93C]">
                  <span>{isExternal ? "অনলাইনে অর্ডার করুন" : "ক্যাটালগ দেখুন"}</span>
                  {isExternal ? (
                    <FiExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  ) : (
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </div>
              </CardComponent>
            );
          })}
        </div>
      </SectionShell>

      {/* SECTION 4: SOCIAL MEDIA CONNECT (bg-[#f5f5f5]) */}
      <div id="social-connect">
        <Media className="bg-[#f5f5f5]  border-t border-stone-200/60 " />
      </div>
    </main>
  );
};
