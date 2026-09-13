import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { FiClock, FiVideo } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { Pagination } from "../component/layout/Pagination";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");

// Unified Section Container matching Home.jsx with White & #f5f5f5 backgrounds
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

export const Miscellaneous = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? pageParam : 1;
  const PAGE_SIZE = 9;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["miscellaneous"],
    enabled: !selectedCategory,
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/miscellaneous/`);
      return response.data;
    },
  });

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return data.slice(startIndex, startIndex + PAGE_SIZE);
  }, [data, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", page.toString());
      return next;
    });
    const el = document.getElementById("videos");
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
      <Title title="ভিডিও গ্যালারি — উবায়দুল্লাহ তাসনিম" />

      {/* SECTION: VIDEO GALLERY WITH UNIFIED SECTION SHELL & HEADER */}
      <SectionShell id="videos" className="bg-[#f5f5f5] ">
        <SectionHeader
          badge="ভিডিও গ্যালারি"
          title="জীবন ও জগৎ — ভিডিওসমূহ"
          subtitle="বিভিন্ন বিষয়ের নির্বাচিত ও শিক্ষণীয় ভিডিও লেকচারগুলো এখানে পাবেন।"
          align="center"
        />

        {selectedCategory || !data?.length ? (
          <div className="mt-8">
            <EmptyState />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {paginatedData.map((item, index) => {
                const clean = (item.misecllaneousVideo || "").split("?")[0].toLowerCase();
                const isDirect =
                  clean.endsWith(".mp4") ||
                  clean.endsWith(".webm") ||
                  clean.endsWith(".mov") ||
                  clean.endsWith(".mkv") ||
                  clean.includes("supabase.co/storage");

                return (
                  <article
                    key={item._id || item.id || index}
                    className={cx(
                      "group flex flex-col overflow-hidden  border",
                      "border-stone-200/80 bg-white shadow-xs transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-md hover:border-[#E5A93C]/60",
                      " ",
                    )}
                  >
                    {/* Video Player Container - 16:9 Aspect Ratio Edge-to-Edge */}
                    <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-stone-200/60 ">
                      {isDirect ? (
                        <video
                          src={item.misecllaneousVideo}
                          title={item.misecllaneousTitle}
                          controls
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-contain bg-black"
                        />
                      ) : (
                        <iframe
                          src={item.misecllaneousVideo}
                          title={item.misecllaneousTitle}
                          className="h-full w-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6 flex flex-1 flex-col justify-between">
                      <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif] leading-snug group-hover:text-[#E5A93C] transition-colors line-clamp-2">
                        {item.misecllaneousTitle}
                      </h2>

                      <div className="mt-4 pt-3 border-t border-stone-100  flex items-center justify-between text-xs sm:text-sm text-stone-500 ">
                        <div className="flex items-center gap-1.5">
                          <FiClock className="h-3.5 w-3.5 text-[#E5A93C]" />
                          <span>আপলোড: {Time(item.misecllaneousCreateAt)}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[#E5A93C] font-medium text-xs">
                          <FiVideo className="h-3.5 w-3.5" />
                          <span>ভিডিও</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination aligned to the right side (automatically disabled/hidden if <= 9 items) */}
            <Pagination
              currentPage={currentPage}
              totalItems={data.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </SectionShell>
    </main>
  );
};
