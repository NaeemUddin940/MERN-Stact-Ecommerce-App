import { getData } from "@/utils/GetData";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// 1️⃣ Context তৈরি করো
export const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  // ✅ localStorage থেকে প্রাথমিক login অবস্থা নির্ধারণ
  const [isLogin, setIsLogin] = useState(
    () => !!localStorage.getItem("accessToken")
  );
  const [checking, setChecking] = useState(true); // শুরুতে loading true রাখো
  const [user, setUser] = useState(null);
  const [authChanged, setAuthChanged] = useState(false);

  // ✅ User Details আনো
  async function getUserDetails() {
    try {
      const res = await getData("/api/user/user-details");
      if (res.success) {
        setUser(res.data);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("❌ Failed to fetch user details:", error.message);
      setUser(null);
      setIsLogin(false);
      localStorage.removeItem("accessToken");
    } finally {
      setChecking(false);
    }
  }

  // ✅ প্রথমবার বা login/logout পরিবর্তনে run হবে
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
      getUserDetails();
    } else {
      setChecking(false);
    }
  }, [authChanged]); // যখন authChanged toggle হবে, তখন refresh করবে

  // ✅ Logout Function
  async function logout(navigate) {
    try {
      const res = await fetch("http://localhost:8000/api/user/logout", {
        method: "GET",
        credentials: "include", // cookie send করবে
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setIsLogin(false);
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        setAuthChanged((prev) => !prev);
        navigate("/user/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ Debugging/logging (optional)
  useEffect(() => {
    console.log("🔁 Login status changed:", isLogin);
  }, [isLogin]);

  const state = {
    isLogin,
    setIsLogin,
    user,
    checking,
    setAuthChanged,
    logout,
    authChanged,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

// 3️⃣ Custom Hook
export const useAuthContext = () => useContext(AuthContext);
