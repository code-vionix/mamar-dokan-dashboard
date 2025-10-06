import {
  Check,
  CheckCircle,
  Clock,
  PackageOpen,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";

export const getStatusBadge = (status) => {
  switch ((status || "").toString().toUpperCase()) {
    case "PENDING":
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-xs font-medium">
          <Clock size={12} className="mr-1" />
          অপেক্ষারত
        </span>
      );
    case "PROCESSING":
      return (
        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center text-xs font-medium">
          <PackageOpen size={12} className="mr-1" />
          প্রস্তুত হচ্ছে
        </span>
      );
    case "SHIPPED":
      return (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center text-xs font-medium">
          <Truck size={12} className="mr-1" />
          শিপ করা হয়েছে
        </span>
      );
    case "DELIVERED":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-xs font-medium">
          <CheckCircle size={12} className="mr-1" />
          ডেলিভারি হয়েছে
        </span>
      );
    case "CANCELLED":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center text-xs font-medium">
          <XCircle size={12} className="mr-1" />
          বাতিল করা হয়েছে
        </span>
      );
    case "REFUNDED":
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full flex items-center text-xs font-medium">
          <RefreshCw size={12} className="mr-1" />
          ফেরত
        </span>
      );
    case "CONFIRMED":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-xs font-medium">
          <Check size={12} className="mr-1" />
          নিশ্চিত
        </span>
      );
    default:
      return null;
  }
};

export const getPaymentStatusBadge = (status) => {
  switch ((status || "").toString().toUpperCase()) {
    case "PAID":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          পরিশোধিত
        </span>
      );
    case "PENDING":
      return (
        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
          অপেক্ষমান
        </span>
      );
    case "FAILED":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          ব্যর্থ
        </span>
      );
    case "REFUNDED":
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          ফেরত দেওয়া হয়েছে
        </span>
      );
    default:
      return null;
  }
};
