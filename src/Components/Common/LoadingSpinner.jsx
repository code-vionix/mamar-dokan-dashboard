import React from "react";

/**
 * A reusable loading spinner component.
 * It displays a spinning animation and a text message to indicate
 * that content is being loaded.
 */
const LoadingSpinner = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Spinner animation */}
        <div className="w-12 h-12 border-4 border-t-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Loading text */}
        <p className="mt-4 text-gray-600">পণ্য লোড হচ্ছে...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
