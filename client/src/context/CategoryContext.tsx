import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface DeepSubItemType {
  title: string;
  link: string;
}

interface SubItemType {
  title: string;
  link?: string;
  deepSubItem?: DeepSubItemType[];
}

export interface CategoryItemType {
  title: string;
  link?: string;
  subItem?: SubItemType[];
}

interface CategoryContextType {
  categories: CategoryItemType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItemType[]>>;
}

const CategoryItem: CategoryItemType[] = [
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

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] =
    useState<CategoryItemType[]>(CategoryItem);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
