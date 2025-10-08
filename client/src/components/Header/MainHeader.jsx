import { Link } from "react-router-dom";

import { Heart, ShoppingCart, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Toggle } from "../ui/Toggle";
import { Sidebar } from "../Sidebar/Sidebar";
import { IoBagCheckSharp } from "react-icons/io5";
import Search from "../Search/Search";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usenavItemContext } from "../../context/NavItemContext";
import CartSidebar from "../Cart/CartSidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { getData } from "@/utils/GetData";

export default function MainHeader() {
  const { navItem } = usenavItemContext();
  const { setIsLogin, isLogin, setAuthChanged, user } = useAuthContext();

  useEffect(() => {
    async function checkIsLogin() {
      const res = await getData("/api/user/checkislogin");

      if (res.success) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    checkIsLogin();
  }, []);

  async function logout() {
    try {
      const res = await fetch("http://localhost:8000/api/user/logout", {
        method: "GET",
        credentials: "include", // send cookies automatically
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        setAuthChanged((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to Log Out.");
    }
  }

  return (
    <header>
      <section className="flex bg-background border-b-1 border-ring justify-center items-center">
        <div className="container-sm md:container-md flex items-center gap-5 justify-between">
          <div className="animate-slide-in-left flex items-center">
            <div className="lg:hidden">
              <Sidebar navItem={navItem} />
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Link to="/">
                  <img
                    className="h-10 w-30"
                    src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg"
                    alt=""
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Go to Home</TooltipContent>
            </Tooltip>
          </div>

          <div className="lg:w-[500px] my-2 hidden lg:block">
            <Search />
          </div>

          {/* Login & Register Button */}
          <div className=" flex items-center justify-end gap-5">
            {/* Login / Register For large Device */}
            <div className="md:flex hidden">
              <Tooltip>
                {!isLogin && (
                  <>
                    <TooltipTrigger asChild>
                      <Link className="hover:text-chart-4" to="/user/login">
                        Login
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Login</TooltipContent>
                    <span className="mx-2">|</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          className="hover:text-chart-4"
                          to="/user/register">
                          Register
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Register</TooltipContent>
                    </Tooltip>
                  </>
                )}

                {isLogin && (
                  <div>
                    {localStorage.getItem("role") === "ADMIN" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="flex items-center cursor-pointer rounded-full py-1 justify-center gap-4">
                            <img
                              className="h-10 w-10 rounded-full object-cover border-2"
                              src={user?.avatar}
                              alt=""
                            />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link to="/admin" className="flex gap-2">
                              <FaRegUser />
                              Go to Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={logout}>
                            <IoLogOutOutline />
                            Log Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="flex items-center cursor-pointer rounded-full py-1 justify-center gap-4">
                            <img
                              className="h-10 w-10 rounded-full object-cover border-2"
                              src={user?.avatar}
                              alt=""
                            />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link to="/my-account" className="flex gap-2">
                              <FaRegUser />
                              My Account
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {" "}
                            <IoBagCheckSharp />
                            Orders
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IoMdHeartEmpty />
                            My Lists
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={logout}>
                            <IoLogOutOutline />
                            Log Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                )}
              </Tooltip>
            </div>

            {/* Login Register for Small Device */}

            <div className="md:hidden flex">
              <DropdownMenu>
                <Tooltip>
                  <DropdownMenuTrigger asChild>
                    <TooltipTrigger>
                      <User />
                    </TooltipTrigger>
                  </DropdownMenuTrigger>
                  <TooltipContent side="bottom">
                    Login / Register
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out delay-200">
                  <DropdownMenuItem asChild>
                    <Link to="/user/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/user/register">register</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Compare & Wishlist & Shopping Cart Icon */}

            <Tooltip>
              <TooltipTrigger className="relative group">
                <Heart className="hover:text-chart-1 cursor-pointer" />
                <div className="absolute top-0 -right-3 bg-chart-1 animate-pulse h-5 w-4 flex justify-center items-center rounded-full font-mono">
                  0
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Wishlist</TooltipContent>
            </Tooltip>
            <Drawer direction="right">
              {/* Trigger with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <DrawerTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <ShoppingCart className="hover:text-chart-1" />

                      {/* Cart Badge */}
                      <div className="absolute top-0 -right-3 animate-bounce bg-chart-1 h-5 w-4 flex justify-center items-center rounded-full font-mono text-xs text-white">
                        0
                      </div>
                    </div>
                  </DrawerTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">Cart</TooltipContent>
              </Tooltip>

              {/* Sidebar Content */}
              <DrawerContent className="p-0 w-96">
                <DialogTitle>your cart</DialogTitle>
                <DialogDescription>cart sidebar</DialogDescription>
                <CartSidebar />
              </DrawerContent>
            </Drawer>

            <Toggle />
          </div>
        </div>
      </section>
    </header>
  );
}
