import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Articles = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["articles"],
    enabled: !selectedCategory,
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/articles_essays/`);
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
      <div className="py-12 text-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center">
        <ErrorMessage message={error?.message} onRetry={refetch} />
      </div>
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
      <Title title="লেখা ও প্রবন্ধ" />

      <div className={container}>
        {/* Page Header */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            প্রবন্ধ-নিবন্ধ
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            আমার লেখা ও প্রবন্ধসমূহ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            এখানে নিয়মিত নতুন লেখা যুক্ত হয়। আপনার পছন্দের লেখাটি বেছে নিয়ে পুরোটা পড়ুন।
          </p>

          <div className="mx-auto mt-6 h-px w-28 bg-slate-200 dark:bg-slate-800" />
        </header>

        {selectedCategory || !data?.length ? (
          <div className="mt-10">
            <EmptyState />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((article) => (
            <article key={article.id} className={cardBase}>
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  src={article.articlesEssaysImg}
                  alt={article.articlesEssaysName}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {article.articlesEssaysName}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {article.articlesEssaysAuthor} •{" "}
                  {new Date(article.articlesEssaysCreateAt).toLocaleDateString("bn-BD")}
                </p>

                <div className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 whitespace-pre-line break-words text-justify line-clamp-4">
                  {article.articlesEssaysDescription}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link to={`/articles/${article.id}`} className={primaryBtn}>
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
