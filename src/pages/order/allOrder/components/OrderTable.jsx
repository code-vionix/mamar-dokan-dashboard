import { motion } from "framer-motion";
import React from "react";
import LoaderOrEmptyState from "./LoaderOrEmptyState";
import OrderTableHeader from "./OrderTableHeader";
import OrderTableRow from "./OrderTableRow";
import Pagination from "./Pagination";

export default function OrderTable({
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
  currentPage,
  setCurrentPage,
  isLoading,
  itemsPerPage,
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
    >
      <LoaderOrEmptyState
        isLoading={isLoading}
        filteredOrders={filteredOrders}
      />

      {!isLoading && filteredOrders.length > 0 && (
        <>
          <div className="overflow-x-auto" id="print-section">
            <table className="min-w-full divide-y divide-gray-200">
              <OrderTableHeader />
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <OrderTableRow
                    key={order.id}
                    order={order}
                    handleViewOrder={handleViewOrder}
                    getPaymentStatusBadge={getPaymentStatusBadge}
                    getStatusBadge={getStatusBadge}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            filteredOrders={filteredOrders}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </motion.div>
  );
}
