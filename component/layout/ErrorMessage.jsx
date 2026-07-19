import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const ErrorMessage = ({
  title = "তথ্য লোড করা যায়নি",
  message = "সার্ভার থেকে ডেটা রিট্রিভ করতে সাময়িক সমস্যা হয়েছে।",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={cx(
        "mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-center shadow-sm dark:border-rose-950/40 dark:bg-rose-950/10 animate-fade-in",
        className
      )}
    >
      <div className="mb-4 rounded-full bg-rose-100 p-3.5 text-rose-600 dark:bg-rose-900/35 dark:text-rose-400">
        <ExclamationTriangleIcon className="h-7 w-7 animate-pulse" />
      </div>

      <h3 className="text-base font-semibold tracking-tight text-rose-800 dark:text-rose-300">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {message}
      </p>

      {onRetry ? (
        <button
          onClick={onRetry}
          type="button"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500/40 dark:bg-rose-500 dark:hover:bg-rose-600"
        >
          আবার চেষ্টা করুন
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500/40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          পৃষ্ঠাটি রিফ্রেশ করুন
        </button>
      )}
    </div>
  );
};
