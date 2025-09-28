import { SidebarProvider } from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayouts() {
  return (
    <div className="flex min-h-screen bg-background/50">
      {/* Admin sidebar */}
      <div className="flex flex-col pr-30">
        <h3>Admin Sidebar</h3>
        <Link to="admin-account">Admin Account</Link>
        <Link to="dashboard">Admin Dashboard</Link>
      </div>
      {/* Admin main content */}
      <main className="flex-1 bg-background">
        <h3>Admin Header</h3>
        <Outlet /> {/* Admin pages render here */}
      </main>
    </div>
  );
}
