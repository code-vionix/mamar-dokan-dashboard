import { Loader2 } from "lucide-react";
import React, { useState } from "react";

function UpdatePaymentStatus({ handlePaymentStatusUpdate, selectedOrder }) {
  const [updatingStatus, setUpdatingStatus] = useState(null);

  if (!selectedOrder) return null;

  const statuses = [
    { key: "PENDING", label: "অপেক্ষমান", color: "blue" },
    { key: "PAID", label: "পরিশোধিত", color: "green" },
    { key: "FAILED", label: "ব্যর্থ", color: "red" },
    { key: "REFUNDED", label: "ফেরত", color: "gray" },
  ];

  const current = (selectedOrder.paymentStatus ?? "PENDING")
    .toString()
    .toUpperCase();

  const handleClick = async (statusKey) => {
    setUpdatingStatus(statusKey);
    try {
      await handlePaymentStatusUpdate(selectedOrder.id, statusKey);
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h4 className="font-medium text-gray-800 mb-3">
        পেমেন্ট স্ট্যাটাস আপডেট করুন
      </h4>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => {
          const isActive = current === status.key;
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

export default UpdatePaymentStatus;
