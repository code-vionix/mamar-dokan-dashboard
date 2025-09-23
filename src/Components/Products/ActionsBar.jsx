import { ChevronDown, PlusCircle, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { statuses } from "../../data/productsData.js";

const ActionsBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedProducts,
  handleDeleteSelectedProducts,
}) => {
  const [categories, setCategories] = useState(["সকল"]);

  // Use useEffect to fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/category`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        const categoryNames = data.data.map((category) => category.name);
        setCategories(["সকল", ...categoryNames]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // The empty dependency array ensures this runs only once on mount

  // The 'statuses' array can remain a local constant if not fetched from an API
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-grow">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="flex items-center justify-between w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              className="flex items-center justify-between w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm appearance-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-2">
          {/* <button className="py-2 px-4 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center">
            <Upload className="h-4 w-4 mr-1" />
            <span>আমদানি</span>
          </button> */}
          {/* <button className="py-2 px-4 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-1" />
            <span>রপ্তানি</span>
          </button> */}
          <Link
            to="/products/create"
            className="py-2 px-4 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-md flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>নতুন পণ্য</span>
          </Link>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedProducts.length}</span> পণ্য
            নির্বাচিত
          </div>
          <div className="flex gap-2">
            <button
              className="py-1.5 px-3 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-md flex items-center cursor-pointer"
              onClick={handleDeleteSelectedProducts}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>মুছুন</span>
            </button>
            {/* <button className="py-1.5 px-3 text-sm bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-md flex items-center">
              <Edit className="h-4 w-4 mr-1" />
              <span>সম্পাদনা</span>
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsBar;
