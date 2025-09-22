import { Tab } from "@headlessui/react";
import React from "react";

function PaymentSettings({
  paymentSettings,
  setPaymentSettings,
  handleFormChange,
}) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">পেমেন্ট সেটিংস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              মুদ্রা
            </label>
            <select
              value={paymentSettings.currency}
              onChange={(e) => {
                setPaymentSettings({
                  ...paymentSettings,
                  currency: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="BDT">Bangladeshi Taka (BDT)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="INR">Indian Rupee (INR)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              মুদ্রা প্রতীক
            </label>
            <input
              type="text"
              value={paymentSettings.currencySymbol}
              onChange={(e) => {
                setPaymentSettings({
                  ...paymentSettings,
                  currencySymbol: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ট্যাক্স রেট (%)
            </label>
            <input
              type="number"
              value={paymentSettings.taxRate}
              onChange={(e) => {
                setPaymentSettings({
                  ...paymentSettings,
                  taxRate: parseFloat(e.target.value),
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              সর্বনিম্ন অর্ডার পরিমাণ
            </label>
            <input
              type="number"
              value={paymentSettings.minOrderAmount}
              onChange={(e) => {
                setPaymentSettings({
                  ...paymentSettings,
                  minOrderAmount: parseFloat(e.target.value),
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-800">
              পেমেন্ট পদ্ধতি
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={paymentSettings.enableBkash}
                  onChange={(e) => {
                    setPaymentSettings({
                      ...paymentSettings,
                      enableBkash: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">বিকাশ</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={paymentSettings.enableNagad}
                  onChange={(e) => {
                    setPaymentSettings({
                      ...paymentSettings,
                      enableNagad: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">নগদ</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={paymentSettings.enableCreditCard}
                  onChange={(e) => {
                    setPaymentSettings({
                      ...paymentSettings,
                      enableCreditCard: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">ক্রেডিট কার্ড</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={paymentSettings.enableCashOnDelivery}
                  onChange={(e) => {
                    setPaymentSettings({
                      ...paymentSettings,
                      enableCashOnDelivery: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">ক্যাশ অন ডেলিভারি</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

export default PaymentSettings;
