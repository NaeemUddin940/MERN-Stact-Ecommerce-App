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
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

export default function MainHeader() {
  const { navItem } = usenavItemContext();

  const [isLogin, setIsLogin] = useState(true);
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
                {!isLogin ? (
                  <>
                    <TooltipTrigger asChild>
                      <Link className="hover:text-chart-4" to="/user/login">
                        Login
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Login</TooltipContent>
                    <span className="mx-2">/</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link className="hover:text-chart-4" to="/user/register">
                          Register
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Register</TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex items-center  cursor-pointer bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg justify-center gap-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/550811430_797952962841067_3611979962480220725_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHVebcLht2NKYvewDi6ZBEpo2tFYx_5cLKja0VjH_lwsoX9EGbNek9olPF1gisUKyClVjCetXcgmCwOUCYX-W5n&_nc_ohc=JQN98cSKkLcQ7kNvwHaeuEm&_nc_oc=AdlfMoiuTouNjUZchG8UeGnj_yYoBMgsfzgLqEjvCBzKkHttxGiFUMYvrhGW-oEwmjU&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=wJS_8H29SAOQmZHW3GVwaA&oh=00_AfZ_8vnBL1lpBxDEWHJPJzh9VXqjL7iL3HcoAUzvC9hzJQ&oe=68DD817D"
                          alt=""
                        />
                        <div className="flex text-sm flex-col justify-center items-start">
                          <h5 className="uppercase">MD. NAEEM UDDIN</h5>
                          <p>mdnaeemuddin14@gmail.com</p>
                        </div>
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
                      <DropdownMenuItem onClick={() => setIsLogin(false)}>
                        <IoLogOutOutline />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
