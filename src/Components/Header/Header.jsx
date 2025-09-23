import { Bell, ChevronRight, Home, Menu, Search, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import navItems from "../../data/navItems";

export default function Header({ toggleSidebar }) {
  const location = useLocation();

  const getCurrentPageTitle = (pathname) => {
    const findTitle = (items) => {
      for (const item of items) {
        if (item.href === pathname) {
          return item.title;
        }
        if (item.children) {
          const childTitle = findTitle(item.children);
          if (childTitle) {
            return childTitle;
          }
        }
      }
      return null;
    };
    return findTitle(navItems);
  };

  const currentPageTitle = getCurrentPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 h-16">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div className="ml-4 hidden sm:flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-amber-600">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="mx-1 text-gray-400" />
            <span className="text-gray-800 font-medium">
              {currentPageTitle || "পৃষ্ঠা"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="অনুসন্ধান করুন..."
              className="w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link
            to="/"
            className="hidden sm:flex items-center p-2 text-sm text-amber-600 hover:text-amber-700"
          >
            <span className="mr-1">সাইট দেখুন</span>
            <ChevronRight size={16} />
          </Link>
          <div className="relative w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center cursor-pointer">
            <User size={18} className="text-amber-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
