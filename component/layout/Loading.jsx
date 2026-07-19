const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Loading = ({ size = "large", fullScreen = false, className = "" }) => {
  const isLarge = size === "large";

  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center space-y-4 w-full",
        fullScreen ? "min-h-[70vh] h-screen py-20" : isLarge ? "py-12" : "py-2",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="কনটেন্ট লোড হচ্ছে"
    >
      {/* Sleek Spinner */}
      <div className={cx("relative", isLarge ? "h-14 w-14" : "h-8 w-8")}>
        {/* Outer subtle ring track */}
        <div
          className={cx(
            "absolute inset-0 rounded-full border-slate-200 dark:border-slate-800/80",
            isLarge ? "border-4" : "border-3"
          )}
        />
        {/* Spinning accent ring */}
        <div
          className={cx(
            "absolute inset-0 animate-spin rounded-full border-t-emerald-600 border-r-transparent border-b-emerald-600 border-l-transparent motion-reduce:animate-none dark:border-t-emerald-400 dark:border-b-emerald-400",
            isLarge ? "border-4" : "border-3"
          )}
        />
      </div>

      {/* Loading text with animated bouncing dots */}
      {isLarge && (
        <div className="flex items-center space-x-1.5">
          <span className="animate-pulse text-sm font-semibold tracking-wide text-slate-500 motion-reduce:animate-none dark:text-slate-400">
            লোড হচ্ছে, একটু অপেক্ষা করুন
          </span>
          <div className="flex space-x-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-600 motion-reduce:animate-none dark:bg-emerald-400 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-600 motion-reduce:animate-none dark:bg-emerald-400 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-600 motion-reduce:animate-none dark:bg-emerald-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export const LoadingSpinner = Loading;
