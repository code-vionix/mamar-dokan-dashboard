import { motion } from "framer-motion";
import { FolderTree } from "lucide-react";
import React, { useState } from "react";

// Import Components

import CategoryForm from "../../Components/categories/CategoryForm";
import CategoryList from "../../Components/categories/CategoryList";
import DeleteConfirmationModal from "../../Components/categories/DeleteConfirmationModal";
import Notification from "../../Components/categories/Notification";
import PageHeader from "../../Components/categories/PageHeader";
import { useCategories } from "../../hooks/useCategories";

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    error: loadError,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    success,
  } = useCategories();

  // UI state for managing form and modal visibility
  const [formMode, setFormMode] = useState("closed"); // 'closed', 'add', 'edit'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 4000);
  };

  // --- FORM HANDLERS ---
  const handleAddNew = (parentId = null) => {
    setSelectedCategory({ parentId }); // Pre-fill parentId for sub-categories
    setFormMode("add");
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormMode("edit");
  };

  const handleCancelForm = () => {
    setFormMode("closed");
    setSelectedCategory(null);
  };

  const handleSubmitForm = async (formData) => {
    if (!formData.name.trim()) {
      showNotification("error", "শ্রেণীর নাম প্রদান করুন");
      return;
    }

    setIsSubmitting(true);
    try {
      if (formMode === "add") {
        await addCategory(formData);
        showNotification("success", "নতুন শ্রেণী সফলভাবে যুক্ত হয়েছে");
      } else {
        await updateCategory(formData.id, formData);
        showNotification("success", "শ্রেণী সফলভাবে আপডেট হয়েছে");
      }
      handleCancelForm();
    } catch (error) {
      showNotification("error", "শ্রেণী সংরক্ষণ করতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DELETE HANDLERS ---
  const handleDelete = (categoryId) => {
    setCategoryToDelete(categoryId);
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteCategory(categoryToDelete);
      showNotification("success", "শ্রেণী সফলভাবে মুছে ফেলা হয়েছে");
    } catch (error) {
      showNotification("error", "শ্রেণী মুছতে সমস্যা হয়েছে।");
    } finally {
      setCategoryToDelete(null);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader />

      <main className="max-w-7xl mx-auto py-8 px-4">
        <Notification type={notification.type} message={notification.message} />
        {loadError && <Notification type="error" message={loadError} />}

        <DeleteConfirmationModal
          isOpen={!!categoryToDelete}
          isSubmitting={isSubmitting}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={handleConfirmDelete}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <CategoryList
              categories={categories}
              isLoading={isLoading}
              onRefresh={fetchCategories}
              onAddNew={() => handleAddNew(null)}
              onAddSubCategory={handleAddNew}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 rounded-lg p-4 border border-amber-200"
            >
              <h3 className="font-medium text-amber-800 flex items-center">
                <FolderTree size={18} className="mr-2" />
                শ্রেণী বিন্যাস সম্পর্কে নোট
              </h3>
              <p className="mt-2 text-sm text-amber-700">
                • মূল শ্রেণী হল সর্বোচ্চ স্তর, যেমন "ঐতিহ্যবাহী জামদানি"।
              </p>
              <p className="mt-1 text-sm text-amber-700">
                • উপ-শ্রেণী হল মূল শ্রেণীর অধীনে, যেমন "টাঙ্গাইল জামদানি"।
              </p>
            </motion.div>
          </div>

          {/* Right Column (Form) */}
          {formMode !== "closed" && (
            <CategoryForm
              key={selectedCategory?.id || "add-form"} // Use key to force re-mount and reset form state
              initialData={
                formMode === "edit"
                  ? selectedCategory
                  : { parentId: selectedCategory?.parentId }
              }
              isSubmitting={isSubmitting}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
              categories={categories}
              success={success}
            />
          )}
        </div>
      </main>
    </div>
  );
}
