import { Tab } from "@headlessui/react";
import React from "react";

function ContactSettings({contactSettings, setContactSettings, handleFormChange }) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">যোগাযোগ সেটিংস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              type="email"
              value={contactSettings.email}
              onChange={(e) => {
                setContactSettings({
                  ...contactSettings,
                  email: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ফোন নম্বর
            </label>
            <input
              type="tel"
              value={contactSettings.phone}
              onChange={(e) => {
                setContactSettings({
                  ...contactSettings,
                  phone: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              ঠিকানা
            </label>
            <textarea
              value={contactSettings.address}
              onChange={(e) => {
                setContactSettings({
                  ...contactSettings,
                  address: e.target.value,
                });
                handleFormChange();
              }}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              কাজের সময়
            </label>
            <input
              type="text"
              value={contactSettings.workingHours}
              onChange={(e) => {
                setContactSettings({
                  ...contactSettings,
                  workingHours: e.target.value,
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

export default ContactSettings;
