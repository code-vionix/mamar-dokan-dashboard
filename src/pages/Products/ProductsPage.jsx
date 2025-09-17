import Products from "../../Components/Products/Products.jsx";
import { ProductProvider } from "../../provider/ProductProvider.jsx";

export default function ProductsPage() {
  return (
    <ProductProvider>
      <Products />
    </ProductProvider>
  );
}
