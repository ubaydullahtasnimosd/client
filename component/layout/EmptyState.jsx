export const EmptyState = ({
  title = "কোনো ডাটা পাওয়া যায়নি",
  message = "এই পেজের কনটেন্ট পরে যুক্ত করা হবে।",
}) => {
  return (
    <div
      className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60"
      role="status"
      aria-live="polite"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400"
        aria-hidden="true"
      >
        !
      </div>

      <h2 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {message}
      </p>
    </div>
  );
};
