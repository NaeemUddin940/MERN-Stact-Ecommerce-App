import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import { VerifyOTP } from "@/pages/VerifyOtp";
import CheckoutPage from "./pages/Checkout";
import PublicLayouts from "./Layouts/PublicLayouts";
import AdminLayouts from "./Layouts/AdminLayouts";
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import AdminAccount from "./Admin/pages/AdminAccount";
import Dashboard from "./Admin/pages/Dashboard";
import UsersProfile from "./pages/UsersProfile";
import HomeSlides from "@/Admin/pages/HomeSlides";
import AdminLogin from "./Admin/pages/AdminLogin";
import AdminSignUp from "./Admin/pages/AdminSignUp";
import AdminVerifyOTP from "./Admin/pages/VerifyOTP";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/sign-up" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-account" element={<UsersProfile />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>

      {/* Admin ROutes Define Here */}
      <Route
        path="/admin"
        element={
          <AdminRoutes>
            <AdminLayouts />
          </AdminRoutes>
        }>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="admin-account" element={<AdminAccount />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home-slides" element={<HomeSlides />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/sign-up" element={<AdminSignUp />} />
      <Route path="/admin/verify-otp" element={<AdminVerifyOTP />} />

      {/* Fallback Route Setup */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
