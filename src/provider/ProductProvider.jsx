import React, { useEffect } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import productsMockData from "../data/productsData.js";
import { useProductReducer } from "../hooks/useProductReducer.js";

/**
 * The ProductProvider component that manages the product state and provides it to its children.
 * It uses the useProductReducer hook to handle state logic and simulates an API call on mount.

 */
export const ProductProvider = ({ children }) => {
  const { state, dispatch, getSortedAndFilteredProducts } = useProductReducer();

  // Simulate an API call to fetch products on component mount.
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "SET_PRODUCTS", payload: productsMockData });
    }, 1000);
  }, [dispatch]);

  // Derive new state based on the current state.
  const sortedAndFilteredProducts = getSortedAndFilteredProducts();
  const indexOfLastItem = state.currentPage * state.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - state.itemsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    sortedAndFilteredProducts.length / state.itemsPerPage
  );

  // The value object that will be provided to consumers of the context.
  const value = {
    ...state,
    dispatch,
    currentProducts,
    totalPages,
    sortedAndFilteredProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
