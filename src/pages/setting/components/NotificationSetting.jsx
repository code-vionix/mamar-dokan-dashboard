import { Tab } from "@headlessui/react";
import React from "react";

function NotificationSetting({
  notificationSettings,
  setNotificationSettings,
  handleFormChange,
}) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          নোটিফিকেশন সেটিংস
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-800">
              অ্যাডমিন নোটিফিকেশন
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notificationSettings.newOrderNotification}
                  onChange={(e) => {
                    setNotificationSettings({
                      ...notificationSettings,
                      newOrderNotification: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">নতুন অর্ডার নোটিফিকেশন</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notificationSettings.lowStockNotification}
                  onChange={(e) => {
                    setNotificationSettings({
                      ...notificationSettings,
                      lowStockNotification: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">লো স্টক নোটিফিকেশন</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notificationSettings.customerReviewNotification}
                  onChange={(e) => {
                    setNotificationSettings({
                      ...notificationSettings,
                      customerReviewNotification: e.target.checked,
                    });
                    handleFormChange();
                  }}
                  className="h-4 w-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                />
                <span className="text-gray-700">কাস্টমার রিভিউ নোটিফিকেশন</span>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              অ্যাডমিন নোটিফিকেশন ইমেইল
            </label>
            <input
              type="email"
              value={notificationSettings.adminEmailForNotifications}
              onChange={(e) => {
                setNotificationSettings({
                  ...notificationSettings,
                  adminEmailForNotifications: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              লো স্টক থ্রেশহোল্ড
            </label>
            <input
              type="number"
              value={notificationSettings.lowStockThreshold}
              onChange={(e) => {
                setNotificationSettings({
                  ...notificationSettings,
                  lowStockThreshold: parseInt(e.target.value),
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

export default NotificationSetting;
