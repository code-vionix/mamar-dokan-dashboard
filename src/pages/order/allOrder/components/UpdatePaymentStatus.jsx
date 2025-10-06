import React from "react";

function UpdatePaymentStatus({
  handlePaymentStatusUpdate,
  selectedOrder,
  paymentStatusLoading,
}) {
  if (!selectedOrder) return null;

  const current = (selectedOrder.paymentStatus ?? "PENDING")
    .toString()
    .toUpperCase();

  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h4 className="font-medium text-gray-800 mb-3">
        পেমেন্ট স্ট্যাটাস আপডেট করুন
      </h4>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handlePaymentStatusUpdate(selectedOrder.id, "PENDING")}
          disabled={current === "PENDING" || paymentStatusLoading}
          className={`px-3 py-2 rounded-md text-sm ${
            current === "PENDING"
              ? "bg-blue-100 text-blue-800 cursor-not-allowed"
              : "border border-blue-300 text-blue-700 hover:bg-blue-50"
          }`}
        >
          অপেক্ষমান
        </button>

        <button
          onClick={() => handlePaymentStatusUpdate(selectedOrder.id, "PAID")}
          disabled={current === "PAID" || paymentStatusLoading}
          className={`px-3 py-2 rounded-md text-sm ${
            current === "PAID"
              ? "bg-green-100 text-green-800 cursor-not-allowed"
              : "border border-green-300 text-green-700 hover:bg-green-50"
          }`}
        >
          পরিশোধিত
        </button>

        <button
          onClick={() => handlePaymentStatusUpdate(selectedOrder.id, "FAILED")}
          disabled={current === "FAILED" || paymentStatusLoading}
          className={`px-3 py-2 rounded-md text-sm ${
            current === "FAILED"
              ? "bg-red-100 text-red-800 cursor-not-allowed"
              : "border border-red-300 text-red-700 hover:bg-red-50"
          }`}
        >
          ব্যর্থ
        </button>

        <button
          onClick={() =>
            handlePaymentStatusUpdate(selectedOrder.id, "REFUNDED")
          }
          disabled={current === "REFUNDED" || paymentStatusLoading}
          className={`px-3 py-2 rounded-md text-sm ${
            current === "REFUNDED"
              ? "bg-gray-200 text-gray-800 cursor-not-allowed"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          ফেরত
        </button>
      </div>
    </div>
  );
}

export default UpdatePaymentStatus;
