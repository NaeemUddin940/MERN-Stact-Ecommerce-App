import Footer from "@/components/Footer/Footer";
import MainHeader from "@/components/Header/MainHeader";
import Navigation from "@/components/Header/Navigation";
import TopNavbar from "@/components/Header/TopNavbar";
import ServicesSection from "@/components/Home/ServicesSection";
import { Outlet } from "react-router-dom";

export default function PublicLayouts() {
  
  return (
    <div>
      <TopNavbar />
      <MainHeader />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <ServicesSection />
      <Footer />
    </div>
  );
}
