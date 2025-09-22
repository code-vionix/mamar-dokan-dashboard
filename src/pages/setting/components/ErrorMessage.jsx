import { AlertCircle } from "lucide-react";
import React from "react";

function ErrorMessage() {
  return (
    <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center">
      <AlertCircle className="mr-2" size={18} />
      সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
    </div>
  );
}

export default ErrorMessage;
