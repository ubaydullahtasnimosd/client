import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const fetchVisitorCount = async () => {
  try {
    const response = await axios.get(`${baseUrl}/visit_count/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch visitor count", error);
  }
};

const incrementVisitorCount = async () => {
  try {
    const response = await axios.post(`${baseUrl}/visit_count/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to increment count", error);
  }
};

const VisitCount = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
    retry: 2,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const mutation = useMutation({
    mutationFn: incrementVisitorCount,
    onSuccess: () => {
      queryClient.invalidateQueries(["visitor-count"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("pageVisit");

    if (!hasVisited) {
      mutation.mutate();
      sessionStorage.setItem("pageVisit", "true");

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          mutation.mutate();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [mutation]);

  const percentageIncrease = data?.count
    ? Math.min(Math.floor(Math.log(data.count) * 10), 100)
    : 1;

  const shell = "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10";

  if (isLoading) {
    return (
      <div className={shell}>
        <div
          className={cx(
            "rounded-3xl border p-6 md:p-8 shadow-sm",
            "border-slate-200/70 bg-white",
            "dark:border-slate-800 dark:bg-slate-950"
          )}
        >
          <div className="flex items-center justify-center gap-3">
            <Loading size="small" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Query error:", error);
    return (
      <div className={shell}>
        <div
          className={cx(
            "rounded-3xl border p-6 md:p-8 shadow-sm",
            "border-slate-200/70 bg-white",
            "dark:border-slate-800 dark:bg-slate-950"
          )}
        >
          <div className="flex items-center justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Count unavailable
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={shell}>
      <div
        className={cx(
          "rounded-3xl border p-6 md:p-8 shadow-sm transition duration-200",
          "border-slate-200/70 bg-white hover:shadow-md",
          "dark:border-slate-800 dark:bg-slate-950"
        )}
      >
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          {/* Left: Icon + labels */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="rounded-2xl p-4 bg-indigo-100 dark:bg-indigo-900/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-700 dark:text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                মোট ব্যাবহারকারী
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                ওয়েবসাইট ভিজিট করার জন্য ধন্যবাদ
              </p>
            </div>
          </div>

          {/* Right: Count */}
          <div className="text-center sm:text-right">
            <div className="flex items-baseline justify-center sm:justify-end gap-2">
              <p className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300">
                {data?.count?.toLocaleString() ?? "---"}
              </p>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                +{percentageIncrease}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitCount;
