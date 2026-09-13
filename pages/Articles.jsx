import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { FiArrowRight, FiRotateCcw, FiSearch } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Pagination } from "../component/layout/Pagination";
import { baseUrl } from "../constants/env.constants";
import { shortFormatDate } from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const Logo = "/logo.webp";
const cx = (...classes) => classes.filter(Boolean).join(" ");

// Unified Section Container with strictly White & #f5f5f5 backgrounds matching Home.jsx
const SectionShell = ({ children, className = "", id }) => (
  <section id={id} className={cx("py-16 sm:py-20 lg:py-24", className)}>
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
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif]">
      {title}
    </h1>
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

export const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // "latest", "oldest", "title"

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["articles"],
    enabled: !selectedCategory,
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/articles_essays/`);
      return response.data;
    },
  });

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    if (!data) return [];
    let list = [...data];

    // Live search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (article) =>
          article.articlesEssaysName?.toLowerCase().includes(q) ||
          article.articlesEssaysDescription?.toLowerCase().includes(q) ||
          article.articlesEssaysAuthor?.toLowerCase().includes(q),
      );
    }

    // Sort filter
    if (sortBy === "latest") {
      list.sort((a, b) => new Date(b.articlesEssaysCreateAt || 0) - new Date(a.articlesEssaysCreateAt || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.articlesEssaysCreateAt || 0) - new Date(b.articlesEssaysCreateAt || 0));
    } else if (sortBy === "title") {
      list.sort((a, b) => (a.articlesEssaysName || "").localeCompare(b.articlesEssaysName || "", "bn"));
    }

    return list;
  }, [data, searchQuery, sortBy]);

  // Paginated articles for current page (9 items per page)
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  const isFiltering = searchQuery.trim().length > 0 || sortBy !== "latest";

  const setCurrentPage = (page) => {
    if (currentPage === page) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (page <= 1) {
          next.delete("page");
        } else {
          next.set("page", page.toString());
        }
        return next;
      },
      { replace: true },
    );
  };

  const handleReset = () => {
    setSearchQuery("");
    setSortBy("latest");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", page.toString());
      return next;
    });
    const el = document.getElementById("articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f5f5]  py-24 flex justify-center items-center">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#f5f5f5]  py-24">
        <div className="max-w-xl mx-auto px-4">
          <ErrorMessage message={error?.message} onRetry={refetch} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]  text-slate-900  overflow-x-hidden">
      <Title title="লেখা ও প্রবন্ধ — উবায়দুল্লাহ তাসনিম" />

      {/* SECTION: ARTICLES LISTING WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id="articles" className="bg-[#f5f5f5] ">
        <SectionHeader
          badge="প্রবন্ধ-নিবন্ধ"
          title="আমার লেখা ও প্রবন্ধসমূহ"
          subtitle="এখানে নিয়মিত নতুন লেখা যুক্ত হয়। আপনার পছন্দের লেখাটি বেছে নিয়ে পুরোটা পড়ুন।"
          align="center"
        />

        {/* FILTERING & SEARCH CONTROLS BAR */}
        <div className="mb-8 sm:mb-12  border border-stone-200/80 bg-white p-4 sm:p-5 shadow-xs  ">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="প্রবন্ধের শিরোনাম, বিষয় বা বিবরণ দিয়ে খুঁজুন..."
                className={cx(
                  "h-11 w-full  border pl-10 pr-4 text-xs sm:text-sm shadow-xs transition",
                  "border-stone-200 bg-stone-50/50 text-stone-900 placeholder:text-stone-400",
                  "focus:border-[#E5A93C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30",
                  "   ",
                )}
              />
            </div>

            {/* Sort Dropdown & Reset */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 ">
                <span className="hidden sm:inline">সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={cx(
                    "h-11  border px-3 text-xs sm:text-sm font-medium shadow-xs transition cursor-pointer",
                    "border-stone-200 bg-stone-50/50 text-stone-800",
                    "focus:border-[#E5A93C] focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30",
                    "  ",
                  )}
                >
                  <option value="latest">সর্বশেষ প্রকাশিত</option>
                  <option value="oldest">পুরাতন থেকে নতুন</option>
                  <option value="title">শিরোনাম অনুসারে (ক-হ)</option>
                </select>
              </div>

              {isFiltering && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-11 items-center gap-1.5  border border-stone-200 bg-stone-100 px-3.5 text-xs sm:text-sm font-medium text-stone-700 transition hover:border-[#E5A93C] hover:text-[#E5A93C]    cursor-pointer"
                  title="ফিল্টার রিসেট করুন"
                >
                  <FiRotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">রিসেট</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-3 flex items-center justify-between text-xs text-stone-500  pt-3 border-t border-stone-100 ">
            <span>
              মোট <strong className="font-semibold text-stone-800 ">{filteredArticles.length}</strong> টি প্রবন্ধ
              {filteredArticles.length >= 10 && (
                <span className="text-[#E5A93C] font-medium ml-1.5">
                  (পৃষ্ঠা {currentPage} / {Math.ceil(filteredArticles.length / PAGE_SIZE)})
                </span>
              )}
              {data?.length && filteredArticles.length !== data.length ? ` • সর্বমোট ${data.length} টির মধ্যে` : ""}
            </span>

            {searchQuery && (
              <span className="text-[#E5A93C] truncate max-w-[200px] sm:max-w-xs">
                অনুসন্ধান: "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {/* ARTICLES GRID OR EMPTY STATE */}
        {selectedCategory || !filteredArticles.length ? (
          <div className="mt-8  border border-stone-200/80 bg-white p-10 text-center shadow-xs  ">
            <p className="text-base text-stone-600 ">
              {searchQuery ? `"${searchQuery}" দিয়ে কোনো প্রবন্ধ খুঁজে পাওয়া যায়নি।` : "এখনও কোনো প্রবন্ধ প্রকাশ করা হয়নি।"}
            </p>
            {isFiltering && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 inline-flex items-center gap-1.5  bg-[#E5A93C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 shadow-xs hover:bg-[#d6982b] transition cursor-pointer"
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>সকল ফিল্টার রিসেট করুন</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginatedArticles.map((article) => (
                <article
                  key={article.id}
                  className={cx(
                    "group flex flex-col overflow-hidden  border",
                    "border-stone-200/80 bg-white shadow-xs transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                    " ",
                  )}
                >
                  {/* Full Cover Image - Unobstructed, clear and fully edge-to-edge */}
                  <Link
                    to={`/articles/${article.id}`}
                    className="relative block w-full aspect-[16/9] overflow-hidden bg-stone-100  border-b border-stone-200/60 "
                    aria-label={`${article.articlesEssaysName} পড়ুন`}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      src={article.articlesEssaysImg || Logo}
                      alt={article.articlesEssaysName}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = Logo;
                      }}
                    />
                  </Link>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Title */}
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-lg sm:text-xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif] line-clamp-2 leading-snug group-hover:text-[#E5A93C] transition-colors"
                    >
                      {article.articlesEssaysName}
                    </Link>

                    {/* Metadata */}
                    <p className="mt-2 text-xs sm:text-sm text-stone-500  flex items-center gap-1.5">
                      <span className="font-medium text-stone-700 ">
                        {article.articlesEssaysAuthor || "উবায়দুল্লাহ তাসনিম"}
                      </span>
                      <span>•</span>
                      <span>{shortFormatDate(article.articlesEssaysCreateAt)}</span>
                    </p>

                    {/* Excerpt */}
                    <div className="mt-3 text-sm leading-relaxed text-slate-600  whitespace-pre-line break-words text-justify line-clamp-3">
                      {article.articlesEssaysDescription}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto pt-5">
                      <Link
                        to={`/articles/${article.id}`}
                        className="inline-flex w-full items-center justify-center gap-2  bg-[#E5A93C] px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-xs transition-all duration-200 hover:bg-[#d6982b] hover:shadow-md cursor-pointer"
                      >
                        <span>পুরোটা পড়ুন</span>
                        <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination aligned to the right side (automatically disabled/hidden if <= 9 items) */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredArticles.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </SectionShell>
    </main>
  );
};
