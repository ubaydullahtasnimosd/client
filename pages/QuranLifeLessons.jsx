import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const QuranLifeLessons = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["quran-life-lessons"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/quran_life_lessons/`);
      return response.data;
    },
  });

  const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

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
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:pointer-events-none disabled:opacity-60"
  );

  if (isLoading) {
    return (
      <main className="py-10 md:py-14 min-h-screen bg-slate-50/60 dark:bg-slate-950">
        <Title title="কুরআন থেকে জীবনের পাঠ" />
        <div className={container}>
          <Loading />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="py-10 md:py-14 min-h-screen bg-slate-50/60 dark:bg-slate-950">
        <Title title="কুরআন থেকে জীবনের পাঠ" />
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
      <Title title="কুরআন থেকে জীবনের পাঠ" />

      <div className={container}>
        {/* Page Header */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            ইসলাম, কুরআন থেকে নেওয়া
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            কুরআন থেকে জীবনের পাঠ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            পবিত্র কুরআনের নির্দেশিকা ও আয়াত থেকে আমাদের দৈনন্দিন জীবনের শিক্ষা ও প্রতিফলনসমূহ এখানে জানুন।
          </p>

          <div className="mx-auto mt-6 h-px w-28 bg-slate-200 dark:bg-slate-800" />
        </header>

        {!data?.length ? (
          <div className="mt-10">
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                !
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                কোনো ডাটা পাওয়া যায়নি
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                এই পেজের কনটেন্ট পরে যুক্ত করা হবে।
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((lesson) => (
              <article key={lesson.id} className={cardBase}>
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    src={lesson.quranLessonImg}
                    alt={lesson.quranLessonName}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/logo2.jpg";
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {lesson.quranLessonName}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {lesson.quranLessonAuthor} •{" "}
                    {new Date(lesson.quranLessonCreateAt).toLocaleDateString("bn-BD")}
                  </p>

                  <div className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 whitespace-pre-line break-words text-justify line-clamp-4">
                    {lesson.quranLessonDescription}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <Link to={`/islam/quran-life-lessons/${lesson.id}`} className={primaryBtn}>
                      পুরোটা পড়ুন
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-6" />
      </div>
    </main>
  );
};
