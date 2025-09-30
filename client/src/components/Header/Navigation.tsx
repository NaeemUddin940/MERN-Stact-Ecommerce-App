import { useEffect, useState } from "react";
import { PiRocketLaunchFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "../ui/separator";
import { usenavItemContext } from "@/context/NavItemContext";

export default function Navigation() {
  const { navItem } = usenavItemContext();
  const [showNav, setShowNav] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Scroll down → hide nav
      if (currentScroll > lastScrollY && currentScroll > 100) {
        setShowNav(false);
        setFixedNav(true); // make navbar fixed after scrolling down
      } else {
        // Scroll up → show nav
        setShowNav(true);
      }

      // Scroll to very top → nav becomes relative again
      if (currentScroll <= 0) {
        setFixedNav(false);
      }

      lastScrollY = currentScroll;

      // Scroll stop timer
      if (scrollTimer) clearTimeout(scrollTimer);

      const timer = setTimeout(() => {
        setShowNav(true);
      }, 2000);

      setScrollTimer(timer);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [scrollTimer]);

  return (
    <div
      className={`lg:flex bg-background border-t-2 border-b-2 hidden items-center justify-center shadow shadow-gray-300 py-1 transition-transform duration-500
        ${fixedNav ? "fixed top-0 w-full z-50" : "relative"}
        ${showNav ? "translate-y-0" : "-translate-y-full"}
      `}>
      <div className="container-sm md:container-md">
        <div className="flex items-center">
          <Sidebar navItem={navItem} />
          <Separator orientation="vertical" className="mr-5" />

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              {navItem.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  {nav.subItem ? (
                    <>
                      <NavigationMenuTrigger>{nav.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[200px]">
                          {nav.subItem.map((sub, j) => (
                            <li key={j} className="space-y-2">
                              <Link
                                to={sub.link}
                                className="font-semibold text-sm hover:underline">
                                {sub.title}
                              </Link>
                              {sub.deepSubItem && (
                                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                                  {sub.deepSubItem.map((deep, k) => (
                                    <li key={k}>
                                      <Link
                                        to={deep.link}
                                        className="hover:text-foreground">
                                        {deep.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link to={nav.link}>{nav.title}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Separator orientation="vertical" className="ml-10" />

          <div className="col-3 w-[25%] lg:hidden xl:flex flex items-center justify-end gap-3">
            <PiRocketLaunchFill />
            Free International Delivery
          </div>
        </div>
      </div>
    </div>
  );
}
