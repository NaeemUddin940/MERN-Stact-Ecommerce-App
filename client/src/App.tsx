import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainHeader from "./components/Header/MainHeader";
import Navigation from "./components/Header/Navigation";
import Footer from "./components/Footer/Footer";
import TopNavbar from "./components/Header/TopNavbar";
import ServicesSection from "./components/Home/ServicesSection";
import Shop from "./pages/Shop";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <TopNavbar />
      <MainHeader />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Fallback Route Setup */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ServicesSection />
      <Footer />
    </>
  );
}

export default App;
