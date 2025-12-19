import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import Title from "../utils/pageTitle";
import Time from "../utils/banglaDateFormatter";
import { baseUrl } from "../constants/env.constants";

const API_URL = `${baseUrl}/book/`;

const fetchBooks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const primaryBtn = cx(
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition",
  "bg-slate-900 text-white hover:bg-slate-800",
  "dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
  "disabled:pointer-events-none disabled:opacity-60"
);

const BookCard = ({ book }) => {
  const { bookImage, bookTitle, bookCreatedAt, bookDescription } = book;

  return (
    <article
      className={cx(
        "group flex h-full flex-col overflow-hidden rounded-3xl border",
        "border-slate-200/70 bg-white shadow-sm transition duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        "dark:border-slate-800 dark:bg-slate-950"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={bookImage || "/placeholder-book.jpg"}
          alt={bookTitle}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-book.jpg";
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {bookTitle}
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            উবায়দুল্লাহ তাসনিম
          </span>{" "}
          <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
          {Time(bookCreatedAt)}
        </p>

        {/* content behavior unchanged: still slice + "....." */}
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 text-justify">
          {bookDescription?.slice(0, 100)}.....
        </p>

        <div className="mt-6">
          <Link to={`/books/${book.id}`} className={primaryBtn}>
            পুরোটা পড়ুন
          </Link>
        </div>
      </div>
    </article>
  );
};

export const BookIntroduction = () => {
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <main
      className={cx(
        "py-10 md:py-14 min-h-screen",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <Title key="BookIntroduction" title="বই পরিচিতি" />

      <div className={container}>
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            বই পরিচিতি
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            উবায়দুল্লাহ তাসনিম এর সমস্ত বই
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            লেখকের প্রকাশিত বইগুলোর সংক্ষিপ্ত পরিচিতি ও বিস্তারিত তথ্য এখানে পাবেন।
          </p>

          <div className="mx-auto mt-6 h-px w-28 bg-slate-200 dark:bg-slate-800" />
        </header>

        <div className="mt-10">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <div className="py-12">
              <ErrorMessage />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        <div className="h-6" />
      </div>
    </main>
  );
};
