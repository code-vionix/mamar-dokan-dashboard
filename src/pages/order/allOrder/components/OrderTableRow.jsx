import {
  Copy,
  Eye,
  FileText,
  Mail,
  MoreHorizontal,
  Printer,
} from "lucide-react";
import React, { useState } from "react";
import normalizeOrder from "../../lib/normalizeOrder";
import OrderCustomerCell from "./OrderCustomerCell";
import OrderProductCell from "./OrderProductCell";

export default function OrderTableRow({
  order: rawOrder,
  handleViewOrder,
  getPaymentStatusBadge,
  getStatusBadge,
  formatDate,
}) {
  const order = normalizeOrder(rawOrder);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const firstProduct = order.products?.[0];

  return (
    <tr className="hover:bg-amber-50">
      <td
        className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
        onClick={handleCopy}
        title="কপি করুন"
      >
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1">
            {order.orderNumber?.toString().slice(0, 10)}
            <Copy size={14} className="text-gray-400 hover:text-gray-600" />
          </div>
          {copied && (
            <span className="text-green-600 text-xs">✅ কপি হয়েছে</span>
          )}
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">
        {formatDate
          ? formatDate(order.date)
          : new Date(order.date).toLocaleString()}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <OrderCustomerCell customer={order.customer} />
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <OrderProductCell products={order.products} />
      </td>

      <td className="px-4 py-4 text-sm font-medium text-center">
        {firstProduct?.quantity || "-"}
      </td>

      <td className="px-4 py-4 text-sm font-medium">
        ৳{(order?.payment?.amount ?? 0).toLocaleString()}
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm text-gray-900 mb-1">
            {order.payment?.method}
          </div>
          {getPaymentStatusBadge?.(order?.payment?.status.toUpperCase())}
        </div>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        {getStatusBadge?.(order.status) || order.status}
      </td>

      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => handleViewOrder(order)}
            className="text-blue-600 hover:text-blue-800"
            title="অর্ডার বিস্তারিত দেখুন"
          >
            <Eye size={16} />
          </button>

          <div className="relative group">
            <button
              className="text-gray-600 hover:text-gray-800"
              title="আরও অপশন"
            >
              <MoreHorizontal size={16} />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
              <div className="py-1">
                <button className="px-4 py-2 text-sm hover:bg-gray-100 w-full flex items-center text-left">
                  <Printer size={14} className="mr-2" /> ইনভয়েস প্রিন্ট করুন
                </button>
                <button className="px-4 py-2 text-sm hover:bg-gray-100 w-full flex items-center text-left">
                  <Mail size={14} className="mr-2" /> ইমেইল পাঠান
                </button>
                <button className="px-4 py-2 text-sm hover:bg-gray-100 w-full flex items-center text-left">
                  <FileText size={14} className="mr-2" /> ইনভয়েস ডাউনলোড করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
