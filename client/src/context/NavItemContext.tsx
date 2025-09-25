import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface NavItemType {
  title: string;
  link: string;
  subItem?: {
    title: string;
    link: string;
    deepSubItem?: {
      title: string;
      link: string;
    }[];
  }[];
}

const NavItem: NavItemType[] = [
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
];

// Define context type
interface NavItemContextType {
  navItem: NavItemType[];
  setNavItem: React.Dispatch<React.SetStateAction<NavItemType[]>>;
}

// Create context
const navItemContext = createContext<NavItemContextType | undefined>(undefined);

// Provider props
interface NavItemProviderProps {
  children: ReactNode;
}

// ProductProvider component
export const NavItemProvider: React.FC<NavItemProviderProps> = ({
  children,
}) => {
  const [navItem, setNavItem] = useState<NavItemType[]>(NavItem);

  return (
    <navItemContext.Provider value={{ navItem, setNavItem }}>
      {children}
    </navItemContext.Provider>
  );
};

// Custom hook to use navItemContext
export const usenavItemContext = () => {
  const context = useContext(navItemContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
