import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorMessage = ({ message = "ডেটা লোড করতে সমস্যা হয়েছে" }) => (
  <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-fade-in">
    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
      <ExclamationTriangleIcon className="h-8 w-8 text-red-500 dark:text-red-400 animate-pulse" />
    </div>

    <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
      {message}
    </h3>

    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
      দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন বা রিফ্রেশ করুন
    </p>

    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 text-sm font-medium"
    >
      রিফ্রেশ করুন
    </button>
  </div>
);
