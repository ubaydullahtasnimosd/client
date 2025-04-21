import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { LoadingSpinner } from "../component/layout/Loading";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";
import { baseUrl } from "../constants/env.constants";

const API_BASE_URL = `${baseUrl}/readers_love`;

const fetchReviews = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/readers/`);
  return data;
};

const fetchReviewImages = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/image/`);
  return data;
};

export const UserReview = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["readerReviews"],
    queryFn: fetchReviews,
  });

  const {
    data: images,
    isLoading: imagesLoading,
    error: imagesError,
  } = useQuery({
    queryKey: ["reviewImages"],
    queryFn: fetchReviewImages,
  });

  return (
    <div className="container mx-auto px-4 max-w-screen-xl py-10">
      <Title title="পাঠকের ভালোবাসা" />
      <h1 className="text-3xl text-center mb-8 dark:text-white">
        পাঠকের ভালোবাসা
      </h1>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          পাঠক রিভিউ
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "images"
              ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("images")}
        >
          পাঠকের ভালোবাসা
        </button>
      </div>

      {activeTab === "reviews" && (
        <div className="space-y-6">
          {reviewsLoading && <LoadingSpinner />}

          {reviewsError && <ErrorMessage />}

          {reviews?.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-600 dark:text-white"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold dark:bg-blue-900 dark:text-blue-200">
                  {review.readersName.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{review.readersName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {Time(review.readersReviewCreated)}
                  </p>
                </div>
              </div>
              <h4 className="text-xl font-medium mb-2 text-blue-600 dark:text-blue-400">
                {review.readersBookName}
              </h4>
              <p className="text-gray-700 dark:text-gray-200 text-justify">
                {review.readersReview}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "images" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesLoading && <LoadingSpinner />}

          {imagesError && <ErrorMessage />}

          {images?.map((image) => (
            <div
              key={image.id}
              className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-600"
            >
              <img
                src={image.readersBookImg}
                alt="Book Cover"
                className="w-full h-48"
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <div className="p-3">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {Time(image.readersReviewCreated)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
