import React from "react";

function CustomerInfo({selectedOrder}) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h4 className="font-medium text-gray-800 mb-3">গ্রাহকের তথ্য</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">নাম</p>
          <p className="font-medium">{selectedOrder.customer.name}</p>
          <p className="text-sm text-gray-500 mt-2">ইমেইল</p>
          <p>{selectedOrder.customer.email}</p>
          <p className="text-sm text-gray-500 mt-2">ফোন</p>
          <p>{selectedOrder.customer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">ঠিকানা</p>
          <p className="font-medium">{selectedOrder.shipping.address}</p>
          <p>
            {selectedOrder.shipping.city}, {selectedOrder.shipping.postalCode}
          </p>
          <p className="text-sm text-gray-500 mt-2">শিপিং মেথড</p>
          <p>{selectedOrder.shipping.method}</p>
          {selectedOrder.shipping.trackingNumber && (
            <>
              <p className="text-sm text-gray-500 mt-2">ট্র্যাকিং নম্বর</p>
              <p className="font-medium">
                {selectedOrder.shipping.trackingNumber}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
