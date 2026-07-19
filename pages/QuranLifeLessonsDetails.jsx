import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import { CommentModal } from "../pages/CommentModal";
import { CommentsList } from "../pages/CommentsList";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const QuranLifeLessonsDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lesson, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["quran-life-lesson", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/quran_life_lessons/${id}`);
      return response.data;
    },
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", "quran_life_lessons", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseUrl}/comment/content/quran_life_lessons/${id}/comments/`
      );
      return data;
    },
  });

  const commentCount = comments.length;

  const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
    "bg-slate-900 text-white hover:bg-slate-800",
    "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:pointer-events-none disabled:opacity-60"
  );

  const linkBase = cx(
    "underline underline-offset-4 transition-colors",
    "text-emerald-700 hover:text-emerald-800",
    "dark:text-emerald-400 dark:hover:text-emerald-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded"
  );

  if (isLoading) {
    return (
      <main className="py-10 md:py-14 min-h-screen bg-slate-50/60 dark:bg-slate-950">
        <Title title="বিস্তারিত তথ্য" />
        <div className={container}>
          <Loading />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="py-10 md:py-14 min-h-screen bg-slate-50/60 dark:bg-slate-950">
        <Title title="বিস্তারিত তথ্য" />
        <div className={container}>
          <ErrorMessage message={error?.message} onRetry={refetch} />
        </div>
      </main>
    );
  }

  return (
    <main
      className={cx(
        "py-10 md:py-14 min-h-screen",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <Title title={lesson?.quranLessonName || "কুরআন থেকে জীবনের পাঠ"} />

      <div className={container}>
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type="quran_life_lessons"
          object_id={id}
        />

        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
            aria-label="পেজের অবস্থান"
          >
            <Link className={linkBase} to="/islam/quran-life-lessons">
              কুরআন থেকে জীবনের পাঠ
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="truncate max-w-[70%]">{lesson?.quranLessonName}</span>
          </nav>

          {/* Details Card */}
          <article
            className={cx(
              "rounded-3xl border p-5 md:p-8 shadow-sm",
              "border-slate-200/70 bg-white",
              "dark:border-slate-800 dark:bg-slate-950"
            )}
          >
            {/* Cover */}
            {lesson?.quranLessonImg && (
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <img
                  className="h-[220px] w-full object-cover sm:h-[280px] md:h-[340px]"
                  src={lesson.quranLessonImg}
                  alt={lesson.quranLessonName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/logo2.jpg";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>
            )}

            {/* Title */}
            <h1 className="mt-8 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {lesson?.quranLessonName}
            </h1>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
              <span className="text-slate-600 dark:text-slate-300">
                লেখক: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{lesson?.quranLessonAuthor}</span>
              </span>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span className="text-slate-600 dark:text-slate-300">
                {Time(lesson?.quranLessonCreateAt)}
              </span>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span className="text-slate-600 dark:text-slate-300">
                {commentCount} মন্তব্য
              </span>
            </div>

            {/* Divider */}
            <div className="mt-6 h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* Body */}
            <div
              className={cx(
                "mt-6 whitespace-pre-line break-words text-justify",
                "text-slate-700 dark:text-slate-300",
                "leading-7 md:leading-9 text-base md:text-lg"
              )}
            >
              {lesson?.quranLessonDescription}
            </div>

            {/* Comment Button */}
            <div className="mt-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className={primaryBtn}
                type="button"
              >
                মন্তব্য করুন
              </button>
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-10">
            <div
              className={cx(
                "rounded-3xl border p-5 md:p-8 shadow-sm",
                "border-slate-200/70 bg-white",
                "dark:border-slate-800 dark:bg-slate-950"
              )}
            >
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
                মন্তব্যসমূহ ({commentCount})
              </h3>

              <div className="mt-4 h-px w-full bg-slate-200 dark:bg-slate-800" />

              <div className="mt-6">
                <CommentsList content_type="quran_life_lessons" object_id={id} />
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-6" />
        </div>
      </div>
    </main>
  );
};
