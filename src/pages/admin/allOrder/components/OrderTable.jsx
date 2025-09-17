import { motion } from "framer-motion";
import { Eye, FileText, Loader2, Mail, MoreHorizontal, Printer, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

function OrderTable({
  fadeInUp,
  handleSortChange,
  paginatedOrders,
  handleViewOrder,
  getPaymentStatusBadge,
  getStatusBadge,
  formatDate,
  startIndex,
  handlePageChange,
  totalPages,
  filteredOrders,
  orders
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin mb-4" />
          <p className="text-amber-800">অর্ডার তালিকা লোড হচ্ছে...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => handleSortChange("orderNumber")}
                  >
                    অর্ডার নং
                    {sortField === "orderNumber" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => handleSortChange("date")}
                  >
                    তারিখ
                    {sortField === "date" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  গ্রাহক
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  পণ্য
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  মূল্য
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  পেমেন্ট
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <button
                    className="flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => handleSortChange("status")}
                  >
                    স্ট্যাটাস
                    {sortField === "status" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-amber-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {order.customer.avatar ? (
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                          <img
                            className="h-full w-full object-cover"
                            width={32}
                            src={order.customer.avatar}
                            alt={order.customer.name}
                          />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                          <span className="text-amber-700 font-medium">
                            {order.customer.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={order.products[0].image}
                          alt={order.products[0].name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {order.products[0].name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.products.length > 1
                            ? `+${order.products.length - 1} আরও পণ্য`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ৳{order.payment.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 mb-1">
                        {order.payment.method}
                      </div>
                      {getPaymentStatusBadge(order.payment.status)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-800"
                        title="অর্ডার বিস্তারিত দেখুন"
                      >
                        <Eye size={16} />
                      </button>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          title="আরও অপশন"
                        >
                          <MoreHorizontal  size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                /* handle print invoice */
                              }}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full text-left"
                            >
                              <Printer size={14} className="mr-2" />
                              ইনভয়েস প্রিন্ট করুন
                            </button>
                            <button
                              onClick={() => {
                                /* handle send email */
                              }}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full text-left"
                            >
                              <Mail size={14} className="mr-2" />
                              ইমেইল পাঠান
                            </button>
                            <button
                              onClick={() => {
                                /* handle download invoice */
                              }}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full text-left"
                            >
                              <FileText size={14} className="mr-2" />
                              ইনভয়েস ডাউনলোড করুন
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-amber-50/50">
          <ShoppingBag className="h-12 w-12 text-amber-400 mb-4" />
          <h3 className="text-lg font-medium text-amber-800 mb-1">
            কোন অর্ডার পাওয়া যায়নি
          </h3>
          <p className="text-amber-600">
            অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
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
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              পূর্ববর্তী
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-amber-500 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
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
      )}
    </motion.div>
  );
}

export default OrderTable;
