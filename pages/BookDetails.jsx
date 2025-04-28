import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import Title from "../utils/pageTitle";
import logo from "/logo.jpg";
import { Link } from "react-router-dom";
import Time from "../utils/banglaDateFormatter";
import { useState } from "react";
import { CommentModal } from "../pages/CommentModal";
import { CommentsList } from "../pages/CommentsList";
import { baseUrl } from "../constants/env.constants";

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

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
  });

  const { data: commentCount } = useQuery({
    queryKey: ["commentCount", "book", id],
    queryFn: () => fetchCommentCount("book", id),
    initialData: 0,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="container px-4 mx-auto py-6 sm:py-10 max-w-screen-xl">
      <Title
        key="BookDetails"
        title={`${book?.bookTitle || "বইয়ের বিস্তারিত"}`}
      />

      <CommentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        object_id={id}
        content_type="book"
      />

      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img
            src={book?.bookImage || "/placeholder-book.jpg"}
            alt={book?.bookTitle || "Book Cover"}
            className="w-full h-full"
          />
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {book?.bookTitle || "বইয়ের শিরোনাম"}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-5 text-sm sm:text-base text-[#078870] flex-wrap">
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6 sm:w-8 sm:h-8 border rounded-full object-cover"
                  src={logo}
                  alt="লোগো"
                />
                <span>{book?.author || "লেখক"}</span>
              </div>
              <span className="hidden sm:inline">/</span>
              <Link className="underline hover:text-[#067a65]" to={"/books"}>
                আমার বইগুলো
              </Link>
              <span className="hidden sm:inline">/</span>
              <span>{Time(book?.bookCreatedAt) || "প্রকাশনার তারিখ"}</span>
              <span className="hidden sm:inline">/</span>
              <span>{commentCount} COMMENTS</span>
            </div>

            {book?.bookPublication && (
              <p className="mt-3 sm:mt-5 text-base sm:text-lg dark:text-slate-50">
                প্রকাশনা : {book.bookPublication}
              </p>
            )}

            {book?.bookPurchaseLink && (
              <p className="mt-3 sm:mt-5 text-base sm:text-lg dark:text-slate-50">
                বইটি অর্ডার করতে :{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#078870] hover:text-[#067a65]"
                  href={book.bookPurchaseLink}
                >
                  {book.bookPurchaseLink}
                </a>
              </p>
            )}
          </div>

          <div className="mb-6 text-justify">
            <h3 className="text-lg sm:text-xl font-semibold dark:text-white mb-3 border-b pb-2">
              বই সম্পর্কে
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg whitespace-pre-line">
              {book?.bookDescription}
              {book?.bookPurchaseLink && (
                <p className="mt-3 sm:mt-5 text-base sm:text-lg dark:text-slate-50">
                  বইটি PDF আকারে দেখতে{" "}
                  <a
                    href={book.bookPurchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#078870] hover:text-[#067a65]"
                  >
                    এই লিংক
                  </a>{" "}
                  এ ক্লিক করুন এবং <b>`একটু পড়ে দেখুন`</b> বাটনে ক্লিক করুন।
                </p>
              )}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg hover:bg-slate-700 dark:hover:bg-slate-300"
              type="button"
            >
              মন্তব্য করুন
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-10 border-t border-slate-800 dark:border-slate-50" />
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 mt-10">
        মন্তব্যসমূহ ({commentCount})
      </h3>
      <CommentsList content_type="book" object_id={id} />
    </div>
  );
};
