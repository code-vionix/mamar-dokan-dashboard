import { Tab } from "@headlessui/react";
import React from "react";

function ShippingSettings({
  shippingSettings,
  setShippingSettings,
  handleFormChange,
}) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">শিপিং সেটিংস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ডিফল্ট শিপিং ফি
            </label>
            <input
              type="number"
              value={shippingSettings.defaultShippingFee}
              onChange={(e) => {
                setShippingSettings({
                  ...shippingSettings,
                  defaultShippingFee: parseFloat(e.target.value),
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ফ্রি শিপিং থ্রেশহোল্ড
            </label>
            <input
              type="number"
              value={shippingSettings.freeShippingThreshold}
              onChange={(e) => {
                setShippingSettings({
                  ...shippingSettings,
                  freeShippingThreshold: parseFloat(e.target.value),
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              শিপিং ক্যালকুলেশন পদ্ধতি
            </label>
            <select
              value={shippingSettings.shippingCalculation}
              onChange={(e) => {
                setShippingSettings({
                  ...shippingSettings,
                  shippingCalculation: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="flat">ফ্ল্যাট রেট</option>
              <option value="weight">ওজন ভিত্তিক</option>
              <option value="price">মূল্য ভিত্তিক</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              শিপিং সময়কাল (আনুমানিক)
            </label>
            <input
              type="text"
              value={shippingSettings.shippingTimeEstimate}
              onChange={(e) => {
                setShippingSettings({
                  ...shippingSettings,
                  shippingTimeEstimate: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={shippingSettings.enableLocalPickup}
                onChange={(e) => {
                  setShippingSettings({
                    ...shippingSettings,
                    enableLocalPickup: e.target.checked,
                  });
                  handleFormChange();
                }}
                className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-700">
                স্টোর থেকে সংগ্রহের অপশন চালু করুন
              </span>
            </div>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={shippingSettings.internationalShipping}
                onChange={(e) => {
                  setShippingSettings({
                    ...shippingSettings,
                    internationalShipping: e.target.checked,
                  });
                  handleFormChange();
                }}
                className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
              />
              <span className="text-gray-700">আন্তর্জাতিক শিপিং চালু করুন</span>
            </div>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

export default ShippingSettings;
