import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const CommentsList = ({ content_type, object_id }) => {
  const [replyData, setReplyData] = useState({
    userName: "",
    userMessage: "",
    parent_comment: null,
  });

  const queryClient = useQueryClient();

  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ["comments", content_type, object_id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/comment/content/${content_type}/${object_id}/comments/`
        );
        return data;
      } catch (error) {
        throw new Error("মন্তব্যগুলো লোড করা যায়নি", { cause: error });
      }
    },
  });

  const { mutate: createReply, isPending } = useMutation({
    mutationFn: async (replyData) => {
      try {
        const formData = {
          userName: replyData.userName,
          userMessage: replyData.userMessage,
          parent_comment: replyData.parent_comment,
          content_type: content_type,
          object_id: object_id,
        };

        const response = await axios.post(`${baseUrl}/comment/comments/`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "উত্তর জমা দেওয়া যায়নি। আবার চেষ্টা করুন।"
        );
      }
    },
    onSuccess: () => {
      toast.success("উত্তর সফলভাবে জমা হয়েছে");
      setReplyData({ userName: "", userMessage: "", parent_comment: null });
      queryClient.invalidateQueries({
        queryKey: ["comments", content_type, object_id],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReplyInputChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!replyData.userName.trim() || !replyData.userMessage.trim()) {
      toast.error("নাম ও উত্তর দুটিই লিখুন");
      return;
    }
    createReply({ ...replyData, parent_comment: parentId });
  };

  const startReply = (parentId) => {
    setReplyData((prev) => ({ ...prev, parent_comment: parentId }));
  };

  const cancelReply = () => {
    setReplyData((prev) => ({ ...prev, parent_comment: null }));
  };

  const inputBase = cx(
    "w-full rounded-2xl border px-4 py-3 text-sm shadow-sm",
    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40",
    "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  const replyBtn = cx(
    "text-xs font-semibold underline underline-offset-4 transition-colors",
    "text-emerald-700 hover:text-emerald-800",
    "dark:text-emerald-400 dark:hover:text-emerald-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded"
  );

  const primaryBtn = cx(
    "inline-flex items-center justify-center rounded-2xl px-3.5 py-2 text-sm font-semibold shadow-sm transition",
    "bg-emerald-600 text-white hover:bg-emerald-700",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  const ghostBtn = cx(
    "inline-flex items-center justify-center rounded-2xl px-3.5 py-2 text-sm font-semibold transition",
    "bg-slate-100 text-slate-700 hover:bg-slate-200",
    "dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
    "disabled:opacity-70 disabled:cursor-not-allowed"
  );

  const CommentCard = ({ comment, level = 0 }) => {
    const initial = (comment.userName || "?").trim().charAt(0) || "?";

    return (
      <div className={cx("mt-5", level > 0 ? "ml-4 sm:ml-6 md:ml-10" : "")}>
        {/* thread line */}
        {level > 0 && (
          <div className="mb-3 -ml-3 md:-ml-6">
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
          </div>
        )}

        <div
          className={cx(
            "rounded-3xl border p-5 shadow-sm",
            "border-slate-200/70 bg-white",
            "dark:border-slate-800 dark:bg-slate-950"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={cx(
                  "h-10 w-10 rounded-full flex items-center justify-center font-bold",
                  "bg-emerald-100 text-emerald-800",
                  "dark:bg-emerald-900/40 dark:text-emerald-200"
                )}
              >
                {initial}
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                  {comment.userName}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {Time(comment.commentCreateAt)}
                </span>
              </div>
            </div>

            <button
              onClick={() => startReply(comment.id)}
              className={replyBtn}
              type="button"
              disabled={isPending}
            >
              উত্তর দিন
            </button>
          </div>

          <p className="mt-3 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-7">
            {comment.userMessage}
          </p>

          {/* Reply form */}
          {replyData.parent_comment === comment.id && (
            <form
              onSubmit={(e) => handleReplySubmit(e, comment.id)}
              className="mt-5 rounded-3xl border p-4 bg-slate-50/60 border-slate-200/70 dark:bg-slate-900/30 dark:border-slate-800"
            >
              <div className="space-y-3">
                <input
                  type="text"
                  name="userName"
                  value={replyData.userName}
                  onChange={handleReplyInputChange}
                  placeholder="Your name"
                  aria-label="আপনার নাম"
                  className={inputBase}
                  required
                  disabled={isPending}
                  autoFocus
                />

                <textarea
                  name="userMessage"
                  value={replyData.userMessage}
                  onChange={handleReplyInputChange}
                  placeholder="আপনার উত্তর"
                  aria-label="আপনার উত্তর"
                  rows="3"
                  className={inputBase}
                  required
                  disabled={isPending}
                />

                <div className="flex flex-wrap gap-2">
                  <button type="submit" className={primaryBtn} disabled={isPending}>
                    {isPending ? "জমা হচ্ছে..." : "উত্তর জমা দিন"}
                  </button>
                  <button type="button" onClick={cancelReply} className={ghostBtn} disabled={isPending}>
                    বাতিল
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <p
        className="py-8 text-center text-slate-500 dark:text-slate-400"
        role="alert"
      >
        মন্তব্যগুলো লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <p
        className="py-8 text-center text-slate-500 dark:text-slate-400"
        role="status"
      >
        এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনি করতে পারেন।
      </p>
    );
  }

  return (
    <div aria-live="polite">
      {comments.map((c) => <CommentCard key={c.id} comment={c} />)}
    </div>
  );
};
