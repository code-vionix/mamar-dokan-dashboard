import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

// Dummy page components for demonstration
const DashboardPage = () => <div>Dashboard Content</div>;
const ProductsPage = () => <div>Products Management Content</div>;
const CustomersPage = () => <div>Customers Content</div>;
const SettingsPage = () => <div>Settings Content</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/*
          The parent route for /admin uses the AdminLayout component.
          It doesn't render any content itself, just the layout.
        */}
        <Route path="/admin" element={<Layout />}>
          {/* The index route renders at the parent's path: /admin.
            This will display the DashboardPage inside the AdminLayout's Outlet.
          */}
          <Route index element={<DashboardPage />} />

          {/*
            These are nested routes. The full path is a combination of
            the parent's path and the child's path (e.g., /admin/products).
          */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Add more nested routes for other pages */}
          {/* <Route path="orders" element={<OrdersPage />} /> */}
          {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
        </Route>

        {/* Other non-admin routes can go here, like the home page */}
        <Route path="/" element={<div>Public Home Page</div>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
