import { Tab } from "@headlessui/react";
import React from "react";

function EmailSetting({emailSettings, setEmailSettings, handleFormChange }) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">ইমেইল সেটিংস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-800">
              ইমেইল নোটিফিকেশন
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={emailSettings.orderConfirmation}
                  onChange={(e) => {
                    setEmailSettings({
                      ...emailSettings,
                      orderConfirmation: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">অর্ডার কনফার্মেশন</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={emailSettings.shippingUpdates}
                  onChange={(e) => {
                    setEmailSettings({
                      ...emailSettings,
                      shippingUpdates: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">শিপিং আপডেট</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={emailSettings.abandonedCart}
                  onChange={(e) => {
                    setEmailSettings({
                      ...emailSettings,
                      abandonedCart: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">
                  অসম্পূর্ণ কার্ট রিমাইন্ডার
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={emailSettings.promotionalEmails}
                  onChange={(e) => {
                    setEmailSettings({
                      ...emailSettings,
                      promotionalEmails: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">প্রমোশনাল ইমেইল</span>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              নিউজলেটার ফ্রিকোয়েন্সি
            </label>
            <select
              value={emailSettings.newsletterFrequency}
              onChange={(e) => {
                setEmailSettings({
                  ...emailSettings,
                  newsletterFrequency: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="weekly">সাপ্তাহিক</option>
              <option value="biweekly">পাক্ষিক</option>
              <option value="monthly">মাসিক</option>
            </select>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

export default EmailSetting;
