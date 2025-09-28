import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayouts() {
  return (
    <div className="flex min-h-screen bg-background/50">
      {/* Admin sidebar */}
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 bg-background">
          <SiteHeader />
          <Outlet /> {/* Admin pages render here */}
        </main>
      </SidebarProvider>
    </div>
  );
}
