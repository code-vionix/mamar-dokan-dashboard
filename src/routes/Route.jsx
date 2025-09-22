import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

import ProductsPage from "../pages/Products/ProductsPage";
import CreateProductPage from "../pages/create/CreateProductPage";
import EditProductPage from "../pages/editProduct/EditProductPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import OrderManagement from "../pages/order/allOrder/AllOrder"
import OrdersProcessingPage from "../pages/order/orderProcessing/OrderProcessing";
import CategoriesPage from "../pages/categories/CategoriesPgae";
import SettingsPage from "../pages/setting/Setting";

function App() {
  return (
    <Router>
      <Routes>
        {/*
          The parent route for /admin uses the AdminLayout component.
          It doesn't render any content itself, just the layout.
        */}
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/categories" element={<CategoriesPage />} />
          <Route
            path="/products/:productId/edit"
            element={<EditProductPage />}
          />

          <Route path="/inventory" element={<InventoryPage />} />
        </Route>

        {/* Other non-admin routes can go here*/}
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/orders/processing" element={<OrdersProcessingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
