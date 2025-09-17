import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/Forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();
  /* handle function start */
  const handleCreateProduct = async (data) => {
    console.log("Creating new product:", data);
    // In a real app, you would make an API call here, e.g.,
    // await api.post('/products', data);
    navigate("/admin/products");
  };
  /* handle function end */
  const handleCancel = () => {
    navigate("/admin/products");
  };

  return <ProductForm onSubmit={handleCreateProduct} onCancel={handleCancel} />;
};
export default CreateProductPage;
