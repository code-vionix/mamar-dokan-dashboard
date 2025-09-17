import React from "react";
import { Link } from "react-router-dom";

function OrdersTable({
  handleSelectAll,
  sortOrders,
  filteredOrders,
  handleSelectOrder,
  updateProcessingStage,
  selectedOrders, 
  orders,
  sortField,
  sortDirection
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-left text-sm uppercase">
            <th className="py-3 px-4">
              <input
                type="checkbox"
                className="rounded text-blue-500 focus:ring-blue-500"
                onChange={handleSelectAll}
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
              />
            </th>
            <th
              className="py-3 px-4 cursor-pointer"
              onClick={() => sortOrders("orderNumber")}
            >
              Order #
              {sortField === "orderNumber" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="py-3 px-4 cursor-pointer"
              onClick={() => sortOrders("customerName")}
            >
              Customer
              {sortField === "customerName" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="py-3 px-4 cursor-pointer"
              onClick={() => sortOrders("orderDate")}
            >
              Date
              {sortField === "orderDate" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th
              className="py-3 px-4 cursor-pointer"
              onClick={() => sortOrders("total")}
            >
              Total
              {sortField === "total" && (
                <span className="ml-1">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              )}
            </th>
            <th className="py-3 px-4">Payment</th>
            <th className="py-3 px-4">Stage</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  className="rounded text-blue-500 focus:ring-blue-500"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => handleSelectOrder(order.id)}
                />
              </td>
              <td className="py-3 px-4 font-medium">
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {order.orderNumber}
                </Link>
              </td>
              <td className="py-3 px-4">{order.customerName}</td>
              <td className="py-3 px-4">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 font-medium">
                ₹{order.total.toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                </span>
              </td>
              <td className="py-3 px-4">
                <select
                  value={order.processingStage}
                  onChange={(e) =>
                    updateProcessingStage(order.id, e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="packaging">Packaging</option>
                  <option value="quality-check">Quality Check</option>
                  <option value="ready-to-ship">Ready to Ship</option>
                </select>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      (window.location.href = `/admin/orders/${order.id}`)
                    }
                  >
                    View
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-orange-600 hover:text-orange-800">
                    Print
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No processing orders found matching the current filters.
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
