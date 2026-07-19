import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../component/layout/ErrorMessage";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

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
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["readerReviews"],
    queryFn: fetchReviews,
  });

  const {
    data: images,
    isLoading: imagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ["reviewImages"],
    queryFn: fetchReviewImages,
  });

  const tabWrap = cx(
    "inline-flex rounded-2xl p-1 border shadow-sm",
    "bg-slate-100 border-slate-200",
    "dark:bg-slate-900/60 dark:border-slate-800"
  );

  const tabBtn = (active) =>
    cx(
      "px-4 py-2 text-sm font-medium rounded-xl transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
      active
        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    );

  return (
    <main
      className={cx(
        "py-10 md:py-14 min-h-screen",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <div className={container}>
        <Title title="পাঠকের ভালোবাসা" />

        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            রিভিউ
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            পাঠকের ভালোবাসা
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            পাঠকদের মতামত এবং ভালোবাসার কিছু মুহূর্ত এখানে তুলে ধরা হয়েছে।
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-slate-200 dark:bg-slate-800" />
        </header>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className={tabWrap} role="tablist" aria-label="Reviews tabs">
            <button
              className={tabBtn(activeTab === "reviews")}
              onClick={() => setActiveTab("reviews")}
              type="button"
              role="tab"
              aria-selected={activeTab === "reviews"}
            >
              পাঠক রিভিউ
            </button>
            <button
              className={tabBtn(activeTab === "images")}
              onClick={() => setActiveTab("images")}
              type="button"
              role="tab"
              aria-selected={activeTab === "images"}
            >
              পাঠকের ভালোবাসা
            </button>
          </div>
        </div>

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="mt-10 space-y-6">
            {reviewsLoading && (
              <div className="py-8 flex justify-center">
                <Loading />
              </div>
            )}

            {reviewsError && <ErrorMessage message={reviewsError.message} onRetry={refetchReviews} />}

            {reviews?.map((review) => (
              <article
                key={review.id}
                className={cx(
                  "rounded-3xl border p-6 md:p-7 shadow-sm transition duration-200",
                  "border-slate-200/70 bg-white hover:-translate-y-0.5 hover:shadow-md",
                  "dark:border-slate-800 dark:bg-slate-950"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cx(
                      "rounded-full w-10 h-10 flex items-center justify-center font-bold",
                      "bg-emerald-100 text-emerald-800",
                      "dark:bg-emerald-900/40 dark:text-emerald-200"
                    )}
                  >
                    {review.readersName.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {review.readersName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {Time(review.readersReviewCreated)}
                    </p>
                  </div>
                </div>

                <h4 className="mt-4 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  {review.readersBookName}
                </h4>

                <p className="mt-3 text-slate-700 dark:text-slate-300 text-justify leading-7">
                  {review.readersReview}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Images */}
        {activeTab === "images" && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {imagesLoading && (
              <div className="col-span-full py-8 flex justify-center">
                <Loading />
              </div>
            )}

            {imagesError && <ErrorMessage message={imagesError.message} onRetry={refetchImages} />}

            {images?.map((image) => (
              <article
                key={image.id}
                className={cx(
                  "group rounded-3xl border overflow-hidden shadow-sm transition duration-200",
                  "border-slate-200/70 bg-white hover:-translate-y-0.5 hover:shadow-md",
                  "dark:border-slate-800 dark:bg-slate-950"
                )}
              >
                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <img
                    src={image.readersBookImg}
                    alt="Book Cover"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>

                <div className="p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {Time(image.readersReviewCreated)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="h-6" />
      </div>
    </main>
  );
};
