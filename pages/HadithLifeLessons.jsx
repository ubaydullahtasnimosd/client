import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Pagination } from "../component/layout/Pagination";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const Logo = "/logo.webp";

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

export const HadithLifeLessons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["hadith-life-lessons"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/hadith_life_lessons/`);
      return response.data;
    },
  });

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return data.slice(startIndex, startIndex + PAGE_SIZE);
  }, [data, currentPage]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] py-24 flex justify-center items-center">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] py-24">
        <div className="max-w-xl mx-auto px-4">
          <ErrorMessage message={error?.message} onRetry={refetch} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <Title title="হাদিস থেকে জীবনের পাঠ — মাওলানা উবায়দুল্লাহ তাসনিম" />

      {/* SECTION: HADITH LIFE LESSONS WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id="hadith-lessons" className="bg-[#f5f5f5] dark:bg-[#0f1117]">
        <SectionHeader
          badge="হাদিসের আলো"
          title="হাদিস থেকে জীবনের পাঠ"
          subtitle="প্রিয় নবী রাসুলুল্লাহ (সা.)-এর পবিত্র হাদিস থেকে দৈনন্দিন জীবন, আচরণ ও আত্মশুদ্ধির অমূল্য নির্দেশনা।"
          align="center"
        />

        {!data?.length ? (
          <div className="rounded-3xl border border-stone-200/80 bg-white p-10 text-center shadow-xs dark:border-stone-800 dark:bg-slate-950">
            <EmptyState message="এখনও কোনো হাদিসের পাঠ প্রকাশ করা হয়নি।" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((lesson) => (
                <article
                  key={lesson.id}
                  className={cx(
                    "group flex flex-col overflow-hidden rounded-3xl border transition-all duration-300",
                    "border-stone-200/80 bg-white shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                    "dark:border-stone-800 dark:bg-slate-950",
                  )}
                >
                  {/* Card Image */}
                  <Link
                    to={`/islam/hadith-life-lessons/${lesson.id}`}
                    className="relative block w-full aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-200/60 dark:border-stone-800"
                    aria-label={`${lesson.hadithLessonName} পড়ুন`}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      src={lesson.hadithLessonImg || Logo}
                      alt={lesson.hadithLessonName}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = Logo;
                      }}
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Link
                      to={`/islam/hadith-life-lessons/${lesson.id}`}
                      className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif] line-clamp-2 leading-snug group-hover:text-[#E5A93C] transition-colors"
                    >
                      {lesson.hadithLessonName}
                    </Link>

                    {/* Metadata Row */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {lesson.hadithLessonAuthor || "মাওলানা উবায়দুল্লাহ তাসনিম"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="h-3 w-3 text-[#E5A93C]" />
                        <span>{Time(lesson.hadithLessonCreateAt)}</span>
                      </span>
                    </div>

                    {/* Description Excerpt */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify line-clamp-3">
                      {lesson.hadithLessonDescription}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-auto pt-6">
                      <Link
                        to={`/islam/hadith-life-lessons/${lesson.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E5A93C] px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-xs transition-all duration-200 hover:bg-[#d6982b] hover:shadow-md cursor-pointer"
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
              totalItems={data.length}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => {
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set("page", page.toString());
                  return next;
                });
                const el = document.getElementById("hadith-lessons");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </>
        )}
      </SectionShell>
    </main>
  );
};

export default HadithLifeLessons;
