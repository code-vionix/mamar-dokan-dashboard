import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import ProductForm from "../../Components/Forms/ProductForm";
import { productsPath } from "../../routes/path";

export default function EditProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  // Function to transform the API response
  const transformApiResponse = (apiResponse) => {
    // Extract features and put them into a simple key-value object
    const features = {};
    apiResponse.features.forEach((feature) => {
      features[feature.key] = feature.value;
    });

    // Map image objects to an array of URLs
    const imageUrls = apiResponse.images.map((image) => image.url);

    // Return the transformed data object
    return {
      name: apiResponse.name,
      price: apiResponse.price,
      salePrice: apiResponse.salePrice,
      category: apiResponse.categoryId, // Assuming you handle category ID mapping elsewhere
      tags: apiResponse.tags || [],
      description: apiResponse.description,
      material: features.material,
      color: features.color,
      pattern: features.pattern,
      region: features.region,
      quantity: apiResponse.inventoryQuantity,
      inStock: apiResponse.status === "IN_STOCK" ? true : false,
      images: imageUrls,
    };
  };

  // Example usage in your useEffect hook
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }

        const { data } = await response.json();

        // Use the helper function to transform the API response
        const transformedData = transformApiResponse(data);
        setProductData(transformedData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "An error occurred.");
        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleEditSubmit = async (data) => {
    setEditLoading(true);

    try {
      const newImagesToUpload = data.images.filter(
        (image) => image instanceof File
      );
      const existingImageUrls = data.images.filter(
        (image) => typeof image === "string"
      );

      let newImageUrls = [];

      if (newImagesToUpload.length > 0) {
        const imageFormData = new FormData();
        newImagesToUpload.forEach((file) => {
          imageFormData.append("files", file);
        });

        const imageUploadResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/products/image`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        if (!imageUploadResponse.ok) {
          throw new Error("Failed to upload new images.");
        }

        const uploadResult = await imageUploadResponse.json();

        if (uploadResult && Array.isArray(uploadResult.url)) {
          newImageUrls = uploadResult.url;
        } else {
          console.error(
            "Image upload API response format is incorrect:",
            uploadResult
          );
          throw new Error("Image upload response is invalid.");
        }
      }

      const finalImageUrls = [...existingImageUrls, ...newImageUrls];

      const payload = {
        ...data,
        images: finalImageUrls,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      const result = await response.json();
      setFormSuccess("পণ্য সফলভাবে আপডেট হয়েছে!");
      navigate(productsPath);
    } catch (error) {
      console.error("Error updating product:", error);
      setFormError("পণ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(productsPath);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <ProductForm
      defaultValues={productData}
      onSubmit={handleEditSubmit}
      onCancel={handleCancel}
      formSuccess={formSuccess}
      setFormSuccess={setFormSuccess}
      loading={editLoading}
      formError={formError}
      setFormError={setFormError}
    />
  );
}
