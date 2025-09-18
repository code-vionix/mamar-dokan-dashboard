"use client";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./components/Pagination";
import OrdersTable from "./components/OrdersTable";
import ActionBar from "./components/ActionBar";

// Define types for our order data

// Mock data for demonstration - would be fetched from API in production
const mockOrders = [
  {
    id: "1",
    orderNumber: "JMD-10045",
    customerName: "Anushka Sharma",
    orderDate: "2025-05-05",
    total: 12500,
    paymentStatus: "paid",
    items: 2,
    shippingAddress: "Green Road, Dhaka",
    processingStage: "packaging",
  },
  {
    id: "2",
    orderNumber: "JMD-10046",
    customerName: "Rahul Dev",
    orderDate: "2025-05-06",
    total: 8750,
    paymentStatus: "paid",
    items: 1,
    shippingAddress: "Banani, Dhaka",
    processingStage: "quality-check",
  },
  {
    id: "3",
    orderNumber: "JMD-10047",
    customerName: "Priya Kapoor",
    orderDate: "2025-05-06",
    total: 24000,
    paymentStatus: "pending",
    items: 3,
    shippingAddress: "Khilgaon, Dhaka",
    processingStage: "ready-to-ship",
  },
  {
    id: "4",
    orderNumber: "JMD-10048",
    customerName: "Arjun Das",
    orderDate: "2025-05-07",
    total: 15500,
    paymentStatus: "paid",
    items: 2,
    shippingAddress: "Mirpur, Dhaka",
    processingStage: "packaging",
  },
  {
    id: "5",
    orderNumber: "JMD-10049",
    customerName: "Malini Roy",
    orderDate: "2025-05-07",
    total: 9200,
    paymentStatus: "paid",
    items: 1,
    shippingAddress: "Uttara, Dhaka",
    processingStage: "quality-check",
  },
];

const OrdersProcessingPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [sortField, setSortField] = useState("orderDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filterStage, setFilterStage] = useState("all");

  // Sort orders function
  const sortOrders = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[field] < b[field]) return sortDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setOrders(sortedOrders);
  };

  // Select all orders
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Select individual order
  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  // Mark selected orders as complete
  const markAsComplete = () => {
    // In production, this would make an API call
    alert(`Marking orders ${selectedOrders.join(", ")} as complete`);
    // Then refresh the data
  };

  // Update processing stage
  const updateProcessingStage = (id, stage) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, processingStage: stage } : order
      )
    );
  };

  // Filter orders by processing stage
  const filteredOrders =
    filterStage === "all"
      ? orders
      : orders.filter((order) => order.processingStage === filterStage);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Processing Orders
        </h1>
        <p className="text-gray-600">
          Manage orders currently in the processing workflow
        </p>
      </div>

      {/* Action Bar */}
      <ActionBar
        markAsComplete={markAsComplete}
        filteredOrders={filteredOrders}
        filterStage={filterStage}
        setFilterStage={setFilterStage}
        selectedOrders={selectedOrders} 
      />

      {/* Orders Table */}
      <OrdersTable
        handleSelectAll={handleSelectAll}
        sortOrders={sortOrders}
        filteredOrders={filteredOrders}
        handleSelectOrder={handleSelectOrder}
        updateProcessingStage={updateProcessingStage}
        selectedOrders={selectedOrders}
        orders={orders}
        sortField={sortField}
        sortDirection={sortDirection}
      />

      {/* Pagination */}
      <Pagination
        filteredOrders={filteredOrders}
        mockOrders={mockOrders}
        orders={orders}
      />
    </div>
  );
};

export default OrdersProcessingPage;
