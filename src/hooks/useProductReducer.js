// src/hooks/useProductReducer.js
import { useReducer } from "react";
import { initialState, productReducer } from "../recucer/productReducer.js";

/**
 * A custom hook that encapsulates the state management logic for products.
 */
export const useProductReducer = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  /**
   * Applies all current filters and sorting to the product list.
   */
  const getSortedAndFilteredProducts = () => {
    let filteredProducts = [...state.products];

    // Apply search filter
    if (state.searchTerm.trim() !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.selectedCategory !== "সকল") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === state.selectedCategory
      );
    }

    // Apply status filter
    if (state.selectedStatus !== "সকল") {
      switch (state.selectedStatus) {
        case "সক্রিয়":
          // Filter for products that are in stock
          filteredProducts = filteredProducts.filter(
            (product) => product.status === "IN_STOCK"
          );
          break;
        case "স্টক নেই":
          // Filter for products that are not in stock
          filteredProducts = filteredProducts.filter(
            (product) => product.status === "LOW_STOCK"
          );
          break;
      }
    }

    return filteredProducts;
  };

  return { state, dispatch, getSortedAndFilteredProducts };
};
