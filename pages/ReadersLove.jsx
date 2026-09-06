import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { FiCalendar, FiHeart } from "react-icons/fi";
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

const fetchReviewImages = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/image/`);
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

export const ReadersLove = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const {
    data: images,
    isLoading: imagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ["reviewImages"],
    queryFn: fetchReviewImages,
  });

  const paginatedImages = useMemo(() => {
    if (!images) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return images.slice(startIndex, startIndex + PAGE_SIZE);
  }, [images, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", page.toString());
      return next;
    });
    const el = document.getElementById("readers-love");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <Title title="পাঠকের ভালোবাসা — মাওলানা উবায়দুল্লাহ তাসনিম" />

      {/* SECTION: READERS LOVE WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id="readers-love" className="bg-[#f5f5f5] dark:bg-[#0f1117]">
        <SectionHeader
          badge="ভালোবাসার মুহূর্ত"
          title="পাঠকের ভালোবাসা"
          subtitle="উবায়দুল্লাহ তাসনিম এর বই ও প্রকাশনা নিয়ে প্রিয় পাঠকদের ভালোবাসাপূর্ণ মুহূর্ত ও চিত্রসংগ্রহ।"
          align="center"
        />

        {/* IMAGES GRID */}
        <div>
          {imagesLoading ? (
            <div className="py-16 flex justify-center">
              <Loading />
            </div>
          ) : imagesError ? (
            <div className="py-8 max-w-xl mx-auto">
              <ErrorMessage message={imagesError.message} onRetry={refetchImages} />
            </div>
          ) : !images?.length ? (
            <div className="rounded-3xl border border-stone-200/80 bg-white p-10 text-center shadow-xs dark:border-stone-800 dark:bg-slate-950">
              <EmptyState message="এখনও কোনো পাঠকের ভালোবাসা সংক্রান্ত ছবি প্রকাশ করা হয়নি।" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
                {paginatedImages.map((image) => (
                  <article
                    key={image.id}
                    className={cx(
                      "group rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col",
                      "border-stone-200/80 bg-white shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                      "dark:border-stone-800 dark:bg-slate-950",
                    )}
                  >
                    {/* Uncropped, clear photo */}
                    <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-900 overflow-hidden border-b border-stone-200/60 dark:border-stone-800">
                      <img
                        src={image.readersBookImg}
                        alt="পাঠকের ভালোবাসা"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                        }}
                      />
                    </div>

                    <div className="p-3.5 sm:p-4 mt-auto flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="h-3.5 w-3.5 text-[#E5A93C]" />
                        <span>{Time(image.readersReviewCreated)}</span>
                      </span>

                      <FiHeart className="h-3.5 w-3.5 text-rose-500" />
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination aligned to the right side (automatically disabled/hidden if <= 9 items) */}
              <Pagination
                currentPage={currentPage}
                totalItems={images.length}
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

export default ReadersLove;
