export const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center py-20 space-y-3">
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full border-[5px] border-slate-200 dark:border-slate-800 opacity-70" />
      <div className="absolute inset-0 rounded-full border-t-[5px] border-b-[5px] border-blue-600 dark:border-blue-400 animate-spin duration-1000 ease-linear" />
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-base font-semibold text-slate-600 dark:text-slate-300 tracking-wide">
        LOADING
      </span>
      <div className="flex space-x-1">
        <span className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce delay-75" />
        <span className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce delay-150" />
        <span className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce delay-300" />
      </div>
    </div>
  </div>
);
