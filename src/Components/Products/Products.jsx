// import React, { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct.js";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";
import Pagination from "../Common/Pagination.jsx";
import ActionsBar from "./ActionsBar.jsx";
import EmptyState from "./EmptyState.jsx";
import ProductTable from "./ProductTable.jsx";
import StatCards from "./StatCards.jsx";

function Products({ pageName }) {
  const {
    loading,
    products,
    currentProducts,
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedProducts,
    sortConfig,
    currentPage,
    totalPages,
    sortedAndFilteredProducts,
    dispatch,
    itemsPerPage,
  } = useProduct();

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  /* all handel function start */
  const setSearchTerm = (term) =>
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  const setSelectedCategory = (category) =>
    dispatch({ type: "SET_CATEGORY", payload: category });
  const setSelectedStatus = (status) =>
    dispatch({ type: "SET_STATUS", payload: status });

  const handleToggleSelectAll = () =>
    dispatch({ type: "TOGGLE_SELECT_ALL", payload: currentProducts });
  const handleToggleSelect = (productId) =>
    dispatch({ type: "TOGGLE_SELECT_PRODUCT", payload: productId });
  const paginate = (pageNumber) =>
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  const nextPage = () =>
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: Math.min(currentPage + 1, totalPages),
    });
  const prevPage = () =>
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: Math.max(currentPage - 1, 1),
    });

  const handleDeleteSelectedProducts = () => {
    dispatch({ type: "TOGGLE_SELECT_ALL_DELETE", payload: currentProducts });
  };
  const handleDeleteProducts = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };
  /* all handel function end */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-bengali">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          পণ্য ব্যবস্থাপনা
        </h1>
        <p className="text-gray-600">
          আপনার জামদানি শাড়ী ইনভেন্টরি পরিচালনা করুন
        </p>
      </div>
      <StatCards products={products} />
      <ActionsBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedProducts={selectedProducts}
        handleDeleteSelectedProducts={handleDeleteSelectedProducts}
      />
      {loading ? (
        <LoadingSpinner />
      ) : currentProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ProductTable
            currentProducts={currentProducts}
            selectedProducts={selectedProducts}
            handleToggleSelectAll={handleToggleSelectAll}
            handleToggleSelect={handleToggleSelect}
            sortConfig={sortConfig}
            handleDeleteProducts={handleDeleteProducts}
            pageName={pageName}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            totalItems={sortedAndFilteredProducts.length}
          />
        </>
      )}
    </div>
  );
}
export default Products;
