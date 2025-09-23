// components/CustomersList/CustomersTable.jsx

import {
  ArrowUpDown,
  Calendar,
  Check,
  Eye,
  Mail,
  Phone,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import React from "react";
import { Badge, Button } from "../Ui/Ui"; // Assuming this path is correct

export function CustomersTable({ customers, sortConfig, handleSort }) {
  // The getSortIcon function is now inside this component
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={16} className="ml-1 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown size={16} className="ml-1 text-amber-600" />
    ) : (
      <ArrowUpDown size={16} className="ml-1 text-amber-600 rotate-180" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-50 text-gray-600 font-medium border-y border-gray-100">
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("name")}
              >
                গ্রাহক
                {getSortIcon("name")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("email")}
              >
                যোগাযোগ
                {getSortIcon("email")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("segment")}
              >
                সেগমেন্ট
                {getSortIcon("segment")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("totalOrders")}
              >
                অর্ডার সংখ্যা
                {getSortIcon("totalOrders")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("totalSpent")}
              >
                মোট খরচ
                {getSortIcon("totalSpent")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("lastPurchase")}
              >
                সর্বশেষ কেনাকাটা
                {getSortIcon("lastPurchase")}
              </div>
            </th>
            <th className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("status")}
              >
                স্ট্যাটাস
                {getSortIcon("status")}
              </div>
            </th>
            <th className="px-4 py-3 text-right">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        {customer.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        ID: {customer.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="flex items-center text-gray-600">
                      <Mail size={14} className="mr-1" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-gray-600 text-xs mt-1">
                      <Phone size={14} className="mr-1" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={customer.segment}>
                    {customer.segment === "vip" && "VIP গ্রাহক"}
                    {customer.segment === "loyal" && "লয়্যাল গ্রাহক"}
                    {customer.segment === "regular" && "নিয়মিত গ্রাহক"}
                    {customer.segment === "new" && "নতুন গ্রাহক"}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ShoppingBag size={16} className="mr-2 text-gray-400" />
                    <span className="font-medium">{customer.totalOrders}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-medium">
                    ৳ {customer.totalSpent.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    <span>
                      {new Date(customer.lastPurchase).toLocaleDateString(
                        "bn-BD"
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={customer.status}>
                    {customer.status === "active" && (
                      <>
                        <Check size={12} className="mr-1" />
                        সক্রিয়
                      </>
                    )}
                    {customer.status === "inactive" && (
                      <>
                        <X size={12} className="mr-1" />
                        নিষ্ক্রিয়
                      </>
                    )}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <a href={`/admin/customers/${customer.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="View customer details"
                    >
                      <Eye size={16} className="mr-1" />
                      বিস্তারিত
                    </Button>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                কোনো গ্রাহক পাওয়া যায়নি। অনুসন্ধান ফিল্টার পরিবর্তন করুন।
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
