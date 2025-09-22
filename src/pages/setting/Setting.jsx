import React, { useState } from "react";
import {
  Save,
  Globe,
  DollarSign,
  Truck,
  Mail,
  Bell,
} from "lucide-react";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import NotificationSetting from "./components/NotificationSetting";
import EmailSetting from "./components/EmailSetting";
import ShippingSettings from "./components/ShippingSettings";
import PaymentSettings from "./components/PaymentSettings";
import ContactSettings from "./components/ContactSettings";
import GeneralSetting from "./components/GeneralSetting";
import { Tab } from "@headlessui/react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [formChanged, setFormChanged] = useState(false);

  // Sample form states for different setting sections
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "জামদানি শাড়ি",
    siteTagline: "Traditional Bengali Sarees",
    logoUrl: "/assets/logo.png",
    faviconUrl: "/assets/favicon.ico",
    primaryColor: "#E0A941", // Amber color from the sidebar
    secondaryColor: "#047857", // Bangla green from the button
  });

  const [contactSettings, setContactSettings] = useState({
    email: "info@jamdanisaree.com",
    phone: "+880 1234567890",
    address: "Dhaka, Bangladesh",
    workingHours: "10:00 AM - 8:00 PM",
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "BDT",
    currencySymbol: "৳",
    taxRate: 15,
    enableBkash: true,
    enableNagad: true,
    enableCreditCard: true,
    enableCashOnDelivery: true,
    minOrderAmount: 500,
  });

  const [shippingSettings, setShippingSettings] = useState({
    defaultShippingFee: 120,
    freeShippingThreshold: 2000,
    shippingCalculation: "flat", // flat, weight, price
    enableLocalPickup: true,
    shippingTimeEstimate: "3-5 days",
    internationalShipping: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    abandonedCart: true,
    promotionalEmails: true,
    newsletterFrequency: "weekly",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrderNotification: true,
    lowStockNotification: true,
    lowStockThreshold: 5,
    customerReviewNotification: true,
    adminEmailForNotifications: "admin@jamdanisaree.com",
  });

  // Function to handle saving all settings
  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    setFormChanged(false);

    try {
      // In a real application, this would be an API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveStatus("success");

      // Reset to idle after showing success message
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    } catch (error) {
      setSaveStatus("error");

      // Reset to idle after showing error message
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    }
  };

  // Handle form changes (generic function for all settings)
  const handleFormChange = () => {
    if (!formChanged) {
      setFormChanged(true);
    }
  };

  // List of setting tabs
  const tabs = [
    { name: "সাধারণ", englishName: "General", icon: Globe },
    { name: "যোগাযোগ", englishName: "Contact", icon: Mail },
    { name: "পেমেন্ট", englishName: "Payment", icon: DollarSign },
    { name: "শিপিং", englishName: "Shipping", icon: Truck },
    { name: "ইমেইল", englishName: "Email", icon: Mail },
    { name: "নোটিফিকেশন", englishName: "Notification", icon: Bell },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            সেটিংস (Settings)
          </h1>
          <p className="text-gray-600">
            ওয়েবসাইট কনফিগারেশন এবং সেটিংস পরিবর্তন করুন
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={!formChanged || saveStatus === "saving"}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            !formChanged
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-amber-600 text-white hover:bg-amber-700"
          } transition-colors`}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>সংরক্ষণ হচ্ছে...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>সংরক্ষণ করুন</span>
            </>
          )}
        </button>
      </div>

      {/* Success message */}
      {saveStatus === "success" && <SuccessMessage />}

      {/* Error message */}
      {saveStatus === "error" && <ErrorMessage />}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tab.Group onChange={(index) => setActiveTab(index)}>
          <div className="flex border-b">
            <Tab.List className="flex overflow-x-auto">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `px-6 py-3 text-sm font-medium outline-none flex items-center gap-2 ${
                      selected
                        ? "border-b-2 border-amber-600 text-amber-600"
                        : "text-gray-600 hover:text-amber-600"
                    }`
                  }
                >
                  <tab.icon size={18} />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="p-6">
            {/* General Settings */}
            <GeneralSetting
              handleFormChange={handleFormChange}
              setGeneralSettings={setGeneralSettings}
              generalSettings={generalSettings}
            />

            {/* Contact Settings */}
            <ContactSettings
              contactSettings={contactSettings}
              setContactSettings={setContactSettings}
              handleFormChange={handleFormChange}
            />

            {/* Payment Settings */}
            <PaymentSettings
              handleFormChange={handleFormChange}
              setPaymentSettings={setPaymentSettings}
              paymentSettings={paymentSettings}
            />

            {/* Shipping Settings */}
            <ShippingSettings
              handleFormChange={handleFormChange}
              setShippingSettings={setShippingSettings}
              shippingSettings={shippingSettings}
            />

            {/* Email Settings */}
            <EmailSetting
              handleFormChange={handleFormChange}
              setEmailSettings={setEmailSettings}
              emailSettings={emailSettings}
            />

            {/* Notification Settings */}
            <NotificationSetting
              handleFormChange={handleFormChange}
              setNotificationSettings={setNotificationSettings}
              notificationSettings={notificationSettings}
            />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
