import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// Custom hook to use the product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
