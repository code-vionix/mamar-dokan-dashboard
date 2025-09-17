import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

import ProductsPage from "../pages/Products/ProductsPage";
import CreateProductPage from "../pages/create/CreateProductPage";
import EditProductPage from "../pages/editProduct/EditProductPage";
import InventoryPage from "../pages/inventory/InventoryPage";

function App() {
  return (
    <Router>
      <Routes>
        {/*
          The parent route for /admin uses the AdminLayout component.
          It doesn't render any content itself, just the layout.
        */}
        <Route path="/admin" element={<Layout />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route
            path="/admin/products/:productId/edit"
            element={<EditProductPage />}
          />

          <Route path="/admin/inventory" element={<InventoryPage />} />
        </Route>

        {/* Other non-admin routes can go here*/}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
