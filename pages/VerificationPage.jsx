import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifySubscription } from "../api/subscribe";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

  const shell = cx(
    "min-h-screen flex items-center justify-center p-4",
    "bg-slate-50/60 "
  );

  const cardBase = cx(
    "w-full max-w-md  border p-8 text-center shadow-sm",
    "bg-white ",
    "border-slate-200/70 "
  );

  const btn = cx(
    "inline-flex items-center justify-center  px-6 py-2 text-sm font-medium transition shadow-sm",
    "bg-slate-900 text-white hover:bg-slate-800",
    "  ",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCA764]/40"
  );

  const Badge = ({ variant = "info", children }) => {
    const styles =
      variant === "success"
        ? "border-[#CCA764]/30 bg-[#CCA764]/10 text-[#876527]   "
        : variant === "error"
        ? "border-red-200 bg-red-50 text-red-800   "
        : "border-blue-200 bg-blue-50 text-blue-800   ";

    return (
      <div
        className={cx(
          "mx-auto mb-6 inline-flex items-center  border px-4 py-2 text-sm font-semibold",
          styles
        )}
      >
        {children}
      </div>
    );
  };

  if (verificationStatus === "success" || verificationStatus === "already_verified") {
    return (
      <div className={shell}>
        <div className={cardBase}>
          <Badge variant="success">
            {verificationStatus === "success" ? "SUCCESS" : "ALREADY VERIFIED"}
          </Badge>

          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 ">
            {verificationStatus === "success"
              ? "সাবস্ক্রিপশন নিশ্চিত হয়েছে!"
              : "আপনি ইতিমধ্যেই সাবস্ক্রাইব করেছেন!"}
          </h2>

          <p className="mt-4 text-slate-600  leading-7">
            {verificationStatus === "success"
              ? "আপনার সাবস্ক্রিপশন সফলভাবে নিশ্চিত করা হয়েছে। নতুন আপডেট পেতে আপনার ইমেইল চেক করুন।"
              : "আপনি ইতিমধ্যেই আমাদের সাবস্ক্রাইবার লিস্টে রয়েছেন। নতুন আপডেট পেতে আপনার ইমেইল চেক করুন।"}
          </p>

          <a href="/" className={cx(btn, "mt-6")}>
            হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className={shell}>
        <div className={cardBase}>
          <Badge variant="error">ERROR</Badge>

          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 ">
            ভেরিফিকেশন ব্যর্থ
          </h2>

          <p className="mt-4 text-slate-600  leading-7">
            দুঃখিত, আপনার ভেরিফিকেশন প্রক্রিয়া সম্পন্ন হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>

          <a href="/" className={cx(btn, "mt-6")}>
            হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className={cardBase}>
        <Badge variant="info">VERIFYING</Badge>

        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 ">
          ভেরিফিকেশন প্রক্রিয়াধীন...
        </h2>

        <p className="mt-4 text-slate-600 ">
          অনুগ্রহ করে অপেক্ষা করুন
        </p>
      </div>
    </div>
  );
};
