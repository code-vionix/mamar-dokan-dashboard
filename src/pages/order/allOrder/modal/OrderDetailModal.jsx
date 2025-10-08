"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import ActionButtons from "../components/ActionButtons";
import CustomerInfo from "../components/CustomerInfo";
import Notes from "../components/Notes";
import OrderSummary from "../components/OrderSummary";
import Products from "../components/Products";
import UpdateOrderStaus from "../components/UpdateOrderStaus";
import UpdatePaymentStatus from "../components/UpdatePaymentStatus";

export default function OrderDetailModal({
  isDetailModalOpen,
  selectedOrder,
  setIsDetailModalOpen,
  handleStatusUpdate,
  handlePaymentStatusUpdate,
  getStatusBadge,
  formatDate,
}) {
  if (!isDetailModalOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto z-50 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
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

          {/* Sections */}
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
          />

          <UpdatePaymentStatus
            handlePaymentStatusUpdate={handlePaymentStatusUpdate}
            selectedOrder={selectedOrder}
          />

          <ActionButtons setIsDetailModalOpen={setIsDetailModalOpen} />
        </div>
      </motion.div>
    </div>
  );
}
