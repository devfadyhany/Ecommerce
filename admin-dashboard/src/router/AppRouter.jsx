import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";

import Users from "../pages/Users";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Carts from "../pages/Carts";
import Settings from "../pages/Settings";
import AddProduct from "../pages/AddProduct";
  
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />

          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct isEditMode={false} />} />
            <Route path="edit/:id" element={<AddProduct isEditMode={true} />} />
          </Route>
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/settings" element={<Settings />} />
        </Route>  

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;