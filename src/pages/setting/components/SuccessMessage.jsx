import { CheckCircle } from "lucide-react";
import React from "react";

function SuccessMessage() {
  return (
    <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 flex items-center">
      <CheckCircle className="mr-2" size={18} />
      সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!
    </div>
  );
}

export default SuccessMessage;
