export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-5">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Ubaydullah tasnim. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
