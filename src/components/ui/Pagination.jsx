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
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 text-sm border rounded-md ${
                currentPage === i + 1
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
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