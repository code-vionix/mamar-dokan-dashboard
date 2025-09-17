import React from 'react'

function Pagination({filteredOrders, orders}) {
  return (
    <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
            disabled
          >
            Previous
          </button>
          <div className="px-3 py-1 bg-blue-600 text-white rounded-md">1</div>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
            disabled
          >
            Next
          </button>
        </div>
      </div>
  )
}

export default Pagination
