import { useState, useEffect, useCallback } from "react"

// Mock data is now part of the hook for demonstration
const getMockCategories = () => [
  {
    id: "1",
    name: "ঐতিহ্যবাহী জামদানি",
    description: "ঐতিহ্যবাহী জামদানি শাড়ি কালেকশন",
    image: "/assets/category-1.jpg",
    parentId: null,
    children: [
      {
        id: "1-1",
        name: "টাঙ্গাইল জামদানি",
        description: "টাঙ্গাইল অঞ্চলের ঐতিহ্যবাহী জামদানি",
        image: "/assets/product-2.jpg",
        parentId: "1",
        children: [],
        productCount: 12,
        createdAt: "2023-05-15T10:00:00Z",
        updatedAt: "2023-07-20T14:30:00Z"
      },
      {
        id: "1-2",
        name: "ঢাকাই জামদানি",
        description: "ঢাকার ঐতিহ্যবাহী জামদানি",
        image: "/assets/product-3.jpg",
        parentId: "1",
        children: [
          {
            id: "1-2-1",
            name: "সোনালি বুটি জামদানি",
            description: "সোনার সুতায় তৈরি ঢাকাই জামদানি",
            image: "/assets/product-4.jpg",
            parentId: "1-2",
            children: [],
            productCount: 5,
            createdAt: "2023-08-10T09:15:00Z",
            updatedAt: "2023-09-05T11:45:00Z"
          }
        ],
        productCount: 18,
        createdAt: "2023-06-05T15:30:00Z",
        updatedAt: "2023-08-10T09:00:00Z"
      }
    ],
    productCount: 30,
    createdAt: "2023-04-10T08:30:00Z",
    updatedAt: "2023-07-05T16:00:00Z"
  },
  {
    id: "2",
    name: "আধুনিক জামদানি",
    description: "আধুনিক ডিজাইনের জামদানি শাড়ি",
    image: "/assets/category-2.jpg",
    parentId: null,
    children: [
      {
        id: "2-1",
        name: "ফিউশন জামদানি",
        description: "আধুনিক এবং ঐতিহ্যবাহী মিশ্রণ",
        image: "/assets/product-1.jpg",
        parentId: "2",
        children: [],
        productCount: 8,
        createdAt: "2023-07-01T11:20:00Z",
        updatedAt: "2023-08-15T10:30:00Z"
      }
    ],
    productCount: 15,
    createdAt: "2023-05-20T13:45:00Z",
    updatedAt: "2023-07-25T09:30:00Z"
  },
  {
    id: "3",
    name: "উৎসব কালেকশন",
    description: "বিভিন্ন উৎসব উপলক্ষে বিশেষ জামদানি শাড়ি",
    image: "/assets/category-3.jpg",
    parentId: null,
    children: [],
    productCount: 10,
    createdAt: "2023-06-15T16:30:00Z",
    updatedAt: "2023-08-05T14:15:00Z"
  }
]

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      const mockData = getMockCategories()
      setCategories(mockData)
    } catch (err) {
      setError("শ্রেণী তালিকা লোড করতে সমস্যা হয়েছে।")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Simulate Add/Update/Delete operations
  const addCategory = async categoryData => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In a real app, you would POST to your API and then refetch or update state
    console.log("Adding category:", categoryData)
    await fetchCategories()
  }

  const updateCategory = async (categoryId, categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In a real app, you would PUT/PATCH to your API
    console.log("Updating category:", categoryId, categoryData)
    await fetchCategories()
  }

  const deleteCategory = async categoryId => {
    await new Promise(resolve => setTimeout(resolve, 800))
    // In a real app, you would DELETE from your API
    console.log("Deleting category:", categoryId)
    await fetchCategories()
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
}