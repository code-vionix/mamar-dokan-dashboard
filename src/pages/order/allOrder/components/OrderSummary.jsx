import React from "react";

function OrderSummary({formatDate, getStatusBadge, selectedOrder}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-500">অর্ডার তারিখ</p>
        <p className="font-medium">{formatDate(selectedOrder.date)}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-500">পেমেন্ট মেথড</p>
        <p className="font-medium">{selectedOrder.payment.method}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-500">অর্ডার স্ট্যাটাস</p>
        <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
      </div>
    </div>
  );
}

export default OrderSummary;
