import Products from "../../Components/Products/Products";
import { ProductProvider } from "../../provider/ProductProvider";

export default function InventoryPage() {
  return (
    <ProductProvider>
      <Products pageName="inventory" />
    </ProductProvider>
  );
}
