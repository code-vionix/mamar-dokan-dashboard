import { ChevronDown, ChevronLeft, ChevronRight, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import navItems from "../../data/navItems";

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
  openMenus,
  toggleMenu,
  isMobile,
}) {
  const location = useLocation();

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-64" : "w-20"
      } ${isMobile ? "transform" : ""} ${
        isMobile && !sidebarOpen ? "-translate-x-full" : ""
      }`}
    >
      <div
        className={`flex items-center h-16 px-4 border-b border-gray-200 ${
          !sidebarOpen ? "justify-center" : "justify-between"
        }`}
      >
        {sidebarOpen && (
          <Link to="/" className="flex items-center">
            <div className="text-lg font-bold text-amber-600">
              জামদানি শাড়ি
            </div>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-md hover:bg-gray-100 ${
            sidebarOpen ? "" : "mx-auto"
          } cursor-pointer`}
        >
          {sidebarOpen ? (
            <ChevronLeft size={20} className="text-gray-500" />
          ) : (
            <ChevronRight size={20} className="text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isPathActive(item.href);
            return (
              <li key={item.href}>
                {item.children ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={`flex items-center w-full p-2 rounded-md text-sm ${
                        active
                          ? "bg-amber-50 text-amber-700"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${sidebarOpen ? "" : "justify-center"}`}
                    >
                      <item.icon
                        size={20}
                        className={`${
                          active ? "text-amber-600" : "text-gray-500"
                        }`}
                      />
                      {sidebarOpen && (
                        <>
                          <span className="ml-3 flex-1 text-left">
                            {item.title}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              openMenus[item.title] ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>
                    {sidebarOpen && openMenus[item.title] && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={`flex items-center p-2 rounded-md text-sm ${
                                location.pathname === child.href
                                  ? "bg-amber-50 text-amber-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <child.icon
                                size={18}
                                className={`${
                                  location.pathname === child.href
                                    ? "text-amber-600"
                                    : "text-gray-500"
                                }`}
                              />
                              <span className="ml-3">{child.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center p-2 rounded-md text-sm ${
                      location.pathname === item.href
                        ? "bg-amber-50 text-amber-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${sidebarOpen ? "" : "justify-center"}`}
                  >
                    <item.icon
                      size={20}
                      className={`${
                        location.pathname === item.href
                          ? "text-amber-600"
                          : "text-gray-500"
                      }`}
                    />
                    {sidebarOpen && <span className="ml-3">{item.title}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className={`p-4 border-t border-gray-200 ${
          sidebarOpen ? "" : "flex justify-center"
        }`}
      >
        <div
          className={`flex ${
            sidebarOpen ? "items-center space-x-3" : "justify-center"
          }`}
        >
          <div className="relative w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <User size={18} className="text-amber-600" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-medium text-gray-900">
                আদমিন পরিচালক
              </div>
              <div className="text-xs text-gray-500">admin@jamdani.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
