export default function Pagination({
  currentPage,
  setCurrentPage,
  handlePageChange,
  totalPages,
  filteredOrders,
  startIndex,
  itemsPerPage,
}) {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          মোট <span className="font-medium">{filteredOrders.length}</span>{" "}
          অর্ডারের মধ্যে{" "}
          <span className="font-medium">
            {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)}
          </span>{" "}
          দেখানো হচ্ছে
        </p>
      </div>

      <div className="flex space-x-1">
        <button
          onClick={() => {
            const prev = Math.max(1, currentPage - 1);
            setCurrentPage(prev);
            handlePageChange?.(prev);
          }}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          পূর্ববর্তী
        </button>

        {Array.from({ length: 3 }, (_, i) => {
          const page = currentPage - 1 + i;
          if (page < 1 || page > totalPages) return null;
          return (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                handlePageChange?.(page);
              }}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-amber-500 text-white border border-amber-500"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => {
            const next = Math.min(totalPages, currentPage + 1);
            setCurrentPage(next);
            handlePageChange?.(next);
          }}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          পরবর্তী
        </button>
      </div>
    </div>
  );
}
