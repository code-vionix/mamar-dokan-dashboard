import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/Forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();
  /* handle function start */
  const handleCreateProduct = async (data) => {
    // In a real app, you would make an API call here, e.g.,
    // await api.post('/products', data);
    // navigate("/admin/products");
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/products`,
      data
    );

    if (response.status === 201) {
      navigate("/products");
    }
  };
  /* handle function end */
  const handleCancel = () => {
    navigate("/products");
  };

  return <ProductForm onSubmit={handleCreateProduct} onCancel={handleCancel} />;
};
export default CreateProductPage;
