import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiMessageSquare } from "react-icons/fi";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import { miscellaneousContentConfigs } from "../constants/miscellaneousContent.constants";
import { CommentModal } from "./CommentModal";
import { CommentsList } from "./CommentsList";
import { SocialMedia } from "../components/layout/SocialMedia";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const Logo = "/logo.webp";

// Unified Section Container matching Home.jsx
const SectionShell = ({ children, className = "", id }) => (
  <section id={id} className={cx("py-12 sm:py-16 lg:py-20", className)}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  </section>
);

export const MiscellaneousContentDetails = ({ category }) => {
  const config = miscellaneousContentConfigs[category] || {
    slug: category,
    title: "বিবিধ রচনা",
    description: "নির্বাচিত চিন্তাশীল লেখা ও পাঠসমূহ।",
    emptyMessage: "এখনও কোনো পাঠ প্রকাশ করা হয়নি।",
  };

  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: item, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["miscellaneous-content-item", category, id],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/miscellaneous/${config.slug}/${id}/`
      );
      return response.data;
    },
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", config.slug, id],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/comment/content/${config.slug}/${id}/comments/`
      );
      return response.data;
    },
  });

  const commentCount = Array.isArray(comments)
    ? comments.length
    : comments?.results?.length || 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1117] py-24">
        <Title title="বিস্তারিত তথ্য — উবায়দুল্লাহ তাসনিম" />
        <div className="max-w-xl mx-auto px-4">
          <Loading />
        </div>
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
      <Title title={`${item?.contentName || config.title} — উবায়দুল্লাহ তাসনিম`} />

      {/* SECTION: DETAILS WITH UNIFIED SECTION SHELL */}
      <SectionShell id={`miscellaneous-${config.slug}-detail`}>
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type={config.slug}
          object_id={id}
        />

        <div className="w-full">
          {/* Top Breadcrumb Navigation */}
          <nav
            className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400"
            aria-label="পেজের অবস্থান"
          >
            <Link
              to={`/miscellaneous/${config.slug}`}
              className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-[#E5A93C] dark:text-stone-300 dark:hover:text-[#E5A93C] transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>{config.title}</span>
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <span className="truncate max-w-[240px] sm:max-w-md font-semibold text-stone-900 dark:text-stone-100">
              {item?.contentName}
            </span>
          </nav>

          {/* Main Container Card */}
          <article className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xs dark:border-stone-800 dark:bg-slate-950 p-6 sm:p-8 lg:p-10">
            {/* Top Showcase: Image (Left) + Title & Metadata (Right) */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
              {/* Left Column: 100% Uncropped Image */}
              {item?.contentImg && (
                <div className="w-full sm:w-[340px] lg:w-[380px] xl:w-[420px] shrink-0 rounded-2xl overflow-hidden bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={item.contentImg}
                    alt={item.contentName}
                    className="w-full h-auto max-h-[460px] object-contain rounded-xl drop-shadow-md"
                    loading="eager"
                    onError={(event) => {
                      event.currentTarget.src = Logo;
                    }}
                  />
                </div>
              )}

              {/* Right Column: Title, Author, Date & Action Buttons */}
              <div className="flex-1 flex flex-col justify-start w-full">
                {/* Title with Noto Serif Bengali Typography */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif] leading-[1.28]">
                  {item?.contentName}
                </h1>

                {/* Gold Accent Divider Bar */}
                <div className="mt-4 h-0.5 w-16 bg-[#E5A93C]" />

                {/* Author & Publication Metadata */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-[#E5A93C] shadow-xs bg-slate-950"
                      src={Logo}
                      alt="উবায়দুল্লাহ তাসনিম"
                      loading="lazy"
                    />
                    <Link
                      to="/about"
                      className="font-semibold text-slate-800 hover:text-[#E5A93C] dark:text-slate-200 dark:hover:text-[#E5A93C] transition-colors"
                    >
                      {item?.contentAuthor || "উবায়দুল্লাহ তাসনিম"}
                    </Link>
                  </div>

                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="h-3.5 w-3.5 text-[#E5A93C]" />
                    <span>{Time(item?.contentCreateAt)}</span>
                  </span>

                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span className="inline-flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300">
                    <FiMessageSquare className="h-3.5 w-3.5 text-[#E5A93C]" />
                    <span>{commentCount} মন্তব্য</span>
                  </span>
                </div>

                {/* Action Bar */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E5A93C] px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-stone-950 shadow-md transition-all duration-200 hover:bg-[#d6982b] hover:shadow-lg cursor-pointer"
                  >
                    <FiMessageSquare className="h-4 w-4" />
                    <span>মন্তব্য করুন</span>
                  </button>

                  <SocialMedia title={item?.contentName || config.title} />

                  <Link
                    to={`/miscellaneous/${config.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 sm:py-3 text-sm font-medium text-stone-800 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C] dark:border-stone-700 dark:bg-slate-900 dark:text-stone-200"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    <span>সকল লেখাসমূহ</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 sm:mt-10 h-px w-full bg-stone-100 dark:bg-stone-800/80" />

            {/* Body Text Content */}
            <div className="mt-8 whitespace-pre-line break-words text-justify text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-9 text-base sm:text-lg font-sans">
              {item?.contentDescription}
            </div>
          </article>

          {/* Comments Section Card matching Site Consistency */}
          <div className="mt-10 sm:mt-14">
            <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-stone-800 dark:bg-slate-950">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-['Noto_Serif_Bengali',_serif] flex items-center gap-2">
                <span>মন্তব্যসমূহ</span>
                <span className="text-sm font-normal text-[#E5A93C]">
                  ({commentCount})
                </span>
              </h2>
              <div className="mt-3 h-0.5 w-12 bg-[#E5A93C]" />

              <div className="mt-6 sm:mt-8">
                <CommentsList content_type={config.slug} object_id={id} />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
};

export default MiscellaneousContentDetails;
