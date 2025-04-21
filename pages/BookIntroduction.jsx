import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import Title from "../utils/pageTitle";
import Time from "../utils/banglaDateFormatter";
import { baseUrl } from "../constants/env.constants";

// API URL
const API_URL = `${baseUrl}/book/`;

const fetchBooks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const BookCard = ({ book }) => {
  const { bookImage, bookTitle, bookCreatedAt, bookDescription } = book;

  return (
    <div className="relative flex bg-gray-100 dark:bg-slate-800 flex-col my-6 shadow-sm w-full max-w-sm mx-auto">
      <div className="w-full h-64 text-white">
        <img
          src={bookImage}
          alt={bookTitle}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-8 text-slate-800 dark:text-slate-200 text-2xl font-semibold">
          {bookTitle}
        </h6>
        <p className="mb-4 dark:text-slate-200 whitespace-nowrap">
          <span className="text-[#078870]">উবায়দুল্লাহ তাসনিম</span> ⬤{" "}
          {Time(bookCreatedAt)}
        </p>
        <p className="mb-4 dark:text-slate-200">
          {bookDescription.slice(0, 100)}.....
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <Link
          to={`/books/${book.id}`}
          className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300"
          type="button"
        >
          পুরোটা পড়ুন
        </Link>
      </div>
    </div>
  );
};

export const BookIntroduction = () => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <div className="container px-2 max-w-screen-xl mx-auto py-5">
      <Title key="BookIntroduction" title="বই পরিচিতি" />

      <h1 className="dark:text-slate-50 text-3xl text-center py-10">
        উবায়দুল্লাহ তাসনিম এর সমস্ত বই
      </h1>
      <hr className="mt-4 mb-10 dark:border-slate-50" />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
