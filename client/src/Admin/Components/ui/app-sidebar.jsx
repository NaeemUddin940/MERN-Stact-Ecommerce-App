import * as React from "react";
import { Collapse } from "react-collapse";
import {
  ChevronDown,
  Image,
  LayoutDashboard,
  LogOutIcon,
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddProduct from "../Products/AddProducts";
import { useAuthContext } from "@/context/AuthContext";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home Slider",
    url: "/admin/home-slides",
    icon: Image,
    subItems: [
      { title: "Home Sliders List", url: "/admin/home-slider-lists" },
      { title: "Add Home Sliders", url: "/admin/add-home-sliders" },
    ],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: ShoppingBasket,
    subItems: [
      { title: "Product List", url: "/admin/products/product-list" },
      { title: "Add Product", url: "/admin/products/add-product" },
    ],
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: BiCategory,
    subItems: [
      { title: "Category Lists", url: "/admin/category/all-category-lists" },
      { title: "Add Category", url: "/admin/category/add-category" },
      { title: "Add Sub Category", url: "/admin/category/add-sub-category" },
      {
        title: "Add Child Category",
        url: "/admin/category/add-child-category",
      },
    ],
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: IoBagCheckOutline,
  },
];

export function AppSidebar({ ...props }) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [subMenuIndex, setSubMenuIndex] = React.useState(null);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ✅ Header Section */}
      <SidebarHeader>
        <SidebarMenu>
          <Link to="/" className="flex items-center gap-5 cursor-pointer">
            <SidebarMenuButton
              tooltip="Visit Website"
              className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 active:bg-primary/90 min-w-8 h-10 duration-200 ease-linear flex items-center">
              <img src={logo} className="w-5" alt="PollenPop" /> Visit Website
            </SidebarMenuButton>
          </Link>
        </SidebarMenu>
      </SidebarHeader>

      {/* ✅ Sidebar Menu Section */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => (
                <SidebarMenuItem key={i} className="hover:shadow-lg">
                  {item.subItems ? (
                    <div>
                      {/* Main Menu Button */}
                      <SidebarMenuButton
                        className="cursor-pointer flex hover:bg-chart-4 items-center justify-between"
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

                      {/* Submenu Section */}
                      <div className="ml-7 border-l pl-3">
                        {item.subItems.map((subItem) => (
                          <Collapse
                            key={subItem.title}
                            isOpened={subMenuIndex === item.title}>
                            {subItem.title === "Add Product" ? (
                              <Sheet>
                                <SheetTitle className="sr-only">
                                  Add Products Form
                                </SheetTitle>
                                <SheetTrigger className="cursor-pointer mb-2 hover:text-blue-500">
                                  Add Product
                                </SheetTrigger>
                                <SheetContent
                                  side="bottom"
                                  className="fixed top-0">
                                  <AddProduct />
                                </SheetContent>
                              </Sheet>
                            ) : (
                              <Link
                                to={subItem.url}
                                className="flex items-center gap-2 py-2 hover:text-blue-500">
                                <span className="text-[14px]">
                                  {subItem.title}
                                </span>
                              </Link>
                            )}
                          </Collapse>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SidebarMenuButton asChild className="hover:bg-chart-1">
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          `text-sm px-2 py-1 rounded-md transition-colors ${
                            isActive
                              ? "text-violet-600 font-semibold"
                              : "hover:text-blue-500"
                          }`
                        }>
                        <span>
                          <item.icon size={22} />
                        </span>
                        <span className="text-[16px]">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}

              {/* ✅ Logout Button (fixed) */}
              <SidebarMenuButton
                onClick={() => logout(navigate)}
                className="flex items-center gap-4 px-2 hover:bg-chart-4">
                <LogOutIcon />
                Log Out
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
