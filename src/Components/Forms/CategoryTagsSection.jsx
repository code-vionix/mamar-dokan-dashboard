import { Loader2, Plus, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CategoryTagsSection() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [newTag, setNewTag] = useState("");
  const watchedTags = watch("tags") || [];
  const categoryId = watch("categoryId") || "";
  const categoryName = watch("categoryName") || ""; // <-- edit time name

  // State to hold fetched categories & loading
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Register "tags" field
  useEffect(() => {
    register("tags", {
      validate: (value) => {
        if (!value || value.length === 0) return "অন্তত একটি ট্যাগ যোগ করুন";
        return true;
      },
    });
  }, [register]);

  // Handle tags add/remove
  const handleAddTag = () => {
    if (newTag && watchedTags.length < 5 && !watchedTags.includes(newTag)) {
      setValue("tags", [...watchedTags, newTag], { shouldValidate: true });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  // Handle select change to set categoryName as well
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setValue("categoryId", selectedId);
    const selected = categories.find((c) => c.id === selectedId);
    setValue("categoryName", selected ? selected.name : "");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        শ্রেণীবিভাগ ও ট্যাগ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category dropdown */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            শ্রেণী *
          </label>
          {isLoading ? (
            <div className="flex justify-center items-center h-10 w-full border rounded-md border-gray-300">
              <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
            </div>
          ) : (
            <select
              id="categoryId"
              value={categoryId}
              onChange={handleCategoryChange}
              {...register("categoryId", { required: "একটি শ্রেণী নির্বাচন করুন" })}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${
                errors.categoryId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-amber-500"
              }`}
            >
              <option value="">শ্রেণী নির্বাচন করুন</option>
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Tags input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">ট্যাগ *</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="ট্যাগ যোগ করুন"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2.5 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Plus size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">অন্তত ১টি এবং সর্বাধিক ৫টি ট্যাগ যোগ করুন।</p>
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
        </div>

        {/* Display tags */}
        <div className="col-span-2">
          <div className="flex flex-wrap gap-2 mt-2">
            {watchedTags.map((tag, index) => (
              <div
                key={index}
                className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full flex items-center text-sm"
              >
                <Tag size={14} className="mr-1.5" />
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1.5 text-amber-600 hover:text-amber-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
