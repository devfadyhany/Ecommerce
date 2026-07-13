import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  return [...pages].sort((a, b) => a - b);
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-card rounded-b-2xl">
      <span className="text-xs sm:text-sm text-ink-faint">
        Page <span className="font-semibold text-ink">{currentPage}</span> of{" "}
        <span className="font-semibold text-ink">{totalPages}</span>
      </span>

      <div className="flex items-center gap-1 sm:gap-1.5">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 sm:p-2 rounded-lg text-ink-faint hover:bg-surface-fields disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        {pageNumbers.map((num, idx) => {
          const prevNum = pageNumbers[idx - 1];
          const showEllipsis = prevNum && num - prevNum > 1;

          return (
            <div key={num} className="flex items-center gap-1 sm:gap-1.5">
              {showEllipsis && (
                <span className="px-1 text-ink-faint text-xs sm:text-sm">…</span>
              )}
              <button
                onClick={() => onPageChange(num)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  num === currentPage
                    ? "bg-ink text-surface"
                    : "text-ink-soft hover:bg-surface-fields"
                }`}
              >
                {num}
              </button>
            </div>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 sm:p-2 rounded-lg text-ink-faint hover:bg-surface-fields disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;