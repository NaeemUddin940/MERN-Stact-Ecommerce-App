import { SquareMinus, SquarePlus, XIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { RiMenuFold2Fill } from "react-icons/ri";

interface SidebarItemType {
  title: string;
  link?: string;
  subItem?: {
    title: string;
    link?: string;
    deepSubItem?: { title: string; link: string }[];
  }[];
}

interface SidebarProps {
  navItem: SidebarItemType[];
}
const SidebarItem: SidebarItemType[] = [
  { title: "Home", link: "/" },
  {
    title: "Fashion",
    link: "#",
    subItem: [
      {
        title: "Apparel",
        link: "/fashion/apparel",
        deepSubItem: [
          { title: "Smart Tablet", link: "/fashion/apparel/smart-tablet" },
          { title: "Creap T-shirt", link: "/fashion/apparel/creap-t-shirt" },
          { title: "Leather Watch", link: "/fashion/apparel/leather-watch" },
          {
            title: "Rolling Diamond",
            link: "/fashion/apparel/rolling-diamond",
          },
        ],
      },
      {
        title: "Outwear",
        link: "/fashion/outwear",
        deepSubItem: [
          { title: "Wooden Chair", link: "/fashion/outwear/wooden-chair" },
          { title: "Sneakers Shoes", link: "/fashion/outwear/sneakers-shoes" },
          { title: "Purse", link: "/fashion/outwear/purse" },
          {
            title: "Xbox Controller",
            link: "/fashion/outwear/xbox-controller",
          },
        ],
      },
      {
        title: "Footwear",
        link: "/fashion/footwear",
        deepSubItem: [
          { title: "Leather Shoes", link: "/fashion/footwear/leather-shoes" },
          { title: "Cabinet Table", link: "/fashion/footwear/cabinet-table" },
          { title: "Headphones", link: "/fashion/footwear/headphones" },
          { title: "Sunglasses", link: "/fashion/footwear/sunglasses" },
        ],
      },
    ],
  },
  {
    title: "Electronics",
    link: "/electronics",
    subItem: [
      { title: "Leather Shoes", link: "/fashion/leather-shoes" },
      { title: "Cabinet Table", link: "/fashion/cabinet-table" },
      { title: "Headphones", link: "/fashion/headphones" },
      { title: "Sunglasses", link: "/fashion/sunglasses" },
    ],
  },
  { title: "Bags", link: "/bags" },
  { title: "Footwear", link: "/footwear" },
  { title: "Groceries", link: "/groceries" },
  { title: "Beauty", link: "/beauty" },
  { title: "Wellness", link: "/wellness" },
  { title: "Jewellery", link: "/jewellery" },
  { title: "Bags", link: "/bags" },
  { title: "Footwear", link: "/footwear" },
  { title: "Groceries", link: "/groceries" },
  { title: "Beauty", link: "/beauty" },
  { title: "Wellness", link: "/wellness" },
  { title: "Jewellery", link: "/jewellery" },
  { title: "Bags", link: "/bags" },
  { title: "Footwear", link: "/footwear" },
  { title: "Groceries", link: "/groceries" },
  { title: "Beauty", link: "/beauty" },
  { title: "Wellness", link: "/wellness" },
  { title: "Jewellery", link: "/jewellery" },
];

export const Sidebar: React.FC<SidebarProps> = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(
    null
  );

  const toggleMenu = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
    setActiveSubCategory(null);
  };

  const toggleSubMenu = (index: number) => {
    setActiveSubCategory(activeSubCategory === index ? null : index);
  };

  return (
    <div>
      <div className="col-1 w-[20%]">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant={"default"} className="flex items-center gap-3">
              <RiMenuFold2Fill size={35} />
              <span className="text-lg font-bold hidden lg:flex">
                Shop By Categories
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[200px]">
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <div>
                  <DrawerTitle>Shop By Category</DrawerTitle>
                  <DrawerDescription>
                    You Can Find Your Shop Category
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="hover:text-red-500 cursor-pointer rounded-xl">
                    <XIcon />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <Separator />
            <section className="fixed top-20 left-0 w-full h-screen overflow-y-auto shadow-md">
              {SidebarItem.map((category, i) => (
                <div key={i} className="px-5">
                  {/* Category */}
                  <Collapsible open={activeCategory === i}>
                    <div className="flex items-center py-1 px-2 justify-between main-category">
                      <Link to="#" className="text-lg font-medium text-primary">
                        {category.title}
                      </Link>
                      {category.subItem && (
                        <CollapsibleTrigger asChild>
                          {activeCategory === i ? (
                            <SquareMinus
                              onClick={() => toggleMenu(i)}
                              className="cursor-pointer"
                            />
                          ) : (
                            <SquarePlus
                              onClick={() => toggleMenu(i)}
                              className="cursor-pointer"
                            />
                          )}
                        </CollapsibleTrigger>
                      )}
                    </div>

                    {/* SubItem */}
                    {category.subItem &&
                      category.subItem.map((subItem, j) => (
                        <CollapsibleContent
                          key={j}
                          className="mt-2 data-[state=open]:animate-slide-in-top data-[state=closed]:animate-slide-out-top delay-200">
                          <Collapsible open={activeSubCategory === j}>
                            <div className="flex items-center justify-between  sub-category-1">
                              <Link to="#" className="font-medium text-primary">
                                {subItem.title}
                              </Link>
                              {subItem.deepSubItem && (
                                <CollapsibleTrigger asChild>
                                  {activeSubCategory === j ? (
                                    <SquareMinus
                                      onClick={() => toggleSubMenu(j)}
                                      className="cursor-pointer"
                                    />
                                  ) : (
                                    <SquarePlus
                                      onClick={() => toggleSubMenu(j)}
                                      className="cursor-pointer"
                                    />
                                  )}
                                </CollapsibleTrigger>
                              )}
                            </div>

                            {/* Deep SubItem */}
                            {subItem.deepSubItem &&
                              subItem.deepSubItem.map((deepItem, k) => (
                                <CollapsibleContent
                                  key={k}
                                  className="mt-1 sub-category-2">
                                  <ul className="space-y-1 ">
                                    <li className="">
                                      <Link
                                        to="#"
                                        className="text-sm text-primary">
                                        {deepItem.title}
                                      </Link>
                                    </li>
                                  </ul>
                                </CollapsibleContent>
                              ))}
                          </Collapsible>
                        </CollapsibleContent>
                      ))}
                  </Collapsible>
                </div>
              ))}
            </section>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
