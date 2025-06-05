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

export const ArticlesDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <div className="py-10">
      <Title title={article?.articlesEssaysName || "লেখার বিস্তারিত"} />
      <div className="container mx-auto px-4 max-w-screen-xl">
        <CommentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          content_type="articles_essays"
          object_id={id}
        />

        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 dark:border-slate-500 p-6 bg-white dark:bg-slate-600 shadow-md">
            <img
              className="object-cover"
              src={article?.articlesEssaysImg}
              alt={article.articlesEssaysName}
            />
            <h1 className="text-3xl font-bold mb-4 mt-10 text-gray-900 dark:text-white">
              {article?.articlesEssaysName}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-5 text-sm sm:text-base text-[#078870] flex-wrap">
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6 sm:w-8 sm:h-8 border rounded-full"
                  src={logo}
                  alt="logo"
                />
                <Link className="underline" to={"/books"}>
                  {article?.articlesEssaysAuthor || "উবায়দুল্লাহ তাসনিম"}
                </Link>
              </div>
              <span className="hidden sm:inline">/</span>
              <Link className="underline" to={"/articles"}>
                আমার প্রবন্ধ-নিবন্ধগুলো
              </Link>
              <span className="hidden sm:inline">/</span>
              <span>{Time(article?.articlesEssaysCreateAt)}</span>
              <span className="hidden sm:inline">/</span>
              <span>{commentCount} COMMENTS</span>
            </div>

            <div className="whitespace-pre-line break-words text-justify text-gray-700 dark:text-gray-200 leading-relaxed mt-5">
              {article?.articlesEssaysDescription}
            </div>

            {article?.articlesEssaysQRCodeScen && (
              <div className="mt-8">
                <p className="text-gray-600 font-semibold dark:text-gray-300 mb-4">
                  {article?.articlesEssaysQRCodeScen}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    to="/articles"
                    className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300 whitespace-nowrap"
                    type="button"
                  >
                    সব লেখা দেখুন
                  </Link>

                  {article?.articlesEssaysQRCodeScenImg && (
                    <img
                      className="rounded-lg object-cover mx-auto max-w-xs h-auto border border-gray-300 dark:border-slate-500"
                      src={article?.articlesEssaysQRCodeScenImg}
                      alt="QR Code Scan"
                    />
                  )}
                </div>
              </div>
            )}
            {/* Comment Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300"
                type="button"
              >
                মন্তব্য করুন
              </button>
            </div>
          </div>

          <hr className="mt-10 border-t border-slate-800 dark:border-slate-50" />
          <div className="pt-6 border-gray-200 dark:border-slate-500">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              মন্তব্যসমূহ ({commentCount})
            </h3>
            <CommentsList content_type="articles_essays" object_id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
