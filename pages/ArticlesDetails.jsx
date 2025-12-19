import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import { CommentModal } from "../pages/CommentModal";
import { CommentsList } from "../pages/CommentsList";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import logo from "/logo.jpg";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const ArticlesDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/articles_essays/${id}`);
      return response.data;
    },
  });

  const { data: commentCount } = useQuery({
    queryKey: ["commentCount", "articles_essays", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseUrl}/comment/content/articles_essays/${id}/comments/`
      );
      return data.length;
    },
    initialData: 0,
  });

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
      <div className="py-12 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center">
        <ErrorMessage />
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
      <Title title={article?.articlesEssaysName || "লেখার বিস্তারিত"} />

      <div className={container}>
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type="articles_essays"
          object_id={id}
        />

        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Link className={linkBase} to="/articles">
              প্রবন্ধ-নিবন্ধ
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="truncate max-w-[70%]">{article?.articlesEssaysName}</span>
          </div>

          {/* Article Card */}
          <article
            className={cx(
              "rounded-3xl border p-5 md:p-8 shadow-sm",
              "border-slate-200/70 bg-white",
              "dark:border-slate-800 dark:bg-slate-950"
            )}
          >
            {/* Cover */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
              <img
                className="h-[220px] w-full object-cover sm:h-[280px] md:h-[340px]"
                src={article?.articlesEssaysImg}
                alt={article?.articlesEssaysName}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
            </div>

            {/* Title */}
            <h1 className="mt-8 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {article?.articlesEssaysName}
            </h1>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <img
                  className="h-7 w-7 md:h-8 md:w-8 rounded-full object-cover ring-1 ring-slate-900/10 dark:ring-white/10"
                  src={logo}
                  alt="logo"
                  loading="lazy"
                />
                <Link className={linkBase} to={"/books"}>
                  {article?.articlesEssaysAuthor || "উবায়দুল্লাহ তাসনিম"}
                </Link>
              </div>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span className="text-slate-600 dark:text-slate-300">
                {Time(article?.articlesEssaysCreateAt)}
              </span>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span className="text-slate-600 dark:text-slate-300">
                {commentCount} COMMENTS
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
              {article?.articlesEssaysDescription}
            </div>

            {/* QR Block */}
            {article?.articlesEssaysQRCodeScen && (
              <div className="mt-10">
                <div
                  className={cx(
                    "rounded-3xl border p-5 md:p-7",
                    "border-emerald-200/70 bg-emerald-50/60",
                    "dark:border-slate-800 dark:bg-slate-900/40"
                  )}
                >
                  <p className="text-slate-800 font-semibold dark:text-slate-200">
                    {article?.articlesEssaysQRCodeScen}
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
                    <Link to="/articles" className={cx(primaryBtn, "whitespace-nowrap")}>
                      সব লেখা দেখুন
                    </Link>

                    {article?.articlesEssaysQRCodeScenImg && (
                      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
                        <img
                          className="object-cover mx-auto max-w-xs h-auto"
                          src={article?.articlesEssaysQRCodeScenImg}
                          alt="QR Code Scan"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                <CommentsList content_type="articles_essays" object_id={id} />
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
