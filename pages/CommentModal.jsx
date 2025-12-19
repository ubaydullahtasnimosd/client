import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants/env.constants";
import toast from "react-hot-toast";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const CommentModal = ({
  isModalOpen,
  setIsModalOpen,
  object_id,
  content_type = "book",
}) => {
  const [commentData, setCommentData] = useState({
    userName: "",
    userMessage: "",
    parent_comment: null,
  });

  const queryClient = useQueryClient();

  const { mutate: createComment, isPending } = useMutation({
    mutationFn: async (commentData) => {
      try {
        const formData = {
          userName: commentData.userName,
          userMessage: commentData.userMessage,
          parent_comment: null,
          content_type: content_type,
          object_id: object_id,
        };

        const response = await axios.post(`${baseUrl}/comment/comments/`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to post comment");
      }
    },
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setCommentData({ userName: "", userMessage: "", parent_comment: null });
      setIsModalOpen(false);
      queryClient.invalidateQueries(["comments", content_type, object_id]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentData.userName || !commentData.userMessage) {
      toast.error("Please fill all fields");
      return;
    }
    createComment(commentData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCommentData({ userName: "", userMessage: "", parent_comment: null });
  };

  if (!isModalOpen) return null;

  const inputBase = cx(
    "w-full rounded-2xl border px-4 py-3 text-sm shadow-sm",
    "border-slate-200 bg-white text-slate-900",
    "placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
    "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-sm transition",
    "bg-emerald-600 text-white hover:bg-emerald-700",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  const ghostBtn = cx(
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition",
    "bg-slate-100 text-slate-700 hover:bg-slate-200",
    "dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        className={cx(
          "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl",
          "border-slate-200 bg-white",
          "dark:border-slate-800 dark:bg-slate-950",
          "animate-[fadeIn_.15s_ease-out]"
        )}
      >
        {/* Header */}
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
                নতুন মন্তব্য করুন
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                আপনার মতামত লিখে জমা দিন
              </p>
            </div>

            <button
              onClick={closeModal}
              className={cx(
                "rounded-2xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                "dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              )}
              disabled={isPending}
              type="button"
              aria-label="Close modal"
              title="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 h-px w-full bg-slate-200 dark:bg-slate-800" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
              >
                আপনার নাম
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={commentData.userName}
                onChange={handleInputChange}
                className={inputBase}
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label
                htmlFor="userMessage"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
              >
                মন্তব্য
              </label>
              <textarea
                id="userMessage"
                name="userMessage"
                rows="5"
                value={commentData.userMessage}
                onChange={handleInputChange}
                className={inputBase}
                required
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className={ghostBtn} disabled={isPending}>
                বাতিল
              </button>

              <button type="submit" className={primaryBtn} disabled={isPending}>
                {isPending ? "জমা হচ্ছে..." : "জমা দিন"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* tiny animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px) scale(.99); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
    </div>
  );
};
