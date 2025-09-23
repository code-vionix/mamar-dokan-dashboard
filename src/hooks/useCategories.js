import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // GET: Fetches all categories
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/category`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      const data = await response.json();

      setCategories(data.data);
    } catch (err) {
      setError("Failed to load category list.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // POST: Adds a new category
  const addCategory = async (categoryData) => {
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("description", categoryData.description);
      if (categoryData.parentId) {
        formData.append("parentId", categoryData.parentId);
      }
      if (categoryData.image instanceof File) {
        formData.append("image", categoryData.image);
      }

      const response = await fetch(`${API_URL}/category`, {
        method: "POST",

        body: formData,
      });

      if (response.status === 400) {
        setSuccess("Category already exists.");
      }
      if (!response.ok) {
        throw new Error("Failed to add category.");
      }

      await fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      throw err; // Propagate the error to the component
    }
  };

  // PATCH: Updates an existing category
  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category.");
      }
      console.log("Updating category:", categoryId, categoryData);
      await fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
      throw err;
    }
  };

  // DELETE: Deletes a category by ID

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }
      console.log("Deleting category:", categoryId);
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      throw err;
    }
  };

  // GET: Fetches a single category by ID
  const getSingleCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch single category.");
      }
      const data = await response.json();
      console.log("Fetched single category:", data.data);
      return data.data; // Return the single category object
    } catch (err) {
      console.error("Error fetching single category:", err);
      throw err;
    }
  };

  return {
    success,
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory, // Now returns the fetched category
  };
}
