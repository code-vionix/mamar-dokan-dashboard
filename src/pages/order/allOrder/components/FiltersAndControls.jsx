import { motion } from "framer-motion";
import { RefreshCw, Search } from "lucide-react";
import React, { useState } from "react";

function FiltersAndControls({ fadeIn, fetchOrders, isLoading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6"
    >
      {/* Header: Title + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4 md:mb-0">
          অর্ডার তালিকা
        </h2>

        <div className="flex flex-wrap gap-2">
          {/* Refresh Button */}
          <button
            onClick={fetchOrders}
            disabled={isLoading}
            className={`px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 flex items-center text-sm transition-colors ${
              isLoading ? "bg-gray-100 cursor-wait" : "hover:bg-gray-50"
            }`}
            title="রিফ্রেশ করুন"
          >
            <RefreshCw
              size={16}
              className={`mr-1 ${
                isLoading ? "animate-spin text-gray-600" : "text-gray-700"
              }`}
            />
            রিফ্রেশ
          </button>

          {/* Print Button */}
          {/* <button
            onClick={handlePrint}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center text-sm"
            title="প্রিন্ট করুন"
          >
            <Printer size={16} className="mr-1" />
            প্রিন্ট
          </button> */}

          {/* Future: Export Button */}
          {/* <button
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center text-sm"
            title="সব অর্ডার এক্সপোর্ট করুন"
          >
            <Download size={16} className="mr-1" />
            এক্সপোর্ট
          </button> */}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
        {/* Search */}
        <div className="w-full md:w-auto relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অর্ডার নম্বর বা গ্রাহকের নাম অনুসন্ধান করুন..."
            className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center">
            <label
              htmlFor="status-filter"
              className="mr-2 text-sm text-gray-600"
            >
              স্ট্যাটাস:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="pending">অপেক্ষারত</option>
              <option value="processing">প্রস্তুত হচ্ছে</option>
              <option value="shipped">শিপ করা হয়েছে</option>
              <option value="delivered">ডেলিভারি হয়েছে</option>
              <option value="cancelled">বাতিল করা হয়েছে</option>
              <option value="returned">ফেরত</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center">
            <label htmlFor="date-filter" className="mr-2 text-sm text-gray-600">
              সময়:
            </label>
            <select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">সব সময়</option>
              <option value="today">আজ</option>
              <option value="yesterday">গতকাল</option>
              <option value="thisWeek">এই সপ্তাহ</option>
              <option value="thisMonth">এই মাস</option>
            </select>
          </div>

          {/* Items per page */}
          {/* <div className="flex items-center">
            <label
              htmlFor="items-per-page"
              className="mr-2 text-sm text-gray-600"
            >
              দেখান:
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              className="px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}

export default FiltersAndControls;
