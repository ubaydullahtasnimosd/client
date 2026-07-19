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
            "absolute inset-0 rounded-full border-t-emerald-600 border-r-transparent border-b-emerald-600 border-l-transparent animate-spin dark:border-t-emerald-400 dark:border-b-emerald-400",
            isLarge ? "border-4" : "border-3"
          )}
        />
      </div>

      {/* Loading text with animated bouncing dots */}
      {isLarge && (
        <div className="flex items-center space-x-1.5">
          <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 animate-pulse">
            লোড হচ্ছে একটু অপেক্ষা করুন
          </span>
          <div className="flex space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
};

export const LoadingSpinner = Loading;
