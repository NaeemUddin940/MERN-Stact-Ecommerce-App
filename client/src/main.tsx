import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { NavItemProvider } from "./context/NavItemContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <ProductProvider>
    <ToastContainer />
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
);
