import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifySubscription } from "../api/subscribe";

export const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("verification_token");
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus("error");
        toast.error("ভেরিফিকেশন টোকেন পাওয়া যায়নি।");
        return;
      }

      try {
        const response = await verifySubscription(token);

        let status;
        let message;

        if (response.message === "already verified") {
          status = "already_verified";
          message = "আপনি ইতিমধ্যেই সাবস্ক্রাইব করেছেন!";
        } else {
          status = "success";
          message = "সাবস্ক্রিপশন সফলভাবে নিশ্চিত করা হয়েছে!";
        }

        setVerificationStatus(status);
        toast.success(message);
      } catch (error) {
        setVerificationStatus("error");
        toast.error(error.response?.data?.message || "ভেরিফিকেশন ব্যর্থ");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-800 p-4">
      {(verificationStatus === "success" ||
        verificationStatus === "already_verified") && (
        <div className="bg-black text-white p-10 rounded-lg shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            {verificationStatus === "success"
              ? "সাবস্ক্রিপশন নিশ্চিত হয়েছে!"
              : "আপনি ইতিমধ্যেই সাবস্ক্রাইব করেছেন!"}
          </h2>

          <p className="mb-6">
            {verificationStatus === "success"
              ? "আপনার সাবস্ক্রিপশন সফলভাবে নিশ্চিত করা হয়েছে। নতুন আপডেট পেতে আপনার ইমেইল চেক করুন।"
              : "আপনি ইতিমধ্যেই আমাদের সাবস্ক্রাইবার লিস্টে রয়েছেন। নতুন আপডেট পেতে আপনার ইমেইল চেক করুন।"}
          </p>
          <a
            href="/"
            className="inline-block bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition"
          >
            হোম পেজে ফিরে যান
          </a>
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="bg-red-500 text-white p-10 rounded-lg shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">ভেরিফিকেশন ব্যর্থ</h2>
          <p className="mb-6">
            দুঃখিত, আপনার ভেরিফিকেশন প্রক্রিয়া সম্পন্ন হয়নি। অনুগ্রহ করে আবার
            চেষ্টা করুন।
          </p>
          <a
            href="/"
            className="inline-block bg-white text-red-500 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            হোম পেজে ফিরে যান
          </a>
        </div>
      )}

      {!verificationStatus && (
        <div className="bg-blue-500 text-white p-10 rounded-lg shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            ভেরিফিকেশন প্রক্রিয়াধীন...
          </h2>
          <p>অনুগ্রহ করে অপেক্ষা করুন</p>
        </div>
      )}
    </div>
  );
};
