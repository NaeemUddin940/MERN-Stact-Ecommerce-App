import Footer from "@/components/Footer/Footer";
import MainHeader from "@/components/Header/MainHeader";
import Navigation from "@/components/Header/Navigation";
import TopNavbar from "@/components/Header/TopNavbar";
import ServicesSection from "@/components/Home/ServicesSection";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayouts() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {loader ? (
        <div>Loading.....</div>
      ) : (
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
      )}
    </div>
  );
}
