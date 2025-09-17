import React from "react";

function Notes({ selectedOrder }) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h4 className="font-medium text-gray-800 mb-2">নোট</h4>
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
        <p className="text-sm text-gray-800">{selectedOrder.notes}</p>
      </div>
    </div>
  );
}

export default Notes;
