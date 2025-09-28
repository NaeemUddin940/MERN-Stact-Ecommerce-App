import * as React from "react";
import {
  ChevronDown,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBasket,
  Users,
} from "lucide-react";
import { BiCategory } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import logo from "/PollenPop.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home Slides",
    url: "#",
    icon: Image,
    items: [
      { title: "Add Home Banner Slides", url: "#", icon: Home },
      { title: "Add Home Banner Slides", url: "#", icon: Home },
    ],
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
  {
    title: "Products",
    url: "#",
    icon: ShoppingBasket,
  },
  {
    title: "Category",
    url: "#",
    icon: BiCategory,
  },
  {
    title: "Orders",
    url: "#",
    icon: IoBagCheckOutline,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            tooltip="Visit Website"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 h-10 duration-200 ease-linear flex items-center ">
            <Link to="/" className="flex items-center gap-5">
              <img src={logo} className="w-5" alt="PollenPop" /> Visite Website
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:shadow-lg">
                  {item.items ? (
                    <Collapsible key={item.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <span>
                            <item.icon size={22} />
                          </span>
                          <span className="text-[16px] flex items-center gap-15">
                            {item.title} <ChevronDown />
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="flex flex-col gap-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.url}
                            className="flex items-center gap-2 pl-9 py-2 hover:bg-gray-200">
                            <span className="text-[14px] border-l-2 pl-1">
                              {subItem.title}
                            </span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild className="hover:bg-chart-1 ">
                      <Link to={item.url}>
                        <span>
                          <item.icon size={22} />
                        </span>
                        <span className="text-[16px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}

                  {/* {item.items &&
                    item.items.map((item) => (
                      <SidebarMenuButton>{item.title}</SidebarMenuButton>
                    ))} */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
