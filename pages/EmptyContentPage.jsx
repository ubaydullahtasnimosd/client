import { EmptyState } from "../component/layout/EmptyState";
import Title from "../utils/pageTitle";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export const EmptyContentPage = ({
  title,
  badge,
  description = "এই পেজের কনটেন্ট পরে যুক্ত করা হবে।",
}) => {
  return (
    <main
      className={cx(
        "py-10 md:py-14 min-h-screen",
        "bg-slate-50/60 text-slate-900",
        "dark:bg-slate-950 dark:text-slate-50"
      )}
    >
      <Title title={title} />

      <div className={container}>
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold tracking-tight bg-white/70 backdrop-blur shadow-sm border-slate-200/70 dark:bg-slate-950/60 dark:border-slate-800">
            {badge}
          </div>

          <h1 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-600 dark:text-slate-300">
            {description}
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-slate-200 dark:bg-slate-800" />
        </header>

        <div className="mt-10">
          <EmptyState />
        </div>
      </div>
    </main>
  );
};
