import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { FiCalendar } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Pagination } from "../component/layout/Pagination";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const API_BASE_URL = `${baseUrl}/readers_love`;

const fetchReviews = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/readers/`);
  return data;
};

// Unified Section Container matching Home.jsx with strictly White & #f5f5f5 backgrounds
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
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif]">
      {title}
    </h1>
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

export const UserReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["readerReviews"],
    queryFn: fetchReviews,
  });

  const paginatedReviews = useMemo(() => {
    if (!reviews) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return reviews.slice(startIndex, startIndex + PAGE_SIZE);
  }, [reviews, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", page.toString());
      return next;
    });
    const el = document.getElementById("reviews");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <Title title="পাঠক রিভিউ ও প্রতিক্রিয়া — উবায়দুল্লাহ তাসনিম" />

      {/* SECTION: USER REVIEWS WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id="reviews" className="bg-[#f5f5f5] dark:bg-[#0f1117]">
        <SectionHeader
          badge="পাঠক মতামত"
          title="পাঠক রিভিউ ও প্রতিক্রিয়া"
          subtitle="উবায়দুল্লাহ তাসনিম এর বই ও লেখা নিয়ে প্রিয় পাঠকদের আন্তরিক প্রতিক্রিয়া, গঠনমূলক পর্যালোচনা ও অনুভূতি।"
          align="center"
        />

        {/* REVIEWS CONTENT */}
        <div>
          {reviewsLoading ? (
            <div className="py-16 flex justify-center">
              <Loading />
            </div>
          ) : reviewsError ? (
            <div className="py-8 max-w-xl mx-auto">
              <ErrorMessage message={reviewsError.message} onRetry={refetchReviews} />
            </div>
          ) : !reviews?.length ? (
            <div className="rounded-3xl border border-stone-200/80 bg-white p-10 text-center shadow-xs dark:border-stone-800 dark:bg-slate-950">
              <EmptyState message="এখনও কোনো পাঠক রিভিউ প্রকাশ করা হয়নি।" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full">
                {paginatedReviews.map((review) => (
                  <article
                    key={review.id}
                    className={cx(
                      "rounded-3xl border p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between",
                      "border-stone-200/80 bg-white shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                      "dark:border-stone-800 dark:bg-slate-950",
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800/80">
                        <div className="flex items-center gap-3">
                          {/* Avatar initial badge */}
                          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E5A93C]/15 text-[#E5A93C] font-bold text-base flex items-center justify-center border border-[#E5A93C]/30 shrink-0">
                            {review.readersName ? review.readersName.charAt(0) : "পা"}
                          </div>

                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif]">
                              {review.readersName}
                            </h3>
                            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                              <FiCalendar className="h-3 w-3 text-[#E5A93C]" />
                              <span>{Time(review.readersReviewCreated)}</span>
                            </p>
                          </div>
                        </div>

                        {/* Book Tag */}
                        {review.readersBookName && (
                          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200/70 dark:bg-slate-900 dark:text-stone-200 dark:border-stone-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
                            <span>{review.readersBookName}</span>
                          </div>
                        )}
                      </div>

                      {/* Review Text Body */}
                      <div className="mt-5">
                        <p className="text-base sm:text-lg leading-relaxed sm:leading-8 text-slate-700 dark:text-slate-300 text-justify font-sans whitespace-pre-line">
                          {review.readersReview}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination aligned to the right side (automatically disabled/hidden if <= 9 items) */}
              <Pagination
                currentPage={currentPage}
                totalItems={reviews.length}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </SectionShell>
    </main>
  );
};

export default UserReview;
