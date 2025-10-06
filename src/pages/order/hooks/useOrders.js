import { useEffect, useState } from "react";

// optionally, import your utils
import { getPaymentStatusBadge, getStatusBadge } from "../utils/getBadges";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // filter / control states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [isLoading, setIsLoading] = useState(true);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order`);
      const json = await res.json();

      if (!res.ok || !json.success)
        throw new Error(json?.message || "Failed to fetch");

      const data = json.data.map((order) => {
        const products = (order.items || []).map((it) => ({
          id: it.product.id,
          name: it.product.name ?? `Unnamed`,
          image:
            it.product.images?.[0] ||
            `https://via.placeholder.com/40?text=${encodeURIComponent(
              it.product.name?.[0] ?? "P"
            )}`,
        }));

        return {
          ...order,
          orderNumber: order.id,
          date: order.createdAt,
          customer: {
            id: order.user?.id,
            name: order.user?.name ?? order.user?.email ?? "Unknown",
            email: order.user?.email ?? "",
            avatar: order.user?.avatarUrl ?? null,
          },
          payment: {
            amount: order.totalAmount ?? order.total ?? 0,
            method: order.paymentMethod ?? "COD",
            status: order.paymentStatus ?? "PENDING",
          },
          products,
        };
      });

      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering effect
  useEffect(() => {
    let result = [...orders];
    const q = searchQuery.toLowerCase();

    if (q) {
      result = result.filter((o) => {
        const id = (o.id ?? "").toString().toLowerCase();
        const orderNumber = (o.orderNumber ?? "").toString().toLowerCase();
        const name = (o.customer?.name ?? "").toLowerCase();
        const email = (o.customer?.email ?? "").toLowerCase();

        return (
          id.includes(q) ||
          orderNumber.includes(q) ||
          name.includes(q) ||
          email.includes(q)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (o) => (o.status ?? "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // today 00:00:00

      switch (dateFilter) {
        case "today":
          result = result.filter((o) => new Date(o.date) >= today);
          break;

        case "yesterday": {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1); // yesterday 00:00:00
          result = result.filter(
            (o) => new Date(o.date) >= yesterday && new Date(o.date) < today
          );
          break;
        }

        case "thisWeek": {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay()); // Sunday 00:00:00
          result = result.filter((o) => new Date(o.date) >= weekStart);
          break;
        }

        case "thisMonth": {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1); // first day of month 00:00:00
          result = result.filter((o) => new Date(o.date) >= monthStart);
          break;
        }
      }
    }

    // sort descending by date
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [orders, searchQuery, statusFilter, dateFilter]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  // Update order status
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

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, ...updated, status: updated.status ?? o.status }
            : o
        )
      );

      if (selectedOrder?.id === orderId)
        setSelectedOrder((s) => ({ ...s, ...updated }));
    } catch (err) {
      console.error("❌ Error updating order status:", err);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Update payment status
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
                payment: { ...o.payment, ...updated.payment },
              }
            : o
        )
      );

      if (selectedOrder?.id === orderId)
        setSelectedOrder((s) => ({ ...s, ...updated }));
    } catch (err) {
      console.error("❌ Error updating payment status:", err);
    } finally {
      setPaymentStatusLoading(false);
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
    pending: orders.filter((o) => (o.status ?? "").toUpperCase() === "PENDING")
      .length,
    processing: orders.filter(
      (o) => (o.status ?? "").toUpperCase() === "PROCESSING"
    ).length,
    shipped: orders.filter((o) => (o.status ?? "").toUpperCase() === "SHIPPED")
      .length,
    delivered: orders.filter(
      (o) => (o.status ?? "").toUpperCase() === "DELIVERED"
    ).length,
    cancelled: orders.filter(
      (o) => (o.status ?? "").toUpperCase() === "CANCELLED"
    ).length,
    returned: orders.filter(
      (o) => (o.status ?? "").toUpperCase() === "REFUNDED"
    ).length,
    confirmed: orders.filter(
      (o) => (o.status ?? "").toUpperCase() === "CONFIRMED"
    ).length,
    totalAmount: orders.reduce((sum, o) => sum + (o.payment?.amount || 0), 0),
  };

  return {
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
  };
}
