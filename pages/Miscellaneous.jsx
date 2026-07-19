import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../component/layout/EmptyState";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export const Miscellaneous = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["miscellaneous"],
    enabled: !selectedCategory,
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/miscellaneous/`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <main
        className={cx(
          "py-12 min-h-screen",
          "bg-slate-50/60 text-slate-900",
          "dark:bg-slate-950 dark:text-slate-50"
        )}
      >
        <Title title="বিবিধ" />
        <div className={container}>
          <div className="py-12 text-center">
            <Loading />
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main
        className={cx(
          "py-12 min-h-screen",
          "bg-slate-50/60 text-slate-900",
          "dark:bg-slate-950 dark:text-slate-50"
        )}
      >
        <Title title="বিবিধ" />
        <div className={container}>
          <div className="py-12 text-center">
            <ErrorMessage message={error?.message} onRetry={refetch} />
          </div>
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
      <Title title="বিবিধ" />

      <div className={container}>
        {/* Header */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            বিবিধ
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            বিবিধ ভিডিও
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            বিভিন্ন বিষয়ের নির্বাচিত ভিডিওগুলো এখানে পাবেন।
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-slate-200 dark:bg-slate-800" />
        </header>

        {selectedCategory || !data?.length ? (
          <div className="mt-10">
            <EmptyState />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.map((item) => (
            <article
              key={item.id}
              className={cx(
                "group overflow-hidden rounded-3xl border shadow-sm transition duration-200",
                "border-slate-200/70 bg-white hover:-translate-y-0.5 hover:shadow-md",
                "dark:border-slate-800 dark:bg-slate-950"
              )}
            >
              {/* Video */}
              <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                {/* 16:9 ratio without aspect plugin */}
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    src={item.misecllaneousVideo}
                    title={item.misecllaneousTitle}
                    className="absolute inset-0 h-full w-full"
                    allowFullScreen
                  />
                </div>

                {/* subtle overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h2 className="text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {item.misecllaneousTitle}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  আপলোডের সময় → {Time(item.misecllaneousCreateAt)}
                </p>
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
