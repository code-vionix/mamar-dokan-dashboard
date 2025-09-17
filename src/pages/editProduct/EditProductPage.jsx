import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import ProductForm from "../../Components/Forms/ProductForm";
import productsMockData from "../../data/productsData"; // Assuming this path is correct

export default function EditProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const foundProduct = productsMockData.find(
      (product) => product.id === productId
    );

    if (foundProduct) {
      // Correctly map all fields from the mock data to the form's expected keys
      const transformedData = {
        name: foundProduct.name,
        price: foundProduct.price,
        salePrice: foundProduct.salePrice, // Correctly pull salePrice
        category: foundProduct.category, // Pass the category name directly
        tags: foundProduct.tags || [], // Use the 'tags' array from data, default to empty
        description: foundProduct.description,
        material: foundProduct.material,
        color: foundProduct.color,
        pattern: foundProduct.pattern,
        region: foundProduct.region,
        quantity: foundProduct.quantity, // Correctly use 'quantity'
        inStock: foundProduct.inStock, // Correctly use the 'inStock' boolean
        images: foundProduct.images || [], // Correctly use the 'images' array
      };
      setProductData(transformedData);
      setError(null);
    } else {
      setProductData(null);
      setError("Product not found.");
    }
    setLoading(false);
  }, [productId]);

  const handleEditSubmit = (data) => {
    console.log("Submitting updated product data:", data);
    // Here you would send the data to your API to update the product
    navigate("/admin/products");
  };

  const handleCancel = () => {
    navigate("/admin/products");
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
    />
  );
}
