import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

import CustomersPage from "../pages/Customers/CustomersPage";
import ProductsPage from "../pages/Products/ProductsPage";
import CategoriesPage from "../pages/categories/CategoriesPgae";
import CreateProductPage from "../pages/create/CreateProductPage";
import EditProductPage from "../pages/editProduct/EditProductPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import OrderManagement from "../pages/order/allOrder/AllOrder";
import OrdersProcessingPage from "../pages/order/orderProcessing/OrderProcessing";
import { productsPath } from "./path";

function App() {
  return (
    <Router>
      <Routes>
        {/*
          The parent route for /admin uses the AdminLayout component.
          It doesn't render any content itself, just the layout.
        */}
        <Route path={productsPath} element={<Layout />}>
          <Route path={productsPath} element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/categories" element={<CategoriesPage />} />
          <Route
            path="/products/:productId/edit"
            element={<EditProductPage />}
          />

          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/orders/processing" element={<OrdersProcessingPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
