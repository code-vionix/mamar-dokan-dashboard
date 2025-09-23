import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/Forms/ProductForm";
import { productsPath } from "../../routes/path";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  /* handle function start */

  const handleCreateProduct = async (productData) => {
    if (
      !productData ||
      !productData.images ||
      productData.images.length === 0
    ) {
      console.error("No images found to upload.");
      setFormError("ছবি আপলোড করার জন্য কোনো ফাইল পাওয়া যায়নি।");
      return;
    }

    setLoading(true);

    try {
      const imageFormData = new FormData();
      for (const file of productData.images) {
        imageFormData.append("files", file);
      }

      const imageUploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/image`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imageUploadResponse.status !== 200) {
        setFormError("ছবি আপলোড করতে সমস্যা হয়েছে।");
        setLoading(false);
      }

      const imageUrls = imageUploadResponse.data.url;

      const finalProductData = {
        ...productData,
        images: imageUrls,
      };

      const productCreationResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        finalProductData
      );

      if (productCreationResponse.status === 201) {
        setFormSuccess("পণ্য সফলভাবে যুক্ত হয়েছে!");
        setFormError(null);
        navigate(productsPath);
      } else {
        setFormError("পণ্য যুক্ত করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error during product creation process:", error);
      setFormError(`পণ্য যুক্ত করতে সমস্যা হয়েছে: ${error.message}`);
    } finally {
      setLoading(false);
      setFormSuccess(null);
      setFormError(null);
    }
  };
  /* handle function end */
  const handleCancel = () => {
    navigate(productsPath);
  };

  return (
    <ProductForm
      onSubmit={handleCreateProduct}
      onCancel={handleCancel}
      formSuccess={formSuccess}
      setFormSuccess={setFormSuccess}
      loading={loading}
      formError={formError}
      setFormError={setFormError}
    />
  );
};
export default CreateProductPage;
