import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Title from "../utils/pageTitle";

const fetchVisitorCount = async () => {
  try {
    const response = await axios.get(`${baseUrl}/visit_count/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch visitor count",error);
  }
};

const incrementVisitorCount = async () => {
  try {
    const response = await axios.post(`${baseUrl}/visit_count/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to increment count",error);
  }
};

const VisitCount = () => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
    retry: 2,
    refetchInterval: 60000,
    staleTime: 30000
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
        if (document.visibilityState === 'visible') {
          mutation.mutate();
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [mutation]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-600 rounded-xl shadow-lg p-4 items-center gap-3">
        <LoadingSpinner size="small" />
      </div>
    );
  }

  if (isError) {
    console.error("Query error:", error);
    return (
      <div className="bg-white dark:bg-slate-600 rounded-xl shadow-lg p-4 inline-flex items-center gap-3">
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Count unavailable
        </span>
      </div>
    );
  }

  const percentageIncrease = data?.count 
    ? Math.min(Math.floor(Math.log(data.count) * 10), 100) 
    : 1;

  return (
    <div className="max-w-6xl bg-white dark:bg-slate-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-10 mx-auto border border-gray-100 dark:border-slate-700 mt-5 mb-5">
      <Title title="ভিজিট কাউন্ট" />
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-10 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600 dark:text-indigo-300 animate-pulse"
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
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 animate-ping"></div>
        </div>

        <div>
          <p className="text-2xl font-bold text-gray-500 dark:text-gray-100 tracking-wider">
            মোট ব্যাবহারকারী
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">
              {data?.count?.toLocaleString() ?? "---"}
            </p>
            <span className="text-xl text-green-500 dark:text-green-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +{percentageIncrease}%
            </span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-300 mt-2">
            ওয়েবসাইট ভিজিট করার জন্য ধন্যবাদ
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitCount;