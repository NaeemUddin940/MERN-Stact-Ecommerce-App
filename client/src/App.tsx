import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainHeader from "./components/Header/MainHeader";
import Navigation from "./components/Header/Navigation";
import Footer from "./components/Footer/Footer";
import TopNavbar from "./components/Header/TopNavbar";
import ServicesSection from "./components/Home/ServicesSection";

function App() {
  return (
    <>
      <TopNavbar />
      <MainHeader />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Fallback Route Setup */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ServicesSection />
      <Footer />
    </>
  );
}

export default App;
