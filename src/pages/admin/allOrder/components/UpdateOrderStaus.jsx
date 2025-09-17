import React from 'react'

function UpdateOrderStaus({handleStatusUpdate, selectedOrder, statusUpdateLoading}) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">
                  অর্ডার স্ট্যাটাস আপডেট করুন
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "pending")
                    }
                    disabled={
                      selectedOrder.status === "pending" || statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "pending"
                        ? "bg-blue-100 text-blue-800 cursor-not-allowed"
                        : "border border-blue-300 text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    অপেক্ষারত
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "processing")
                    }
                    disabled={
                      selectedOrder.status === "processing" ||
                      statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "processing"
                        ? "bg-amber-100 text-amber-800 cursor-not-allowed"
                        : "border border-amber-300 text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    প্রস্তুত হচ্ছে
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "shipped")
                    }
                    disabled={
                      selectedOrder.status === "shipped" || statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "shipped"
                        ? "bg-purple-100 text-purple-800 cursor-not-allowed"
                        : "border border-purple-300 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    শিপ করা হয়েছে
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "delivered")
                    }
                    disabled={
                      selectedOrder.status === "delivered" ||
                      statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "delivered"
                        ? "bg-green-100 text-green-800 cursor-not-allowed"
                        : "border border-green-300 text-green-700 hover:bg-green-50"
                    }`}
                  >
                    ডেলিভারি হয়েছে
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "cancelled")
                    }
                    disabled={
                      selectedOrder.status === "cancelled" ||
                      statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "cancelled"
                        ? "bg-red-100 text-red-800 cursor-not-allowed"
                        : "border border-red-300 text-red-700 hover:bg-red-50"
                    }`}
                  >
                    বাতিল করা হয়েছে
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, "returned")
                    }
                    disabled={
                      selectedOrder.status === "returned" || statusUpdateLoading
                    }
                    className={`px-3 py-2 rounded-md text-sm ${
                      selectedOrder.status === "returned"
                        ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ফেরত
                  </button>
                </div>
              </div>
  )
}

export default UpdateOrderStaus
