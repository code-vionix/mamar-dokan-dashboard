import React from "react";

function ActionBar({markAsComplete, filteredOrders, filterStage, setFilterStage, selectedOrders}) {


  return (
    <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
      <div className="flex items-center">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="all">All Stages</option>
          <option value="packaging">Packaging</option>
          <option value="quality-check">Quality Check</option>
          <option value="ready-to-ship">Ready to Ship</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={markAsComplete}
          disabled={selectedOrders.length === 0}
          className={`px-4 py-2 rounded-md ${
            selectedOrders.length > 0
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          Mark Completed
        </button>

        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
          Export ({filteredOrders.length})
        </button>
      </div>
    </div>
  );
}

export default ActionBar;
