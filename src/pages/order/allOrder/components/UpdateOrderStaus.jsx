import { Loader2 } from "lucide-react";
import React, { useState } from "react";

function UpdateOrderStatus({ handleStatusUpdate, selectedOrder }) {
  // Track which status is being updated
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const statuses = [
    { key: "PENDING", label: "অপেক্ষারত", color: "orange" },
    { key: "PROCESSING", label: "প্রস্তুত হচ্ছে", color: "amber" },
    { key: "SHIPPED", label: "শিপ করা হয়েছে", color: "purple" },
    { key: "DELIVERED", label: "ডেলিভারি হয়েছে", color: "blue" },
    { key: "CANCELLED", label: "বাতিল করা হয়েছে", color: "red" },
    { key: "REFUNDED", label: "ফেরত", color: "gray" },
    { key: "CONFIRMED", label: "নিশ্চিত", color: "green" },
  ];

  const handleClick = async (statusKey) => {
    setUpdatingStatus(statusKey);
    try {
      await handleStatusUpdate(selectedOrder.id, statusKey);
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h4 className="font-medium text-gray-800 mb-3">
        অর্ডার স্ট্যাটাস আপডেট করুন
      </h4>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => {
          const isActive = selectedOrder.status === status.key;
          const isLoading = updatingStatus === status.key;
          return (
            <button
              key={status.key}
              onClick={() => handleClick(status.key)}
              disabled={isActive || isLoading}
              className={`px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1 ${
                isActive
                  ? `bg-${status.color}-100 text-${status.color}-800 cursor-not-allowed`
                  : `border border-${status.color}-300 text-${status.color}-700 hover:bg-${status.color}-50`
              }`}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {status.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default UpdateOrderStatus;
