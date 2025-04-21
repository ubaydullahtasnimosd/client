import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../component/layout/Loading";
import { baseUrl } from "../constants/env.constants";
import Time from "../utils/banglaDateFormatter";

export const CommentsList = ({ content_type, object_id }) => {
  const [replyData, setReplyData] = useState({
    userName: "",
    userMessage: "",
    parent_comment: null,
  });

  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", content_type, object_id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/comment/content/${content_type}/${object_id}/comments/`
        );
        return data;
      } catch (error) {
        throw new Error("Failed to fetch comments", error);
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

        const response = await axios.post(
          `${baseUrl}/comment/comments/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to post reply"
        );
      }
    },
    onSuccess: () => {
      toast.success("Reply posted successfully");
      setReplyData({ userName: "", userMessage: "", parent_comment: null });
      queryClient.invalidateQueries(["comments", content_type, object_id]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReplyInputChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!replyData.userName || !replyData.userMessage) {
      toast.error("Please fill all fields");
      return;
    }
    createReply({ ...replyData, parent_comment: parentId });
  };

  const startReply = (parentId) => {
    setReplyData((prev) => ({
      ...prev,
      parent_comment: parentId,
    }));
  };

  const cancelReply = () => {
    setReplyData((prev) => ({
      ...prev,
      parent_comment: null,
    }));
  };

  const renderComments = (commentList, level = 0) => {
    return commentList.map((comment) => (
      <div
        key={comment.id}
        className={`mt-4 ${
          level > 0
            ? "ml-8 border-l-2 border-gray-200 dark:border-gray-600 pl-4"
            : ""
        }`}
      >
        <div className="bg-gray-50 dark:bg-slate-600 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white">
                {comment.userName}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Time(comment.commentCreateAt)}
              </span>
            </div>
            <button
              onClick={() => startReply(comment.id)}
              className="text-xs font-bold text-[#078890] hover:underline"
            >
              Reply
            </button>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {comment.userMessage}
          </p>
        </div>

        {replyData.parent_comment === comment.id && (
          <form
            onSubmit={(e) => handleReplySubmit(e, comment.id)}
            className="mt-4 ml-4"
          >
            <div className="mb-3">
              <input
                type="text"
                name="userName"
                value={replyData.userName}
                onChange={handleReplyInputChange}
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="userMessage"
                value={replyData.userMessage}
                onChange={handleReplyInputChange}
                placeholder="Your reply"
                rows="3"
                className="w-full px-3 py-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-[#078870] text-white text-sm rounded-md"
                disabled={isPending}
              >
                {isPending ? "Posting..." : "Submit Reply"}
              </button>
              <button
                type="button"
                onClick={cancelReply}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-sm rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {renderComments(comment.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (isLoading)
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center py-4">Error loading comments</p>
    );
  if (!comments || comments.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
        এখনও কোন মন্তব্য নেই। মন্তব্যকারী প্রথম হন!
      </p>
    );

  return <div>{renderComments(comments)}</div>;
};
