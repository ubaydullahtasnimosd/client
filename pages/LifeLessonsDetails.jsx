import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import { CommentModal } from "./CommentModal";
import { CommentsList } from "./CommentsList";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

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

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
    "bg-slate-900 text-white hover:bg-slate-800",
    "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
  );

  const linkBase = cx(
    "rounded underline underline-offset-4 transition-colors",
    "text-emerald-700 hover:text-emerald-800",
    "dark:text-emerald-400 dark:hover:text-emerald-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950 md:py-14">
        <Title title="বিস্তারিত তথ্য" />
        <div className={container}>
          <Loading />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950 md:py-14">
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
        "min-h-screen py-10 md:py-14",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <Title title={lesson?.lifeLessonName || "জীবন থেকে নেওয়া শিক্ষা"} />

      <div className={container}>
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type="life_lessons"
          object_id={id}
        />

        <div className="mx-auto max-w-4xl">
          <nav
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
            aria-label="Breadcrumb"
          >
            <Link className={linkBase} to="/islam/life-lessons">
              জীবন থেকে নেওয়া শিক্ষা
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="max-w-[70%] truncate">
              {lesson?.lifeLessonName}
            </span>
          </nav>

          <article className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-8">
            {lesson?.lifeLessonImg && (
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <img
                  className="h-[220px] w-full object-cover sm:h-[280px] md:h-[340px]"
                  src={lesson.lifeLessonImg}
                  alt={lesson.lifeLessonName}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = "/logo2.jpg";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>
            )}

            <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              {lesson?.lifeLessonName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
              <span className="text-slate-600 dark:text-slate-300">
                লেখক:{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {lesson?.lifeLessonAuthor}
                </span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-300">
                {Time(lesson?.lifeLessonCreateAt)}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-300">
                {comments.length} মন্তব্য
              </span>
            </div>

            <div className="mt-6 h-px w-full bg-slate-200 dark:bg-slate-800" />

            <div className="mt-6 whitespace-pre-line break-words text-justify text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg md:leading-9">
              {lesson?.lifeLessonDescription}
            </div>

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

          <section className="mt-10 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 md:text-xl">
              মন্তব্যসমূহ ({comments.length})
            </h2>
            <div className="mt-4 h-px w-full bg-slate-200 dark:bg-slate-800" />
            <div className="mt-6">
              <CommentsList content_type="life_lessons" object_id={id} />
            </div>
          </section>

          <div className="h-6" />
        </div>
      </div>
    </main>
  );
};

