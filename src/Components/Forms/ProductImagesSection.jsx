import { Upload, X } from "lucide-react";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import getImageSrc from "../../lib/getImageSrc";

// Reusable component for displaying images
const MockImage = ({ src, alt, width, height, className }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);

export default function ProductImagesSection() {
  const fileInputRef = useRef(null);
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    register,
  } = useFormContext();
  const watchedImages = watch("images");

  // This function determines the correct source for the image preview.

  register("images", {
    validate: (value) => {
      if (!value || value.length === 0) {
        return "অন্তত একটি পণ্যের ছবি আপলোড করুন";
      }
      if (value.length > 5) {
        return "সর্বাধিক ৫টি ছবি আপলোড করা যাবে";
      }
      return true;
    },
  });

  // Handle file selection and update form state
  const handleImageUpload = (e) => {
    const filesArray = Array.from(e.target.files);
    const currentImages = watchedImages || [];

    // Check for the maximum number of images.
    if (currentImages.length + filesArray.length > 5) {
      setError("images", {
        type: "manual",
        message: "সর্বাধিক ৫টি ছবি আপলোড করা যাবে",
      });
      e.target.value = null;
      return;
    }

    clearErrors("images");

    setValue("images", [...currentImages, ...filesArray], {
      shouldDirty: true,
      shouldValidate: true,
    });

    // Clear the file input so the same files can be selected again
    e.target.value = null;
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = (watchedImages || []).filter((_, i) => i !== index);
    setValue("images", updatedImages, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (updatedImages.length === 0) {
      setError("images", {
        type: "manual",
        message: "অন্তত একটি পণ্যের ছবি আপলোড করুন",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">পণ্যের ছবি</h2>
      <div>
        <div className="mt-2 flex flex-wrap gap-4 mb-4">
          {(watchedImages || []).map((image, index) => (
            <div key={index} className="relative group">
              <div className="h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                <MockImage
                  src={getImageSrc(image)} // Use the new helper function
                  alt={`Product image ${index + 1}`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 text-white opacity-80 hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-24 w-24 rounded-md border-2 border-dashed border-amber-300 hover:border-amber-400 flex flex-col items-center justify-center text-amber-500 transition-colors"
          >
            <Upload size={20} />
            <span className="text-xs mt-2">ছবি আপলোড</span>
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="hidden"
        />
        <p className="text-sm text-gray-500">
          অন্তত ১টি এবং সর্বাধিক ৫টি ছবি আপলোড করুন।
        </p>
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
        )}
      </div>
    </div>
  );
}
