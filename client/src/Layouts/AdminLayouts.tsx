import { AppSidebar } from "@/Admin/Components/ui/app-sidebar";
import { SiteHeader } from "@/Admin/Components/ui/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AdminLayouts() {
  return (
    <div className="flex min-h-screen bg-background/50">
      {/* Admin sidebar */}
      <ToastContainer
        pauseOnHover={false}
        position="top-right"
        autoClose={1000}
      />
      <SidebarProvider>
        <AppSidebar />
        {/* <Sidebar/> */}
        <main className="flex-1 bg-background">
          <SiteHeader />
          <Outlet /> {/* Admin pages render here */}
        </main>
      </SidebarProvider>
    </div>
  );
}
