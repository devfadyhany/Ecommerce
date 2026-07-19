import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import StoreLayout from "../components/layout/StoreLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import OrderDetails from "../pages/OrderDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products">
            <Route path=":id" element={<ProductDetails />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <StoreLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/orders">
            <Route index element={<Orders />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
