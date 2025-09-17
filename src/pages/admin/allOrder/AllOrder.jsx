import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  CheckCircle,
  Clock,
  Truck,
  PackageOpen,
  XCircle,
  Printer,
} from "lucide-react";
import Header from "./components/Header";
import OrderStats from "./components/OrderStats";
import FiltersAndControls from "./components/FiltersAndControls";
import OrderTable from "./components/OrderTable";
import { mockOrders } from "./components/Data";
import ActionButtons from "./components/ActionButtons";
import UpdateOrderStaus from "./components/UpdateOrderStaus";
import Notes from "./components/Notes";
import Products from "./components/Products";
import CustomerInfo from "./components/CustomerInfo";
import OrderSummary from "./components/OrderSummary";

// Order type definition

export default function OrderManagement() {
  // State variables
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  console.log(filteredOrders);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...orders];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (dateFilter) {
        case "today":
          result = result.filter((order) => new Date(order.date) >= today);
          break;
        case "yesterday": {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          result = result.filter(
            (order) =>
              new Date(order.date) >= yesterday && new Date(order.date) < today
          );
          break;
        }
        case "thisWeek": {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          result = result.filter((order) => new Date(order.date) >= weekStart);
          break;
        }
        case "thisMonth": {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          result = result.filter((order) => new Date(order.date) >= monthStart);
          break;
        }
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // Handle nested fields
      if (sortField === "date") {
        valueA = new Date(a.date).getTime();
        valueB = new Date(b.date).getTime();
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter, dateFilter, sortField, sortDirection]);

  // Fetch orders (mock implementation)
  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      // In a real implementation, fetch from your API
      // const response = await fetch('/api/admin/orders');
      // const data = await response.json();

      // For demo purposes, use mock data
      await new Promise((resolve) => setTimeout(resolve, 800));

      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    if (statusUpdateLoading) return;

    setStatusUpdateLoading(true);

    try {
      // In real implementation, update via API
      // await fetch(`/api/admin/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });

      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // If updating the selected order, update that too
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Handle viewing order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get status badge component based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-xs font-medium">
            <Clock size={12} className="mr-1" />
            অপেক্ষারত
          </span>
        );
      case "processing":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center text-xs font-medium">
            <PackageOpen size={12} className="mr-1" />
            প্রস্তুত হচ্ছে
          </span>
        );
      case "shipped":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center text-xs font-medium">
            <Truck size={12} className="mr-1" />
            শিপ করা হয়েছে
          </span>
        );
      case "delivered":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-xs font-medium">
            <CheckCircle size={12} className="mr-1" />
            ডেলিভারি হয়েছে
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center text-xs font-medium">
            <XCircle size={12} className="mr-1" />
            বাতিল করা হয়েছে
          </span>
        );
      case "returned":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full flex items-center text-xs font-medium">
            <RefreshCw size={12} className="mr-1" />
            ফেরত
          </span>
        );
      default:
        return null;
    }
  };

  // Get payment status badge component
  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            পরিশোধিত
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
            অপেক্ষমান
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            ব্যর্থ
          </span>
        );
      case "refunded":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            ফেরত দেওয়া হয়েছে
          </span>
        );
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate total order amount and count by status
  const orderStats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    processing: orders.filter((order) => order.status === "processing").length,
    shipped: orders.filter((order) => order.status === "shipped").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
    returned: orders.filter((order) => order.status === "returned").length,
    totalAmount: orders.reduce((sum, order) => sum + order.payment.amount, 0),
  };

  // Animation variants for Framer Motion
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
      {/* Header */}

      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Order Stats */}
        <OrderStats fadeIn={fadeIn} orderStats={orderStats} />

        {/* Filters and Controls */}
        <FiltersAndControls fadeIn={fadeIn} fetchOrders={fetchOrders} />

        {/* Orders Table */}
        <OrderTable
          fadeIn={fadeIn}
          handleSortChange={handleSortChange}
          paginatedOrders={paginatedOrders}
          handleViewOrder={handleViewOrder}
          getPaymentStatusBadge={getPaymentStatusBadge}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
          startIndex={startIndex}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          fadeInUp={fadeInUp}
          filteredOrders={filteredOrders}
          orders={orders}
        />
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  অর্ডার বিস্তারিত - {selectedOrder.orderNumber}
                </h3>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </button>
              </div>

              {/* Order summary */}
              <OrderSummary
                selectedOrder={selectedOrder}
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />

              {/* Customer info */}
              <CustomerInfo selectedOrder={selectedOrder} />

              {/* Products */}
              <Products selectedOrder={selectedOrder} />

              {/* Notes */}
              {selectedOrder.notes && <Notes selectedOrder={selectedOrder} />}

              {/* Update order status */}
              <UpdateOrderStaus
                handleStatusUpdate={handleStatusUpdate}
                selectedOrder={selectedOrder}
                statusUpdateLoading={statusUpdateLoading}
              />

              {/* Action buttons */}
              <ActionButtons setIsDetailModalOpen={setIsDetailModalOpen} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
