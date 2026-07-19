import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export const HadithLifeLessons = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["hadith-life-lessons"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/hadith_life_lessons/`);
      return response.data;
    },
  });

  const cardBase = cx(
    "group flex flex-col overflow-hidden rounded-3xl border",
    "border-slate-200/70 bg-white shadow-sm transition duration-200",
    "hover:-translate-y-0.5 hover:shadow-md",
    "dark:border-slate-800 dark:bg-slate-950"
  );

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
    "bg-slate-900 text-white hover:bg-slate-800",
    "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950 md:py-14">
        <Title title="হাদিস থেকে জীবনের পাঠ" />
        <div className={container}>
          <Loading />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50/60 py-10 dark:bg-slate-950 md:py-14">
        <Title title="হাদিস থেকে জীবনের পাঠ" />
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
      <Title title="হাদিস থেকে জীবনের পাঠ" />

      <div className={container}>
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold tracking-tight shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
            ইসলাম, হাদিস থেকে নেওয়া
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
            হাদিস থেকে জীবনের পাঠ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
            রাসুলুল্লাহ (সা.)-এর হাদিস থেকে দৈনন্দিন জীবন, আচার-আচরণ ও আত্মশুদ্ধির শিক্ষা এখানে পড়ুন।
          </p>

          <div className="mx-auto mt-6 h-px w-28 bg-slate-200 dark:bg-slate-800" />
        </header>

        {!data?.length ? (
          <div className="mt-10">
            <EmptyState message="এখনও কোনো হাদিসের পাঠ প্রকাশ করা হয়নি।" />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((lesson) => (
              <article key={lesson.id} className={cardBase}>
                <Link
                  to={`/islam/hadith-life-lessons/${lesson.id}`}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/40 dark:bg-slate-900"
                  aria-label={`${lesson.hadithLessonName} পড়ুন`}
                >
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    src={lesson.hadithLessonImg || "/logo2.jpg"}
                    alt={lesson.hadithLessonName}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/logo2.jpg";
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
                </Link>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-xl">
                    {lesson.hadithLessonName}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {lesson.hadithLessonAuthor} •{" "}
                    {new Date(lesson.hadithLessonCreateAt).toLocaleDateString(
                      "bn-BD"
                    )}
                  </p>

                  <p className="mt-3 line-clamp-4 whitespace-pre-line break-words text-justify text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {lesson.hadithLessonDescription}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      to={`/islam/hadith-life-lessons/${lesson.id}`}
                      className={primaryBtn}
                    >
                      পুরোটা পড়ুন
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="h-6" />
      </div>
    </main>
  );
};

