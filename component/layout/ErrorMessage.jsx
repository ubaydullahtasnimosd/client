import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const ErrorMessage = ({
  title = "তথ্য লোড করা যায়নি",
  message = "সার্ভার থেকে ডেটা রিট্রিভ করতে সাময়িক সমস্যা হয়েছে।",
  onRetry,
  className = "",
}) => {
  const technicalMessages = /network error|request failed|failed to fetch|timeout/i;
  const displayMessage = technicalMessages.test(message)
    ? "সাময়িক সমস্যার কারণে তথ্য দেখানো যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।"
    : message;

  return (
    <div
      className={cx(
        "mx-auto flex max-w-md flex-col items-center justify-center  border border-rose-200 bg-rose-50/50 p-6 text-center shadow-sm   animate-fade-in",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-4  bg-rose-100 p-3.5 text-rose-600  ">
        <ExclamationTriangleIcon className="h-7 w-7" aria-hidden="true" />
      </div>

      <h3 className="text-base font-semibold tracking-tight text-rose-800 ">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600 ">
        {displayMessage}
      </p>

      {onRetry ? (
        <button
          onClick={onRetry}
          type="button"
          className="mt-5 inline-flex items-center justify-center  bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500/40  "
        >
          আবার চেষ্টা করুন
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="mt-5 inline-flex items-center justify-center  bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500/40   "
        >
          পৃষ্ঠাটি রিফ্রেশ করুন
        </button>
      )}
    </div>
  );
};
