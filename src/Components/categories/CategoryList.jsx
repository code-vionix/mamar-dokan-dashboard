import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Loader2,
  Plus,
  RefreshCw,
  Search,
  FolderTree
} from "lucide-react"
import CategoryItem from "./CategoryItem"

export default function CategoryList({
  categories,
  isLoading,
  onRefresh,
  onAddNew,
  onAddSubCategory,
  onEdit,
  onDelete
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return categories
    }

    const lowerCaseQuery = searchQuery.toLowerCase()

    function filter(items) {
      return items.reduce((acc, item) => {
        const children = item.children ? filter(item.children) : []
        if (
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          children.length > 0
        ) {
          acc.push({ ...item, children })
        }
        return acc
      }, [])
    }

    return filter(categories)
  }, [categories, searchQuery])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">শ্রেণীবিভাগ তালিকা</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw size={16} />
          </button>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="শ্রেণী খুঁজুন..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <button
            onClick={onAddNew}
            className="px-4 py-2 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-1.5" />
            নতুন শ্রেণী
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin mb-4" />
          <p className="text-amber-800">শ্রেণী তালিকা লোড হচ্ছে...</p>
        </div>
      ) : filteredCategories.length > 0 ? (
        <div className="border rounded-md">
          {filteredCategories.map(cat => (
            <CategoryItem
              key={cat.id}
              category={cat}
              level={0}
              onAddSubCategory={onAddSubCategory}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 rounded-md p-6 text-center">
          <FolderTree size={36} className="text-amber-400 mx-auto mb-2" />
          <p className="text-amber-800 font-medium">কোন শ্রেণী পাওয়া যায়নি</p>
          <p className="text-amber-600 text-sm mt-1">
            নতুন শ্রেণী যোগ করতে উপরের "নতুন শ্রেণী" বাটন ক্লিক করুন
          </p>
        </div>
      )}
    </motion.div>
  )
}