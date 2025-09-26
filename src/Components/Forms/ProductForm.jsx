import { motion } from "framer-motion";
import { Loader2, Save } from "lucide-react";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import AlertMessage from "./AlertMessage";
import BasicInfoSection from "./BasicInfoSection";
import CategoryTagsSection from "./CategoryTagsSection";
import ProductImagesSection from "./ProductImagesSection";

// A utility function for deep comparison of two objects
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export default function ProductForm({
  defaultValues = {},
  onSubmit,
  onCancel,
  formSuccess,
  setFormSuccess,
  loading,
  formError,
  setFormError,
}) {
  // console.log(defaultValues);

  // Use a ref to store the previous defaultValues for comparison
  const prevDefaultValuesRef = useRef();

  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      salePrice: "",
      categoryId: "",
      tags: [],
      images: [],
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    // Perform a deep comparison to check if defaultValues actually changed
    if (!deepEqual(prevDefaultValuesRef.current, defaultValues)) {
      reset(defaultValues);
    }
    // Update the ref for the next render
    prevDefaultValuesRef.current = defaultValues;
  }, [defaultValues, reset]);

  const onSubmitHandler = (data) => {
    setFormError(null);
    setFormSuccess(null);

    if (data.salePrice && data.salePrice >= data.price) {
      setFormError("বিশেষ মূল্য মূল মূল্যের চেয়ে কম হতে হবে।");
      return;
    }

    // Add additional manual validations here if needed, or rely on child components' validation.
    if (!data.images || data.images.length < 1 || data.images.length > 5) {
      setFormError("পণ্যের ছবির সংখ্যা অন্তত ১টি এবং সর্বাধিক ৫টি হতে হবে।");
      return;
    }
    if (data.tags.length < 1 || data.tags.length > 5) {
      setFormError("পণ্যের ট্যাগ সংখ্যা অন্তত ১টি এবং সর্বাধিক ৫টি হতে হবে।");
      return;
    }
    onSubmit(data);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-6 px-4 border-b border-amber-200">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-amber-900">
            {defaultValues.name ? "পণ্য এডিট করুন" : "নতুন পণ্য যুক্ত করুন"}
          </h1>
          <p className="text-amber-700 mt-1">
            আপনার জামদানি পণ্যের বিস্তারিত তথ্য যোগ/সম্পাদনা করুন।
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4">
        <AlertMessage success={formSuccess} error={formError} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <BasicInfoSection />
              <ProductImagesSection />
              <CategoryTagsSection />
              {/* <DetailsSection />
              <StockInfoSection /> */}
            </motion.div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`px-6 py-2.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors flex items-center ${
                  isSubmitting || loading ? "opacity-70 cursor-not-allowed" : ""
                } cursor-pointer`}
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    <span>সংরক্ষণ করুন</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
