import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

/**
 * A reusable pagination component for navigating through pages of data.
 */
const Pagination = ({
  currentPage,
  totalPages,
  paginate,
  nextPage,
  prevPage,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
}) => {
  // Ensure totalPages is a number, defaulting to 1 if not.
  const safeTotalPages = Number.isNaN(totalPages) ? 1 : Math.max(totalPages, 1);
  const safeTotalItems = Number.isNaN(totalItems) ? 0 : totalItems;

  // Conditionally render nothing if there are no items
  if (safeTotalItems === 0) {
    return null;
  }

  // Ensure the displayed indices are numbers, defaulting to 0 if not.
  const displayFirstIndex = Number.isNaN(indexOfFirstItem)
    ? 0
    : indexOfFirstItem + 1;
  const displayLastIndex = Number.isNaN(indexOfLastItem)
    ? 0
    : Math.min(indexOfLastItem, safeTotalItems);

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } cursor-pointer`}
        >
          পূর্ববর্তী
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } cursor-pointer`}
        >
          পরবর্তী
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{displayFirstIndex}</span> -{" "}
            <span className="font-medium">{displayLastIndex}</span> এর মধ্যে মোট{" "}
            <span className="font-medium">{safeTotalItems}</span> টি
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            {[...Array(safeTotalPages).keys()].map((number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === number + 1
                    ? "z-10 bg-amber-50 border-amber-500 text-amber-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                } cursor-pointer`}
              >
                {number + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50 cursor-pointer"
              } `}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
