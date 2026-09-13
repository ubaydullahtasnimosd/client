import React, { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const cx = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Reusable Pagination Component with URL sync (?page=X)
 * 
 * Rules:
 * - 9 items per page (pageSize = 9)
 * - Pagination activates ONLY when total items >= 10 (disabled/hidden if <= 9)
 * - Aligned to the right side (flex justify-end)
 * - URL synchronisation: updates and respects ?page=X in the URL
 * - Visual style matching clean pill card with active indicator and chevrons
 * 
 * @param {number} currentPage - 1-based current active page (optional if synced with url)
 * @param {number} totalItems - Total count of items
 * @param {number} pageSize - Number of items per page (default: 9)
 * @param {number} totalPages - Optional override for total pages
 * @param {function} onPageChange - Callback when page changes (newPage: number) => void
 * @param {boolean} disabled - Optional force disable
 * @param {boolean} syncUrl - Whether to automatically sync page number to URL query param (default: true)
 * @param {string} className - Optional container class names
 */
export const Pagination = ({
  currentPage: propCurrentPage,
  totalItems = 0,
  pageSize = 9,
  totalPages: propTotalPages,
  onPageChange,
  disabled = false,
  syncUrl = true,
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query parameter ?page=X sync
  const pageFromUrl = parseInt(searchParams.get("page") || "", 10);
  const calculatedTotalPages = Math.ceil((totalItems || 0) / pageSize);
  const totalPages = propTotalPages !== undefined ? propTotalPages : calculatedTotalPages;
  const hasPagination = (totalItems >= 10 || propTotalPages !== undefined) && totalPages > 1;

  const currentPage =
    propCurrentPage !== undefined
      ? propCurrentPage
      : !isNaN(pageFromUrl) && pageFromUrl >= 1
      ? pageFromUrl
      : 1;

  // Auto-sync ?page=1 to URL when pagination exists and page query param is missing or out of bounds
  useEffect(() => {
    if (!syncUrl || !hasPagination) return;

    const pageParam = searchParams.get("page");
    const parsed = parseInt(pageParam || "", 10);

    if (!pageParam || isNaN(parsed) || parsed < 1) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", String(currentPage || 1));
          return next;
        },
        { replace: true }
      );
    } else if (totalPages > 1 && parsed > totalPages) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", String(totalPages));
          return next;
        },
        { replace: true }
      );
    }
  }, [syncUrl, hasPagination, searchParams, setSearchParams, totalPages, currentPage]);

  // Rule: Hide/disable pagination if total items are 9 or fewer (or totalPages <= 1)
  if (!hasPagination) {
    return null;
  }

  const handlePageClick = (page) => {
    if (disabled || page < 1 || page > totalPages) {
      return;
    }

    // Automatically update ?page=X in URL search params
    if (syncUrl) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (next.get("page") !== page.toString()) {
          next.set("page", page.toString());
        }
        return next;
      });
    }

    if (page === currentPage) {
      return;
    }

    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always include page 1
    pages.push(1);

    const leftSiblingIndex = Math.max(currentPage - 1, 2);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3;
      for (let i = 2; i <= leftItemCount + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push("...");
      const rightItemCount = 3;
      for (let i = totalPages - rightItemCount; i < totalPages; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push("...");
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div
      className={cx(
        "flex w-full justify-end items-center mt-8 sm:mt-12",
        className
      )}
      aria-label="পেজিনেশন কন্ট্রোল"
    >
      <nav
        aria-label="Pagination"
        className={cx(
          "inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl border",
          "border-stone-200/90 bg-white shadow-xs",
          " ",
          disabled && "opacity-60 pointer-events-none"
        )}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={isFirstPage || disabled}
          aria-label="পূর্ববর্তী পৃষ্ঠা"
          title="পূর্ববর্তী পৃষ্ঠা"
          className={cx(
            "h-9 w-9 flex items-center justify-center rounded-xl text-stone-500 transition-all duration-200",
            isFirstPage || disabled
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-stone-100 hover:text-stone-900 active:scale-95    cursor-pointer"
          )}
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((page, idx) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="h-9 min-w-[32px] sm:min-w-[36px] flex items-center justify-center text-xs sm:text-sm font-semibold text-stone-400 select-none"
              >
                •••
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => handlePageClick(page)}
              disabled={disabled}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "h-9 min-w-[34px] sm:min-w-[38px] px-2 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none",
                isActive
                  ? "bg-[#E5A93C] text-stone-950 shadow-xs scale-100"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-950 active:scale-95   "
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={isLastPage || disabled}
          aria-label="পরবর্তী পৃষ্ঠা"
          title="পরবর্তী পৃষ্ঠা"
          className={cx(
            "h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-200",
            isLastPage || disabled
              ? "opacity-30 text-stone-400 cursor-not-allowed bg-transparent"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-950 active:scale-95     cursor-pointer"
          )}
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
