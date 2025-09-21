import React from "react"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function Notification({ type, message }) {
  const isSuccess = type === "success"
  const bgColor = isSuccess ? "bg-green-50" : "bg-red-50"
  const borderColor = isSuccess ? "border-green-200" : "border-red-200"
  const textColor = isSuccess ? "text-green-800" : "text-red-800"
  const Icon = isSuccess ? CheckCircle : AlertCircle
  const iconColor = isSuccess ? "text-green-500" : "text-red-500"

  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-6 flex items-start`}
    >
      <Icon className={`${iconColor} mt-0.5 mr-3 flex-shrink-0`} size={20} />
      <div>
        <p className={`${textColor} font-medium`}>{message}</p>
      </div>
    </motion.div>
  )
}