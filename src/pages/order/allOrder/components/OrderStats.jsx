import { motion } from "framer-motion";
import { Clock, ShoppingBag, Tag, Truck } from "lucide-react";
import React from "react";

function OrderStats({ orderStats, fadeIn }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-500 text-sm">মোট অর্ডার</h3>
          <ShoppingBag className="text-amber-600" size={18} />
        </div>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          {orderStats.total}
        </p>
        <div className="mt-2 flex space-x-2 text-xs">
          <span className="text-green-600 font-medium">
            ডেলিভারি: {orderStats.delivered}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-amber-600 font-medium">
            চলমান:{" "}
            {orderStats.pending + orderStats.processing + orderStats.shipped}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-500 text-sm">মোট বিক্রয়</h3>
          <Tag className="text-amber-600" size={18} />
        </div>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          ৳{orderStats.totalAmount.toLocaleString()}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          গড় অর্ডার মূল্য: ৳
          {orderStats.total > 0
            ? Math.round(
                orderStats.totalAmount / orderStats.total
              ).toLocaleString()
            : 0}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-500 text-sm">অপেক্ষমান অর্ডার</h3>
          <Clock className="text-blue-600" size={18} />
        </div>
        <p className="text-2xl font-semibold text-blue-700 mt-2">
          {orderStats.pending}
        </p>
        <div className="mt-2 text-xs text-blue-600">
          প্রক্রিয়াধীন: {orderStats.processing}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-500 text-sm">শিপ করা হয়েছে</h3>
          <Truck className="text-purple-600" size={18} />
        </div>
        <p className="text-2xl font-semibold text-purple-700 mt-2">
          {orderStats.shipped}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          সম্পন্ন হার:{" "}
          {orderStats.total > 0
            ? Math.round((orderStats.delivered / orderStats.total) * 100)
            : 0}
          %
        </div>
      </div>
    </motion.div>
  );
}

export default OrderStats;
