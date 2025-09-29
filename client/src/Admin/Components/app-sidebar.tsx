import * as React from "react";
import { Collapse } from "react-collapse";
import {
  ChevronDown,
  ChevronUp,
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
import { Separator } from "@/components/ui/separator";
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
    subItems: [
      { title: "Add Home Banner Slides", url: "#", icon: Home },
      { title: "Home Banner List", url: "#", icon: Home },
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
    subItems: [
      { title: "Product List", url: "#" },
      { title: "Product Upload", url: "#" },
    ],
  },
  {
    title: "Category",
    url: "#",
    icon: BiCategory,
    subItems: [
      { title: "Category List", url: "#" },
      { title: "Add a Category", url: "#" },
      { title: "Sub Category List", url: "#" },
      { title: "Add a Sub Category", url: "#" },
    ],
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
  const [subMenuIndex, setSubMenuIndex] = React.useState(null);

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
              {items.map((item, i) => (
                <SidebarMenuItem key={i} className="hover:shadow-lg ">
                  {item.subItems ? (
                    <div>
                      <SidebarMenuButton
                        className="cursor-pointer flex hover:bg-chart-1 items-center justify-between"
                        onClick={() =>
                          setSubMenuIndex(
                            subMenuIndex === item.title ? null : item.title
                          )
                        }>
                        <div className="flex items-center gap-2">
                          <item.icon size={22} />
                          <span className="text-[16px]">{item.title}</span>
                        </div>
                        <span
                          className={`transition-transform ${
                            subMenuIndex === item.title ? "rotate-180" : ""
                          }`}>
                          <ChevronDown />
                        </span>
                      </SidebarMenuButton>

                      <div className="ml-7 border-l pl-3">
                        {item.subItems.map((subItem) => (
                          <Collapse
                            key={subItem.title}
                            isOpened={subMenuIndex === item.title}>
                            <Link
                              to={subItem.url}
                              className="flex items-center gap-2 py-2 hover:text-blue-500">
                              <span className="text-[14px]">
                                {subItem.title}
                              </span>
                            </Link>
                          </Collapse>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SidebarMenuButton asChild className="hover:bg-chart-1">
                      <Link to={item.url}>
                        <span>
                          <item.icon size={22} />
                        </span>
                        <span className="text-[16px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
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
