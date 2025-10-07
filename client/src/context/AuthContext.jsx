import { createContext, useState, useContext } from "react";

// 1️⃣ Context তৈরি করো
export const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const state = {
    isLogin,
    setIsLogin,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
