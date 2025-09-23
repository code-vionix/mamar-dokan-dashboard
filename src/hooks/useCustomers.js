import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

// Custom hook to use the product context
export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
