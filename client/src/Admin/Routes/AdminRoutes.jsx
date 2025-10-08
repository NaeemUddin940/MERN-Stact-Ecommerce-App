// src/Admin/routes/AdminRoute.js
import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../Components/ui/isAdminLoader";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const { checking, authChanged } = useAuthContext();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 2000);
    return () => clearTimeout(timer);
  });
  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!authChanged) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{children}</>;
}
