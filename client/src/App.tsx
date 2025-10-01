import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import CheckoutPage from "./pages/Checkout";
import PublicLayouts from "./Layouts/PublicLayouts";
import AdminLayouts from "./Layouts/AdminLayouts";
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import AdminAccount from "./Admin/pages/Auth/AdminAccount";
import Dashboard from "./Admin/pages/Dashboard/Dashboard";
import UsersProfile from "./pages/UsersProfile";
import HomeSlides from "@/Admin/pages/AddHomeSliders/AddHomeSliders";
import ProductsList from "./Admin/pages/Products/ProductsList";
import AdminLogin from "./Admin/pages/Auth/AdminLogin";
import AdminSignUp from "./Admin/pages/Auth/AdminSignUp";
import { VerifyOtp } from "./pages/VerifyOtp";
import HomeSliderLists from "./Admin/pages/HomeSliderLists/HomeSliderLists";
import AddHomeSliders from "@/Admin/pages/AddHomeSliders/AddHomeSliders";
import AddCategory from "./Admin/pages/AddCategory/AddCategory";
import AddSubCategory from "./Admin/pages/AddSubCategory/AddSubCategory";
import AddChildCategory from "./Admin/pages/AddChildCategory/AddChildCategory";
import CategoryList from "./Admin/pages/AllCategoryList/AllCategoryList";
import Users from "./Admin/pages/Users/Users";
import Orders from "./Admin/pages/Orders/Orders";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-account" element={<UsersProfile />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/sign-up" element={<SignUp />} />

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
        <Route path="users" element={<Users />} />
        <Route path="category/all-category-lists" element={<CategoryList />} />
        <Route path="category/add-category" element={<AddCategory />} />
        <Route path="category/add-sub-category" element={<AddSubCategory />} />
        <Route path="orders" element={<Orders />} />
        <Route
          path="category/add-child-category"
          element={<AddChildCategory />}
        />
        <Route path="products/product-list" element={<ProductsList />} />
        <Route path="add-home-sliders" element={<AddHomeSliders />} />
        <Route path="home-slider-lists" element={<HomeSliderLists />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/sign-up" element={<AdminSignUp />} />

      {/* Fallback Route Setup */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
