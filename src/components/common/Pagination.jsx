import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className = ""
}) => {
  if (totalPages <= 1) return null;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > maxVisible) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (maxVisible - 1)) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`px-6 py-3 bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan {indexOfFirst + 1}-{Math.min(indexOfLast, totalItems)} dari {totalItems} items
        </div>
        <div className="flex gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>

          {pages.map((page, i) =>
            page === "..." ? (
              <span key={i} className="px-3 py-1 text-sm">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  currentPage === page
                    ? "bg-primary-600 text-white border-primary-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
