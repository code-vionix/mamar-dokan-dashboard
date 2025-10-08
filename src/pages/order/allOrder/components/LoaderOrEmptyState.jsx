import { Loader2, ShoppingBag } from "lucide-react";

export default function LoaderOrEmptyState({ isLoading, filteredOrders }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin mb-4" />
        <p className="text-amber-800">অর্ডার তালিকা লোড হচ্ছে...</p>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-amber-50/50">
        <ShoppingBag className="h-12 w-12 text-amber-400 mb-4" />
        <h3 className="text-lg font-medium text-amber-800 mb-1">
          কোন অর্ডার পাওয়া যায়নি
        </h3>
        <p className="text-amber-600">
          অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
        </p>
      </div>
    );
  }

  return null;
}
