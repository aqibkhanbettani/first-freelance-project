import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./App.css";
import { ToastContainer } from 'react-toastify';

// Import your pages
import Customers from "./Customers";
import Products from "./Products";
import Reports from "./Reports";
import Dashboard from "./Dashboard";
import NewOrder from "./NewOrder";
import Newcustamer from "./Newcustomer";
import CustomerReport from "./CustomerReport";
import Sala from "./Sala";
import Newsala from "./Newsala";
import Login from "./Login";
import SalaDetail from "./SalaDetail";
import UpdateCustomer from "./UpdateCustomer";
import EditProduct from "./EditProduct";
import NewProduct from "./NewProduct";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      {isAuthenticated && <Sidebar />} {/* ✅ Sidebar only shows if logged in */}
      <ToastContainer />

      <div
        style={{
          background:
            "linear-gradient(to bottom right, #E9EEF8 0%, rgba(255, 255, 255, 0.9) 100%)",
        }}
      >
        <div className={`main-content ${isAuthenticated && "main-content-margin"}`}>
          <Routes>
            {/* Public Route */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/customers"
              element={
                isAuthenticated ? <Customers /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/products"
              element={
                isAuthenticated ? <Products /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/products/:id"
              element={
                isAuthenticated ? <EditProduct /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/products/add"
              element={
                isAuthenticated ? <NewProduct /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/reports"
              element={
                isAuthenticated ? <Reports /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/newOrder"
              element={
                isAuthenticated ? <NewOrder /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/newcustamer"
              element={
                isAuthenticated ? <Newcustamer /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/CustomerReport"
              element={
                isAuthenticated ? <CustomerReport /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/sala"
              element={
                isAuthenticated ? <Sala /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/newsala"
              element={
                isAuthenticated ? <Newsala /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/sala/:id"
              element={
                isAuthenticated ? <SalaDetail /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/update/:id"
              element={
                isAuthenticated ? <UpdateCustomer /> : <Navigate to="/login" replace />
              }
            />

            {/* ✅ Default route for "/" */}
            <Route
              path="/"
              element={
                <Navigate
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  replace
                />
              }
            />

            {/* Optional: catch-all for unknown routes */}
            <Route
              path="*"
              element={
                <Navigate
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  replace
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
