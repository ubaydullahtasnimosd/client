import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

export const Miscellaneous = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["miscellaneous"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/miscellaneous/`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <Title title="বিবিধ" />
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <Title title="বিবিধ" />
        <ErrorMessage />
      </div>
    );
  }

  return (
    <div className="py-10">
      <Title title="বিবিধ" />
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h1 className="text-3xl text-center mb-10 text-gray-800 dark:text-white">
          বিবিধ ভিডিও
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data?.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-slate-500 p-4 bg-white dark:bg-slate-600 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={item.misecllaneousVideo}
                  title={item.misecllaneousTitle}
                  className="w-full h-64"
                  allowFullScreen
                ></iframe>
              </div>

              <h2 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">
                {item.misecllaneousTitle}
              </h2>

              <p className="text-gray-500 dark:text-gray-300 text-sm">
                আপলোডের সময় → {Time(item.misecllaneousCreateAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
