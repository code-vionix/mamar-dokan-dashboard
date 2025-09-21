import React, { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  Pencil,
  Trash2,
  FolderPlus,
  FolderTree
} from "lucide-react"

export default function CategoryItem({
  category,
  level,
  onAddSubCategory,
  onEdit,
  onDelete
}) {
  const [isExpanded, setIsExpanded] = useState(level < 1) // শীর্ষ লেভেল ডিফল্ট এক্সপ্যান্ড
  const hasChildren = category.children && category.children.length > 0

  return (
    <div className={`mb-1 ${level > 0 ? "ml-6" : ""}`}>
      <div
        className={`flex items-center justify-between p-3 rounded-md hover:bg-amber-50 transition-colors ${
          isExpanded ? "bg-amber-50" : "bg-white"
        }`}
      >
        <div className="flex items-center flex-1 min-w-0">
          {/* Expand / Collapse button */}
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mr-2 text-amber-700 hover:bg-amber-100 rounded-full p-1"
            >
              {isExpanded ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          ) : (
            <div className="w-[26px] mr-2"></div>
          )}

          {/* Category image or fallback */}
          {category.image ? (
            <div className="h-10 w-10 rounded-md overflow-hidden mr-3 border border-gray-200">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-md bg-amber-100 flex items-center justify-center mr-3">
              <FolderTree size={18} className="text-amber-600" />
            </div>
          )}

          {/* Category info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 truncate">
              {category.name}
            </p>
            <p className="text-xs text-gray-500">
              পণ্য: {category.productCount} |{" "}
              {category.parentId ? "উপ-শ্রেণী" : "মূল শ্রেণী"}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAddSubCategory(category.id)}
            title="নতুন উপ-শ্রেণী যোগ করুন"
            className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-md transition-colors"
          >
            <FolderPlus size={16} />
          </button>
          <button
            onClick={() => onEdit(category)}
            title="শ্রেণী সম্পাদনা করুন"
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            title="শ্রেণী মুছুন"
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Recursive children */}
      {isExpanded && hasChildren && (
        <div className="mt-1 border-l-2 border-amber-200">
          {category.children.map(child => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              onAddSubCategory={onAddSubCategory}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
