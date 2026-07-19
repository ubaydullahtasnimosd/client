import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import Title from "../utils/pageTitle";
import logo from "/logo.jpg";
import Time from "../utils/banglaDateFormatter";
import { useState } from "react";
import { CommentModal } from "../pages/CommentModal";
import { CommentsList } from "../pages/CommentsList";
import { baseUrl } from "../constants/env.constants";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const fetchBookDetails = async (id) => {
  const { data } = await axios.get(`${baseUrl}/book/${id}/`);
  return data;
};

const fetchCommentCount = async (content_type, object_id) => {
  const { data } = await axios.get(
    `${baseUrl}/comment/content/${content_type}/${object_id}/comments/`
  );
  return data.length;
};

export const BookDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: book, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
  });

  const { data: commentCount } = useQuery({
    queryKey: ["commentCount", "book", id],
    queryFn: () => fetchCommentCount("book", id),
    initialData: 0,
  });

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
    "bg-slate-900 text-white hover:bg-slate-800",
    "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
  );

  const accentLink = cx(
    "underline underline-offset-4 transition-colors",
    "text-emerald-700 hover:text-emerald-800",
    "dark:text-emerald-400 dark:hover:text-emerald-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded"
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
      <div className={container}>
        <Title key="BookDetails" title={`${book?.bookTitle || "বইয়ের বিস্তারিত"}`} />

        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          object_id={id}
          content_type="book"
        />

        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Link className={accentLink} to="/books">
              আমার বইগুলো
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="truncate max-w-[70%]">{book?.bookTitle}</span>
          </div>

          <article
            className={cx(
              "rounded-3xl border overflow-hidden shadow-sm",
              "border-slate-200/70 bg-white",
              "dark:border-slate-800 dark:bg-slate-950"
            )}
          >
            {/* Cover */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img
                src={book?.bookImage || "/placeholder-book.jpg"}
                alt={book?.bookTitle || "Book Cover"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {book?.bookTitle || "বইয়ের শিরোনাম"}
              </h1>

              {/* Meta Row */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <img
                    className="h-7 w-7 md:h-8 md:w-8 rounded-full object-cover ring-1 ring-slate-900/10 dark:ring-white/10"
                    src={logo}
                    alt="লোগো"
                    loading="lazy"
                  />
                  <span className="text-slate-700 dark:text-slate-200">
                    {book?.author || "লেখক"}
                  </span>
                </div>

                <span className="text-slate-300 dark:text-slate-700">•</span>

                <span className="text-slate-600 dark:text-slate-300">
                  {Time(book?.bookCreatedAt) || "প্রকাশনার তারিখ"}
                </span>

                <span className="text-slate-300 dark:text-slate-700">•</span>

                <span className="text-slate-600 dark:text-slate-300">
                  {commentCount} COMMENTS
                </span>
              </div>

              {/* Info lines (content unchanged) */}
              <div className="mt-6 space-y-3">
                {book?.bookPublication && (
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-200">
                    <span className="font-semibold">প্রকাশনা :</span>{" "}
                    {book.bookPublication}
                  </p>
                )}

                {book?.bookPurchaseLink && (
                  <div
                    className={cx(
                      "rounded-3xl border p-5 md:p-6",
                      "border-emerald-200/70 bg-emerald-50/60",
                      "dark:border-slate-800 dark:bg-slate-900/40"
                    )}
                  >
                    <p className="text-base md:text-lg text-slate-700 dark:text-slate-200">
                      <span className="font-semibold">বইটি অর্ডার করতে :</span>{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className={accentLink}
                        href={book.bookPurchaseLink}
                      >
                        {book.bookPurchaseLink}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="mt-6 h-px w-full bg-slate-200 dark:bg-slate-800" />

              {/* Description */}
              <section className="mt-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
                  বই সম্পর্কে
                </h3>

                <div className="mt-3 text-slate-700 dark:text-slate-300 text-base md:text-lg whitespace-pre-line leading-7 md:leading-9 text-justify">
                  {book?.bookDescription}

                  {book?.bookPurchaseLink && (
                    <div className="mt-5 text-slate-700 dark:text-slate-200">
                      বইটি PDF আকারে দেখতে{" "}
                      <a
                        href={book.bookPurchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={accentLink}
                      >
                        এই লিংক
                      </a>{" "}
                      এ ক্লিক করুন এবং <b>`একটু পড়ে দেখুন`</b> বাটনে ক্লিক করুন।
                    </div>
                  )}
                </div>
              </section>

              {/* Comment CTA */}
              <div className="mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={primaryBtn}
                  type="button"
                >
                  মন্তব্য করুন
                </button>
              </div>
            </div>
          </article>

          {/* Comments */}
          <section className="mt-10">
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
                <CommentsList content_type="book" object_id={id} />
              </div>
            </div>
          </section>

          <div className="h-6" />
        </div>
      </div>
    </main>
  );
};
