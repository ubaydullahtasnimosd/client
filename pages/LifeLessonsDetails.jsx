import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FiArrowLeft, FiCalendar, FiMessageSquare } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { SocialMedia } from "../components/layout/SocialMedia";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import { CommentModal } from "./CommentModal";
import { CommentsList } from "./CommentsList";

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

export const LifeLessonsDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lesson, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["life-lesson", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/life_lessons/${id}/`);
      return response.data;
    },
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", "life_lessons", id],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/comment/content/life_lessons/${id}/comments/`
      );
      return response.data;
    },
  });

  const commentCount = Array.isArray(comments)
    ? comments.length
    : comments?.results?.length || 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f5f5]  py-24">
        <Title title="বিস্তারিত তথ্য — উবায়দুল্লাহ তাসনিম" />
        <div className="max-w-xl mx-auto px-4">
          <Loading />
        </div>
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
      <Title title={`${lesson?.lifeLessonName || "জীবন থেকে নেওয়া শিক্ষা"} — উবায়দুল্লাহ তাসনিম`} />

      {/* SECTION: DETAILS WITH UNIFIED SECTION SHELL */}
      <SectionShell id="life-lesson-detail">
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type="life_lessons"
          object_id={id}
        />

        <div className="w-full">
          {/* Top Breadcrumb Navigation */}
          <nav
            className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 "
            aria-label="পেজের অবস্থান"
          >
            <Link
              to="/islam/life-lessons"
              className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-[#E5A93C]   transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>জীবন থেকে নেওয়া শিক্ষা</span>
            </Link>
            <span className="text-stone-300 ">/</span>
            <span className="truncate max-w-[240px] sm:max-w-md font-semibold text-stone-900 ">
              {lesson?.lifeLessonName}
            </span>
          </nav>

          {/* Main Container Card */}
          <article className="overflow-hidden  border border-stone-200/80 bg-white shadow-xs   p-6 sm:p-8 lg:p-10">
            {/* Top Showcase: Image (Left) + Title & Metadata (Right) */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
              {/* Left Column: 100% Uncropped Image */}
              {lesson?.lifeLessonImg && (
                <div className="w-full sm:w-[340px] lg:w-[380px] xl:w-[420px] shrink-0  overflow-hidden bg-stone-50  border border-stone-200/80  shadow-sm flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={lesson.lifeLessonImg}
                    alt={lesson.lifeLessonName}
                    className="w-full h-auto max-h-[460px] object-contain  drop-shadow-md"
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900  font-['Noto_Serif_Bengali',_serif] leading-[1.28]">
                  {lesson?.lifeLessonName}
                </h1>

                {/* Gold Accent Divider Bar */}
                <div className="mt-4 h-0.5 w-16 bg-[#E5A93C]" />

                {/* Author & Publication Metadata */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-600 ">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8  object-cover border-2 border-[#E5A93C] shadow-xs bg-slate-950"
                      src={Logo}
                      alt="উবায়দুল্লাহ তাসনিম"
                      loading="lazy"
                    />
                    <Link
                      to="/about"
                      className="font-semibold text-slate-800 hover:text-[#E5A93C]   transition-colors"
                    >
                      {lesson?.lifeLessonAuthor || "উবায়দুল্লাহ তাসনিম"}
                    </Link>
                  </div>

                  <span className="text-stone-300 ">•</span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="h-3.5 w-3.5 text-[#E5A93C]" />
                    <span>{Time(lesson?.lifeLessonCreateAt)}</span>
                  </span>

                  <span className="text-stone-300 ">•</span>
                  <span className="inline-flex items-center gap-1 font-medium text-stone-700 ">
                    <FiMessageSquare className="h-3.5 w-3.5 text-[#E5A93C]" />
                    <span>{commentCount} মন্তব্য</span>
                  </span>
                </div>

                {/* Action Bar */}
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                    className="inline-flex items-center justify-center gap-2  bg-[#E5A93C] px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-stone-950 shadow-md transition-all duration-200 hover:bg-[#d6982b] hover:shadow-lg cursor-pointer"
                  >
                    <FiMessageSquare className="h-4 w-4" />
                    <span>মন্তব্য করুন</span>
                  </button>

                  <SocialMedia title={lesson?.lifeLessonName} />

                  <Link
                    to="/islam/life-lessons"
                    className="inline-flex items-center justify-center gap-2  border border-stone-300 bg-white px-5 py-2.5 sm:py-3 text-sm font-medium text-stone-800 shadow-xs transition hover:border-[#E5A93C] hover:text-[#E5A93C]   "
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    <span>সকল পাঠসমূহ</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 sm:mt-10 h-px w-full bg-stone-100 " />

            {/* Body Text Content */}
            <div className="mt-8 whitespace-pre-line break-words text-justify text-slate-700  leading-relaxed sm:leading-9 text-base sm:text-lg font-['Noto_Serif_Bengali',_serif]">
              {lesson?.lifeLessonDescription}
            </div>
          </article>

          {/* Comments Section Card matching Site Consistency */}
          <div className="mt-10 sm:mt-14">
            <div className=" border border-stone-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs  ">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900  font-['Noto_Serif_Bengali',_serif] flex items-center gap-2">
                <span>মন্তব্যসমূহ</span>
                <span className="text-sm font-normal text-[#E5A93C]">
                  ({commentCount})
                </span>
              </h2>
              <div className="mt-3 h-0.5 w-12 bg-[#E5A93C]" />

              <div className="mt-6 sm:mt-8">
                <CommentsList content_type="life_lessons" object_id={id} />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
};

export default LifeLessonsDetails;
