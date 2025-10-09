import { getData } from "@/utils/GetData";
import { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Context তৈরি করো
export const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [checking, setChecking] = useState(false);
  const [user, setUser] = useState();
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await getData("/api/user/user-details");
        setUser(res.data);
        localStorage.setItem("role", res.data.role);
        if (res.data?.role === "ADMIN") {
          setAuthChanged(true);
          setChecking(true);
        }
      } catch (error) {
        console.error("❌ Failed to Fetch User Data to Authorization.");
        setAuthChanged(false);
      } finally {
        setChecking(false);
      }
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserDetails();
    }
  }, [authChanged, user]);

  const state = {
    isLogin,
    setIsLogin,
    user,
    checking,
    setAuthChanged,
    authChanged,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
