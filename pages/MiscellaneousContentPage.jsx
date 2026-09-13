import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Pagination } from "../component/layout/Pagination";
import { baseUrl } from "../constants/env.constants";
import { miscellaneousContentConfigs } from "../constants/miscellaneousContent.constants";
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

export const MiscellaneousContentPage = ({ category }) => {
  const config = miscellaneousContentConfigs[category] || {
    slug: category,
    title: "বিবিধ রচনা",
    description: "নির্বাচিত চিন্তাশীল লেখা ও পাঠসমূহ।",
    emptyMessage: "এখনও কোনো পাঠ প্রকাশ করা হয়নি।",
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["miscellaneous-content", category],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/miscellaneous/${config.slug}/`
      );
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
      <Title title={`${config.title} — উবায়দুল্লাহ তাসনিম`} />

      {/* SECTION: MISCELLANEOUS CONTENT WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id={`miscellaneous-${config.slug}`} className="bg-[#f5f5f5] ">
        <SectionHeader
          badge="জীবন ও চিন্তাজগৎ"
          title={config.title}
          subtitle={config.description}
          align="center"
        />

        {!data?.length ? (
          <div className="rounded-3xl border border-stone-200/80 bg-white p-10 text-center shadow-xs  ">
            <EmptyState message={config.emptyMessage} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedData.map((item) => (
                <article
                  key={item.id}
                  className={cx(
                    "group flex flex-col overflow-hidden rounded-3xl border transition-all duration-300",
                    "border-stone-200/80 bg-white shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                    " ",
                  )}
                >
                  {/* Card Image */}
                  <Link
                    to={`/miscellaneous/${config.slug}/${item.id}`}
                    className="relative block w-full aspect-[16/10] overflow-hidden bg-stone-100  border-b border-stone-200/60 "
                    aria-label={`${item.contentName} পড়ুন`}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      src={item.contentImg || Logo}
                      alt={item.contentName}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = Logo;
                      }}
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Link
                      to={`/miscellaneous/${config.slug}/${item.id}`}
                      className="text-lg sm:text-xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif] line-clamp-2 leading-snug group-hover:text-[#E5A93C] transition-colors"
                    >
                      {item.contentName}
                    </Link>

                    {/* Metadata Row */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-500 ">
                      <span className="font-medium text-stone-700 ">
                        {item.contentAuthor || "উবায়দুল্লাহ তাসনিম"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="h-3 w-3 text-[#E5A93C]" />
                        <span>{Time(item.contentCreateAt)}</span>
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 ">
                      {item.contentDescription}
                    </p>

                    {/* Card Action Button */}
                    <div className="mt-auto pt-5">
                      <Link
                        to={`/miscellaneous/${config.slug}/${item.id}`}
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
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </SectionShell>
    </main>
  );
};

export default MiscellaneousContentPage;
