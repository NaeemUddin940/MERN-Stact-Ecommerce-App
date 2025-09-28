// src/Admin/routes/AdminRoute.tsx
import { Navigate } from "react-router-dom";
type AdminRouteProps = { children: React.ReactNode };

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.role === "admin";
};

export default function AdminRoutes({ children }: AdminRouteProps) {
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
