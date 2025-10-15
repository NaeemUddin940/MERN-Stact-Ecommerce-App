import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { NavItemProvider } from "./context/NavItemContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ProductProvider>
      {/* <ToastContainer
        pauseOnHover={false}
        position="top-right"
        autoClose={1000}
      /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <NavItemProvider>
        <CategoryProvider>
          <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </CategoryProvider>
      </NavItemProvider>
    </ProductProvider>
  </AuthProvider>
);
