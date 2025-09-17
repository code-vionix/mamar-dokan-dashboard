import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";

export default function AlertMessage({ success, error }) {
  if (!success && !error) {
    return null;
  }

  const message = success || error;
  const isSuccess = !!success;

  const alertClass = isSuccess
    ? "bg-green-50 border border-green-200"
    : "bg-red-50 border border-red-200";
  const textClass = isSuccess ? "text-green-800" : "text-red-800";
  const icon = isSuccess ? (
    <CheckCircle
      className="text-green-500 mt-0.5 mr-3 flex-shrink-0"
      size={20}
    />
  ) : (
    <AlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 mb-6 flex items-start ${alertClass}`}
    >
      {icon}
      <div>
        <p className={`font-medium ${textClass}`}>{message}</p>
      </div>
    </motion.div>
  );
}
