import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  PackageOpen,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ActionButtons from "./components/ActionButtons";
import CustomerInfo from "./components/CustomerInfo";
import FiltersAndControls from "./components/FiltersAndControls";
import Header from "./components/Header";
import Notes from "./components/Notes";
import OrderStats from "./components/OrderStats";
import OrderSummary from "./components/OrderSummary";
import OrderTable from "./components/OrderTable";
import Products from "./components/Products";
import UpdateOrderStaus from "./components/UpdateOrderStaus";
import UpdatePaymentStatus from "./components/UpdatePaymentStatus";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // filter / control states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [isLoading, setIsLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);

  // fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // fetch orders from API and map to UI shape
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json?.message || "Failed to fetch orders");
      }

      const ordersData = json.data.map((order) => {
        // convert items -> products array expected by UI
        const products = (order.items || []).map((it) => ({
          id: it.productId,
          sku: it.sku,
          name: it.sku || `Product ${it.productId?.slice?.(0, 6) ?? ""}`,
          image:
            it.productImage ||
            `https://via.placeholder.com/40?text=${encodeURIComponent(
              (it.sku && it.sku.charAt(0)) || "P"
            )}`,
          quantity:
            it.quantity ?? it.quantity ?? (it.quantity === 0 ? 0 : it.quantity),
          price: it.price ?? it.price,
          total: it.total ?? it.total,
        }));

        return {
          ...order,
          // UI-friendly fields
          orderNumber: order.id,
          date: order.createdAt,
          customer: {
            id: order.user?.id,
            name: order.user?.name ?? order.user?.email ?? "Unknown",
            email: order.user?.email ?? "",
            avatar: order.user?.avatarUrl ?? order.user?.avatar ?? null,
          },
          payment: {
            amount: order.totalAmount ?? order.total ?? 0,
            method: order.paymentMethod ?? order.payment?.method ?? "COD",
            status: order.paymentStatus ?? order.payment?.status ?? "PENDING",
          },
          products,
        };
      });

      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering / searching / sorting effect
  useEffect(() => {
    let result = [...orders];

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const id = (order.id ?? "").toString().toLowerCase();
        const orderNumber = (order.orderNumber ?? "").toString().toLowerCase();
        const name = (order.customer?.name ?? "").toLowerCase();
        const email = (order.customer?.email ?? "").toLowerCase();

        return (
          id.includes(q) ||
          orderNumber.includes(q) ||
          name.includes(q) ||
          email.includes(q)
        );
      });
    }

    // status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (o) =>
          (o.status ?? "").toString().toLowerCase() ===
          statusFilter.toLowerCase()
      );
    }

    // date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      switch (dateFilter) {
        case "today":
          result = result.filter((o) => new Date(o.date) >= today);
          break;
        case "yesterday": {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          result = result.filter(
            (o) => new Date(o.date) >= yesterday && new Date(o.date) < today
          );
          break;
        }
        case "thisWeek": {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          result = result.filter((o) => new Date(o.date) >= weekStart);
          break;
        }
        case "thisMonth": {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          result = result.filter((o) => new Date(o.date) >= monthStart);
          break;
        }
      }
    }

    // sorting by date desc by default
    result.sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return tb - ta;
    });

    setFilteredOrders(result);
    setCurrentPage(1); // reset page when filters change
  }, [orders, searchQuery, statusFilter, dateFilter]);

  // Pagination helpers
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // view order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // update order status (PATCH /order/{id}/status)
  const handleStatusUpdate = async (orderId, newStatus) => {
    if (statusUpdateLoading) return;
    setStatusUpdateLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.message || "Failed");
      const updated = json.data;

      // merge update into local state: server returns updated order in `data`
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                ...updated,
                // keep UI-friendly fields consistent
                status: updated.status ?? o.status,
                payment: {
                  ...o.payment,
                  status: updated.paymentStatus ?? o.payment.status,
                },
              }
            : o
        )
      );

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((s) => ({ ...s, ...updated }));
      }
    } catch (err) {
      console.error("❌ Error updating order status:", err);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // update payment status (PATCH /order/{id}/payment-status)
  const handlePaymentStatusUpdate = async (orderId, newStatus) => {
    if (paymentStatusLoading) return;
    setPaymentStatusLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${orderId}/payment-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.message || "Failed");

      const updated = json.data;

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                ...updated,
                payment: {
                  ...o.payment,
                  status: updated.paymentStatus ?? o.payment.status,
                  method: updated.paymentMethod ?? o.payment.method,
                },
              }
            : o
        )
      );

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((s) => ({ ...s, ...updated }));
      }
    } catch (err) {
      console.error("❌ Error updating payment status:", err);
    } finally {
      setPaymentStatusLoading(false);
    }
  };

  // badges
  const getStatusBadge = (status) => {
    switch ((status || "").toString().toUpperCase()) {
      case "PENDING":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-xs font-medium">
            <Clock size={12} className="mr-1" />
            অপেক্ষারত
          </span>
        );
      case "PROCESSING":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center text-xs font-medium">
            <PackageOpen size={12} className="mr-1" />
            প্রস্তুত হচ্ছে
          </span>
        );
      case "SHIPPED":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center text-xs font-medium">
            <Truck size={12} className="mr-1" />
            শিপ করা হয়েছে
          </span>
        );
      case "DELIVERED":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-xs font-medium">
            <CheckCircle size={12} className="mr-1" />
            ডেলিভারি হয়েছে
          </span>
        );
      case "CANCELLED":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center text-xs font-medium">
            <XCircle size={12} className="mr-1" />
            বাতিল করা হয়েছে
          </span>
        );
      case "REFUNDED":
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

  const getPaymentStatusBadge = (status) => {
    switch ((status || "").toString().toUpperCase()) {
      case "PAID":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            পরিশোধিত
          </span>
        );
      case "PENDING":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
            অপেক্ষমান
          </span>
        );
      case "FAILED":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            ব্যর্থ
          </span>
        );
      case "REFUNDED":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            ফেরত দেওয়া হয়েছে
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => (o.status || "").toUpperCase() === "PENDING")
      .length,
    processing: orders.filter(
      (o) => (o.status || "").toUpperCase() === "PROCESSING"
    ).length,
    shipped: orders.filter((o) => (o.status || "").toUpperCase() === "SHIPPED")
      .length,
    delivered: orders.filter(
      (o) => (o.status || "").toUpperCase() === "DELIVERED"
    ).length,
    cancelled: orders.filter(
      (o) => (o.status || "").toUpperCase() === "CANCELLED"
    ).length,
    returned: orders.filter(
      (o) => (o.status || "").toUpperCase() === "REFUNDED"
    ).length,
    totalAmount: orders.reduce((sum, o) => sum + (o.payment?.amount || 0), 0),
  };

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
            setCurrentPage(() => 1);
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
          handlePageChange={(p) => setCurrentPage(p)}
          totalPages={totalPages}
          filteredOrders={filteredOrders}
          orders={orders}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto z-50 p-4">
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

              <OrderSummary
                selectedOrder={selectedOrder}
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />
              <CustomerInfo selectedOrder={selectedOrder} />
              <Products selectedOrder={selectedOrder} />
              {selectedOrder.notes && <Notes selectedOrder={selectedOrder} />}

              <UpdateOrderStaus
                handleStatusUpdate={handleStatusUpdate}
                selectedOrder={selectedOrder}
                statusUpdateLoading={statusUpdateLoading}
              />

              <UpdatePaymentStatus
                handlePaymentStatusUpdate={handlePaymentStatusUpdate}
                selectedOrder={selectedOrder}
                paymentStatusLoading={paymentStatusLoading}
              />

              <ActionButtons setIsDetailModalOpen={setIsDetailModalOpen} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
