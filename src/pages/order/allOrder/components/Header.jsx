import { ShoppingBag } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-6 px-4 border-b border-amber-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-amber-900 flex items-center">
            <ShoppingBag className="mr-2" size={24} />
            অর্ডার ম্যানেজমেন্ট
          </h1>
          <p className="text-amber-700 mt-1">
            অর্ডারসমূহ পরিচালনা এবং স্ট্যাটাস আপডেট করুন
          </p>
        </div>
      </div>
  )
}

export default Header
