import { getData } from "@/utils/GetData";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// 1️⃣ Context তৈরি করো
export const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await getData("/api/user/user-details");
        setUser(res.data);
        if (res.data.role === "ADMIN") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("❌ Failed to Fetch User Data to Authorization.");
        setAuthorized(false);
      } finally {
        setChecking(false);
      }
    }

    getUserDetails();
  }, []);

  const state = {
    isLogin,
    setIsLogin,
    user,
    checking,
    authorized,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
