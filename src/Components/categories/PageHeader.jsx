import React from "react"

export default function PageHeader() {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-6 px-4 border-b border-amber-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-amber-900">
          পণ্য শ্রেণীবিভাগ
        </h1>
        <p className="text-amber-700 mt-1">
          পণ্যের বিভিন্ন শ্রেণী ও উপ-শ্রেণী পরিচালনা করুন
        </p>
      </div>
    </div>
  )
}