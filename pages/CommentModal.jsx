import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants/env.constants";
import toast from "react-hot-toast";

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
          error.response?.data?.message || "Failed to post comment"
        );
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
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentData.userName || !commentData.userMessage) {
      toast.error("Please fill all fields");
      return;
    }
    createComment(commentData);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-600 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              নতুন মন্তব্য করুন
            </h3>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCommentData({
                  userName: "",
                  userMessage: "",
                  parent_comment: null,
                });
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                আপনার নাম
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={commentData.userName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white"
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="userMessage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                মন্তব্য
              </label>
              <textarea
                id="userMessage"
                name="userMessage"
                rows="4"
                value={commentData.userMessage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#078870] focus:border-[#078870] dark:bg-slate-700 dark:text-white"
                required
                disabled={isPending}
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-500 rounded-md hover:bg-gray-200 dark:hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]"
                disabled={isPending}
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#078870] rounded-md hover:bg-[#067a65] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#078870]"
                disabled={isPending}
              >
                {isPending ? "জমা হচ্ছে..." : "জমা দিন"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
