import { Printer } from "lucide-react";
import React from "react";

function ActionButtons({setIsDetailModalOpen}) {
  return (
    <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
      <button
        onClick={() => setIsDetailModalOpen(false)}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
      >
        বন্ধ করুন
      </button>
      <button
        className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
        onClick={() => {
          /* Handle print invoice */
        }}
      >
        <Printer size={16} className="inline-block mr-2" />
        ইনভয়েস প্রিন্ট করুন
      </button>
    </div>
  );
}

export default ActionButtons;
