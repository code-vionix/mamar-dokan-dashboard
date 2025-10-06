import React from "react";
import useOrders from "../hooks/useOrders.js";
import FiltersAndControls from "./components/FiltersAndControls";
import Header from "./components/Header";
import OrderStats from "./components/OrderStats";
import OrderTable from "./components/OrderTable";
import OrderDetailModal from "./modal/OrderDetailModal";

export default function OrderManagement() {
  /* hook state */
  const {
    orders,
    filteredOrders,
    paginatedOrders,
    selectedOrder,
    isDetailModalOpen,
    isLoading,
    orderStats,
    totalPages,
    currentPage,
    startIndex,
    itemsPerPage,
    handleViewOrder,
    handlePageChange,
    setIsDetailModalOpen,
    handleStatusUpdate,
    handlePaymentStatusUpdate,
    statusUpdateLoading,
    paymentStatusLoading,
    getPaymentStatusBadge,
    getStatusBadge,
    formatDate,
    fetchOrders,
    setSearchQuery,
    setStatusFilter,
    setDateFilter,
    setItemsPerPage,
    searchQuery,
    statusFilter,
    dateFilter,
  } = useOrders();
  /* hook end */
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <OrderStats fadeIn={fadeIn} orderStats={orderStats} />

        <FiltersAndControls
          fadeIn={fadeIn}
          fetchOrders={fetchOrders}
          isLoading={isLoading}
          // wire control props so controls are driven by parent state
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(n) => {
            setItemsPerPage(n);
            handlePageChange(1);
          }}
        />

        <OrderTable
          fadeInUp={fadeInUp}
          paginatedOrders={paginatedOrders}
          handleViewOrder={handleViewOrder}
          getPaymentStatusBadge={getPaymentStatusBadge}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
          startIndex={startIndex}
          handlePageChange={(p) => handlePageChange(p)}
          totalPages={totalPages}
          filteredOrders={filteredOrders}
          orders={orders}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          isLoading={isLoading}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <OrderDetailModal
        isDetailModalOpen={isDetailModalOpen}
        selectedOrder={selectedOrder}
        setIsDetailModalOpen={setIsDetailModalOpen}
        handleStatusUpdate={handleStatusUpdate}
        statusUpdateLoading={statusUpdateLoading}
        handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        paymentStatusLoading={paymentStatusLoading}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
      />
    </div>
  );
}
