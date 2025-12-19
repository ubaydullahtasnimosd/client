import { FaArrowUp } from "react-icons/fa";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={cx(
        "relative border-t py-10",
        "border-slate-200/70 bg-white",
        "dark:border-slate-800/70 dark:bg-slate-950"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Copyright &copy; {new Date().getFullYear()} - by{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            উবায়দুল্লাহ তাসনিম
          </span>
        </p>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={cx(
          "fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full",
          "bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10",
          "transition duration-200 hover:-translate-y-0.5 hover:shadow-xl",
          "active:translate-y-0 active:shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
          "dark:bg-slate-900 dark:text-slate-100 dark:ring-white/10"
        )}
      >
        <FaArrowUp className="text-base" />
      </button>
    </footer>
  );
};
