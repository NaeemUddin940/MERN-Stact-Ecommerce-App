import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toggle } from "../../components/ui/Toggle";
import { NavUser } from "./nav-user";
import NotificationBell from "./NotificationBell";
import { useState } from "react";
import { Link } from "react-router-dom";
const data = {
  user: {
    name: "MD. NAEEM UDDIN",
    email: "mdnaeemuddin14@gmail.com",
    avatar:
      "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/550811430_797952962841067_3611979962480220725_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHVebcLht2NKYvewDi6ZBEpo2tFYx_5cLKja0VjH_lwsoX9EGbNek9olPF1gisUKyClVjCetXcgmCwOUCYX-W5n&_nc_ohc=JQN98cSKkLcQ7kNvwHaeuEm&_nc_oc=AdlfMoiuTouNjUZchG8UeGnj_yYoBMgsfzgLqEjvCBzKkHttxGiFUMYvrhGW-oEwmjU&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=wJS_8H29SAOQmZHW3GVwaA&oh=00_AfZ_8vnBL1lpBxDEWHJPJzh9VXqjL7iL3HcoAUzvC9hzJQ&oe=68DD817D",
  },
};
export function SiteHeader() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <header className="flex py-2 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Admin Panel</h1>
        <div className="ml-auto flex items-center gap-5">
          <NotificationBell />
          {isLogin ? (
            <NavUser user={data.user} />
          ) : (
            <Button className="rounded-xl">
              <Link to="/admin/login">Login</Link>
            </Button>
          )}

          <Toggle />
        </div>
      </div>
    </header>
  );
}
