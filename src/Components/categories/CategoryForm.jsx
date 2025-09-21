import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Upload, X } from "lucide-react"

export default function CategoryForm({
  initialData = null,
  isSubmitting,
  onSubmit,
  onCancel,
  categories = []
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: null,
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || "",
        description: initialData.description || "",
        parentId: initialData.parentId || null,
        image: null // শুধু নতুন ছবি আপলোড করলে replace হবে
      })
      setImagePreview(initialData.image)
    }
  }, [initialData])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value || null }))
  }

  const handleImageUpload = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, image: file }))
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleRemoveImage = () => {
    if (imagePreview && formData.image) {
      URL.revokeObjectURL(imagePreview)
    }
    setFormData(prev => ({ ...prev, image: null }))
    setImagePreview(null)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
  }

  const flattenCategories = (cats, prefix = "") => {
    let options = []
    cats.forEach(cat => {
      options.push({ value: cat.id, label: `${prefix}${cat.name}` })
      if (cat.children && cat.children.length > 0) {
        options = options.concat(
          flattenCategories(cat.children, `${prefix}${cat.name} > `)
        )
      }
    })
    return options
  }

  const parentOptions = flattenCategories(categories)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-1"
    >
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {initialData ? "শ্রেণী সম্পাদনা করুন" : "নতুন শ্রেণী যোগ করুন"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* নাম */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              শ্রেণীর নাম *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="শ্রেণীর নাম লিখুন"
              required
            />
          </div>

          {/* মূল শ্রেণী */}
          <div>
            <label
              htmlFor="parentId"
              className="block text-gray-700 font-medium mb-1"
            >
              মূল শ্রেণী
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">কোন মূল শ্রেণী নয় (সর্বোচ্চ স্তর)</option>
              {parentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* বিবরণ */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              বিবরণ
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="শ্রেণীর সংক্ষিপ্ত বিবরণ লিখুন"
            />
          </div>

          {/* ছবি */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              শ্রেণীর ছবি
            </label>
            {imagePreview ? (
              <div className="relative">
                <div className="h-32 rounded-md overflow-hidden border border-gray-300">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center h-32 rounded-md border-2 border-dashed border-amber-300 text-amber-500 cursor-pointer transition-colors hover:border-amber-400"
              >
                <Upload size={24} />
                <span className="mt-2 text-sm">ছবি আপলোড করুন</span>
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* একশন বাটন */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              বাতিল করুন
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  প্রক্রিয়াধীন...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {initialData ? "আপডেট করুন" : "যোগ করুন"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
