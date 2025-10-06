import { motion } from "framer-motion";
import {
  Copy,
  Eye,
  FileText,
  Loader2,
  Mail,
  MoreHorizontal,
  Printer,
  ShoppingBag,
} from "lucide-react";
import React, { useState } from "react";
import normalizeOrder from "../../lib/normalizeOrder";

function OrderTable({
  fadeInUp,
  paginatedOrders = [],
  handleViewOrder,
  getPaymentStatusBadge,
  getStatusBadge,
  formatDate,
  startIndex = 0,
  handlePageChange,
  totalPages = 1,
  filteredOrders = [],
  orders = [],
  currentPage,
  setCurrentPage,
  isLoading,
  itemsPerPage,
}) {
  const [copied, setCopied] = useState({});
  /* handler start */
  const handleCopy = async (orderNumber) => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied((prev) => ({ ...prev, [orderNumber]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [orderNumber]: false }));
      }, 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  /* handler end */
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
        <div className="overflow-x-auto" id="print-section">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  অর্ডার নং
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  তারিখ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  গ্রাহক
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  পণ্য
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  পরিমান
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  মূল্য
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  পেমেন্ট
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  স্ট্যাটাস
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  অ্যাকশন
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((rawOrder) => {
                const order = normalizeOrder(rawOrder);
                const firstProduct =
                  (order.products && order.products[0]) || null;

                return (
                  <tr key={order.id} className="hover:bg-amber-50">
                    <td
                      className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                      onClick={() => handleCopy(order.orderNumber)}
                      title="কপি করুন"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-1">
                          {order.orderNumber}
                          <Copy
                            size={14}
                            className="text-gray-400 hover:text-gray-600"
                          />
                        </div>
                        {copied[order.orderNumber] && (
                          <span className="text-green-600 text-xs ">
                            ✅ কপি হয়েছে
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate
                        ? formatDate(order.date)
                        : new Date(order.date).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.customer?.avatar ? (
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
                              {(order.customer?.name || "U").charAt(0)}
                            </span>
                          </div>
                        )}

                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.customer?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {firstProduct ? (
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={firstProduct.image}
                              alt={firstProduct.name}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {firstProduct.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.products.length > 1
                                ? `+${order.products.length - 1} আরও পণ্য`
                                : ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center">
                      {firstProduct ? firstProduct.quantity : "-"}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ৳{(order?.payment?.amount ?? 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 mb-1">
                          {order.payment?.method}
                        </div>
                        {typeof getPaymentStatusBadge === "function"
                          ? getPaymentStatusBadge(
                              order?.payment?.status.toUpperCase()
                            )
                          : null}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {typeof getStatusBadge === "function"
                        ? getStatusBadge(order.status)
                        : order.status}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() =>
                            handleViewOrder && handleViewOrder(order)
                          }
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
                            <MoreHorizontal size={16} />
                          </button>

                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  /* handle print invoice - implement in parent if needed */
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
                );
              })}
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
            {/* Previous Button */}
            <button
              onClick={() => {
                const prev = Math.max(1, currentPage - 1);
                setCurrentPage(prev);
                handlePageChange && handlePageChange(prev);
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

            {/* Page Numbers */}
            {Array.from({ length: 3 }, (_, i) => {
              const pageNumber = currentPage - 1 + i;
              if (pageNumber < 1 || pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                    handlePageChange && handlePageChange(pageNumber);
                  }}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNumber
                      ? "bg-amber-500 text-white border border-amber-500"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => {
                const next = Math.min(totalPages, currentPage + 1);
                setCurrentPage(next);
                handlePageChange && handlePageChange(next);
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
      )}
    </motion.div>
  );
}

export default OrderTable;
