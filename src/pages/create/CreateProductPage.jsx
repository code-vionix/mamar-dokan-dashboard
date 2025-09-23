import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/Forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  /* handle function start */
  const handleCreateProduct = async (data) => {
    setLoading(true);
    // In a real app, you would make an API call here, e.g.,
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      data
    );

    if (response.status === 201) {
      setFormSuccess("পণ্য সফলভাবে যুক্ত হয়েছে!");
      setLoading(false);
      navigate("/products");
    }
    setLoading(false);
  };
  /* handle function end */
  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <ProductForm
      onSubmit={handleCreateProduct}
      onCancel={handleCancel}
      formSuccess={formSuccess}
      setFormSuccess={setFormSuccess}
      loading={loading}
    />
  );
};
export default CreateProductPage;
