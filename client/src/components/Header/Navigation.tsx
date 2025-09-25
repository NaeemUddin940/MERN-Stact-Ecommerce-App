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
  return (
    <div className="lg:flex bg-muted hidden items-center justify-center shadow shadow-gray-300 py-1">
      <div className="container-sm md:container-md">
        <div className="flex items-center">
          {/* Shop By Category */}

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
