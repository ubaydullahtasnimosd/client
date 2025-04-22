import { FaArrowUp } from "react-icons/fa";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative p-10 bg-[#f5f5f5] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Copyright &copy; {new Date().getFullYear()} - by <span className="font-bold">উবায়দুল্লাহ তাসনিম</span>
        </p>
        <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
          ওয়েব সাইট বিকাশ করেছেন <a className="underline font-bold" href="https://najmusshakib.netlify.app/" target="_blank">নাজমুস সাকিব</a>
        </p>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-xl font-bold" />
      </button>
    </footer>
  );
};
