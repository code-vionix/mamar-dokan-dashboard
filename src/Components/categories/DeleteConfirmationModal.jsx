import React from "react"
import { motion } from "framer-motion"
import { Loader2, Trash2 } from "lucide-react"

export default function DeleteConfirmationModal({
  isOpen,
  isSubmitting,
  onClose,
  onConfirm
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h3 className="text-xl font-semibold text-red-700 mb-4">
          শ্রেণী মুছে ফেলার নিশ্চিতকরণ
        </h3>
        <p className="mb-6 text-gray-700">
          আপনি কি নিশ্চিতভাবে এই শ্রেণীটি মুছে ফেলতে চান? এই কাজটি সম্পূর্ণরূপে
          অপরিবর্তনীয়।
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            বাতিল করুন
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                প্রক্রিয়াধীন...
              </>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" />
                মুছে ফেলুন
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}