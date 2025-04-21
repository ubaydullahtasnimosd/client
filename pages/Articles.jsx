import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Title from "../utils/pageTitle";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { Link } from "react-router-dom";
import { baseUrl } from "../constants/env.constants";

export const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/articles_essays/`);
      return response.data;
    },
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
      <Title title="লেখা ও প্রবন্ধ" />
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h1 className="text-3xl text-center mb-10 text-gray-800 dark:text-white">
          প্রবন্ধ-নিবন্ধ
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 dark:border-slate-500 p-6 bg-white dark:bg-slate-600 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h2 className="text-xl mb-2 text-gray-900 dark:text-white">
                {article.articlesEssaysName}
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mb-4 text-sm">
                {article.articlesEssaysAuthor} •{" "}
                {new Date(article.articlesEssaysCreateAt).toLocaleDateString(
                  "bn-BD"
                )}
              </p>

              <div className="whitespace-pre-line break-words text-justify text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-4 mb-4">
                {article.articlesEssaysDescription}
              </div>

              <div className="mt-auto">
                <Link
                  to={`/articles/${article.id}`}
                  className="rounded-md bg-slate-800 dark:bg-slate-200 py-2 px-4 border border-transparent text-center text-sm text-white dark:text-slate-800 transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-slate-700 dark:hover:bg-slate-300"
                  type="button"
                >
                  পুরোটা পড়ুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
