import { Tab } from "@headlessui/react";
import { Image } from "lucide-react";
import React from "react";

function GeneralSetting({
  generalSettings,
  setGeneralSettings,
  handleFormChange,
}) {
  return (
    <Tab.Panel>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">সাধারণ সেটিংস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              সাইটের নাম
            </label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => {
                setGeneralSettings({
                  ...generalSettings,
                  siteName: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              সাইট ট্যাগলাইন
            </label>
            <input
              type="text"
              value={generalSettings.siteTagline}
              onChange={(e) => {
                setGeneralSettings({
                  ...generalSettings,
                  siteTagline: e.target.value,
                });
                handleFormChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              লোগো URL
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={generalSettings.logoUrl}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    logoUrl: e.target.value,
                  });
                  handleFormChange();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                <Image size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              ফেভিকন URL
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={generalSettings.faviconUrl}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    faviconUrl: e.target.value,
                  });
                  handleFormChange();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                <Image size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              প্রাথমিক রঙ
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={generalSettings.primaryColor}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    primaryColor: e.target.value,
                  });
                  handleFormChange();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="color"
                value={generalSettings.primaryColor}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    primaryColor: e.target.value,
                  });
                  handleFormChange();
                }}
                className="h-9 w-9 rounded border-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              সেকেন্ডারি রঙ
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={generalSettings.secondaryColor}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    secondaryColor: e.target.value,
                  });
                  handleFormChange();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="color"
                value={generalSettings.secondaryColor}
                onChange={(e) => {
                  setGeneralSettings({
                    ...generalSettings,
                    secondaryColor: e.target.value,
                  });
                  handleFormChange();
                }}
                className="h-9 w-9 rounded border-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}

export default GeneralSetting;
