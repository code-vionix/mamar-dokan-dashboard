import { PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createProductPath } from "../../routes/path";
/**
 * Renders a reusable empty state component for when no products are found.
 * It displays an icon, a title, a message, and a call-to-action button
 * to add a new product.
 */
const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-800">
        কোন পণ্য পাওয়া যায়নি
      </h3>
      <p className="mt-2 text-gray-600">
        আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করুন বা নতুন পণ্য যোগ করুন
      </p>
      <Link
        to={createProductPath}
        className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        <span>নতুন পণ্য যোগ করুন</span>
      </Link>
    </div>
  );
};

export default EmptyState;
