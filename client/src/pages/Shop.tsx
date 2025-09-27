import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import capitalize from "../utils/capitalize";
import { Button } from "@/components/ui/button";
import { Separator } from "../components/ui/separator";
import FilterCheckbox from "@/components/Shop/FilterCheckbox";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "../components/ProductCard/ProductCard";
import { Grid3X3, List } from "lucide-react";
import { FaStar } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ProductCardListView from "@/components/ProductCard/ProductCardListView";

const availability = [
  {
    maintitle: "Availability",
    filter: [
      { title: "In Stock", quantity: 10 },
      { title: "Out of Stock", quantity: 5 },
      { title: "Latest", quantity: 5 },
      { title: "Popular", quantity: 5 },
      { title: "Featured", quantity: 5 },
      { title: "New Arrival", quantity: 5 },
      { title: "Discounted", quantity: 5 },
    ],
  },
];

const size = [
  {
    mainTitle: "Size",
    filter: [
      { title: "Small", quantity: 20 },
      { title: "Medium", quantity: 10 },
      { title: "Large", quantity: 30 },
      { title: "XL", quantity: 5 },
      { title: "XXL", quantity: 7 },
    ],
  },
];

const colors = [
  {
    mainTitle: "Colors",
    filter: [
      { title: "Gray", color: "bg-gray-400", quantity: 7 },
      { title: "Red", color: "bg-red-400", quantity: 20 },
      { title: "Green", color: "bg-green-400", quantity: 10 },
      { title: "Black", color: "bg-black", quantity: 90 },
      { title: "Yellow", color: "bg-yellow-400", quantity: 90 },
      { title: "Blue", color: "bg-blue-400", quantity: 30 },
      { title: "Orange", color: "bg-orange-400", quantity: 5 },
      { title: "Violet", color: "bg-violet-400", quantity: 7 },
    ],
  },
];

export default function Shop() {
  const [itemView, setItemView] = useState("grid");
  // const { products } = useProductContext();
  const products = [
    {
      id: 740683,
      name: "Nike Air Max Invigor 'Black' 740683",
      sku: "BWRD-WATCH-CAPITAL",
      brand: "Brand: Watch Capital",
      rating: 4.5,
      reviewCount: 17,
      price: 120.0,
      salePrice: 79.99,
      oldPrice: "$120",
      newPrice: "$95",
      shortDescription:
        "Elevate your look with the modern, minimalist timepiece. Durable construction and quartz movement ensure timeless style and reliability.",
      stock: 150,
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "White/Rose Gold", hex: "#f8fafc" },
        { name: "Black/Silver", hex: "#1f2937" },
        { name: "Olive Green", hex: "#4b5563" },
      ],
      images: [
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/123-home_default/hummingbird-notebook.jpg",
        "https://placehold.co/500x500/e0e0e0/333?text=Watch+2",
        "https://placehold.co/500x500/d0d0d0/333?text=Watch+3",
        "https://placehold.co/500x500/c0c0c0/333?text=Watch+4",
      ],
      descriptionContent: [
        {
          title: "The Best Match",
          text: "The best tool to compliment your look with a watch that never goes out of style. This aesthetic, sophisticated piece will look great on your desk, or during a special night out. Paired nicely with denim or dress pants for a more elegant look.",
        },
        {
          title: "Lightweight Design",
          text: "Designed with a super light aerospace-grade metal frame, this watch is surprisingly light, giving you comfort while maintaining a sense of luxury all day long. Built to absorb hard shocks, it offers a solid and secure accessory for everyday use. Its thin profile is also suitable for smaller wrists.",
        },
      ],
      productDetailsContent: [
        {
          title: "Free Shipping & Returns",
          text: "We offer free shipping for all products on orders above $50 and include free delivery for all orders in US/Canada. Orders usually ship within 24 hours.",
        },
        {
          title: "Worry-Free Guarantee",
          text: "We guarantee our products and service, offering a full refund or exchange within 30 days of purchase.",
        },
        {
          title: "Online Support",
          text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
        },
      ],
      reviewsContent: [
        {
          title: "asefasdfsadfasdf",
          text: "We offer free shippifasdfaasdfsdfngasd for all pfasdfroducts on ordasdfasdfasdove $50 and include free delivery forasdasdff all orders in US/Canada. Orders usually ship within 24 hours.",
        },
        {
          title: "Worry-Free dfgsdfgsdfg",
          text: "We guarantee our productss aasf",
        },
        {
          title: "Online Support",
          text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
        },
      ],
    },
  ];
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // const brandNames = [...new Set(products.map((p) => p.brand))];

  const brandWithCount = products.reduce((acc, curr) => {
    const found = acc.find((item) => item.brand === curr.brand);

    if (found) {
      found.quantiy += 1;
    } else {
      acc.push({ title: curr.brand, quantity: 1 });
    }
    return acc;
  }, []);

  function ratingFilter(i: number) {
    console.log(i);
  }

  return (
    <div>
      {/* Breadcrumb Design */}
      <div className="py-3 px-10 flex items-center justify-center">
        <div className="container-sm md:container-md flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              {/* Home link */}
              <BreadcrumbItem>
                <BreadcrumbLink className="font-bold" asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {pathnames.map((name, index) => {
                const path = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                return (
                  <div key={path} className="flex items-center gap-3">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="font-bold">
                          {capitalize(name)}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink className="text-lg font-bold" asChild>
                          <Link to={path}>{capitalize(name)}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-4 items-center text-foreground">
            <h1 className="text-lg flex font-semi text-dark-gray-2">
              There are 15 Products By Using Your Filter
              <span className="text-primary-500">phantom</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Sort Dropdown */}
              <Select>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Newest To Oldest" />
                </SelectTrigger>

                <SelectContent className="data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out delay-200">
                  <SelectGroup>
                    <SelectLabel>Short By This</SelectLabel>
                    <SelectItem defaultChecked value="newToOld">
                      <span className="flex items-center gap-2">
                        Newest To Oldest
                      </span>
                    </SelectItem>
                    <SelectItem defaultChecked value="OldToNew">
                      <span className="flex items-center gap-2">
                        Oldest To Newest
                      </span>
                    </SelectItem>
                    <SelectItem value="aToZ">
                      <span className="flex items-center gap-2">
                        Name, A To Z
                      </span>
                    </SelectItem>

                    <SelectItem value="zToA">
                      <span className="flex items-center gap-2">
                        Name, Z To A
                      </span>
                    </SelectItem>

                    <SelectItem value="highToLow">
                      <span className="flex items-center gap-2">
                        Price, High To Low
                      </span>
                    </SelectItem>

                    <SelectItem value="lowToHigh">
                      <span className="flex items-center gap-2">
                        Price, Low To High
                      </span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex rounded-md overflow-hidden border border-light-gray-2">
                <Button
                  variant="default"
                  className={`cursor-pointer ${
                    itemView === "grid" ? "bg-chart-1" : "bg-accent"
                  }`}
                  onClick={() => setItemView("grid")}>
                  <Grid3X3 size={20} />
                </Button>

                <Button
                  variant="default"
                  className={`cursor-pointer  ${
                    itemView === "list" ? "bg-chart-1" : "bg-accent"
                  }`}
                  onClick={() => setItemView("list")}>
                  <List size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="container-sm  md:container-md grid grid-cols-1 lg:grid-cols-14 grid-rows-6 gap-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3  lg:row-span-6 py-3 bg-sidebar border-1 rounded-sm hidden lg:block">
            <div className="flex items-center justify-between px-3 pb-3">
              <h4 className="text-xl font-semibold DmSans">Filter Products</h4>
              <Button variant="secondary">Clear Filter</Button>
            </div>
            <Separator />

            <div className="px-3 py-3">
              <h5 className="text-xl font-semibold mb-2">Filter By Price</h5>
              <div className="flex gap-3 ">
                <input
                  type="text"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-light-gray-2 rounded-md text-sm text-dark-gray-2 placeholder-mid-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-light-gray-2 rounded-md text-sm text-dark-gray-2 placeholder-mid-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <Separator />
            <div>
              {availability.map((avi) => (
                <FilterCheckbox mainTitle={avi.maintitle} filter={avi.filter} />
              ))}
              <Separator />
              <div className="px-5 py-3">
                <p className="text-lg font-semibold">Filter By Rating</p>
                <div className="flex gap-3 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} onClick={() => ratingFilter(i)}>
                      <FaStar
                        size={25}
                        className="cursor-pointer text-yellow-400"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              {size.map((size) => (
                <FilterCheckbox
                  mainTitle={size.mainTitle}
                  filter={size.filter}
                />
              ))}
              <Separator />
              {colors.map((color) => (
                <FilterCheckbox
                  mainTitle={color.mainTitle}
                  filter={color.filter}
                />
              ))}
              <Separator />
              <FilterCheckbox mainTitle={"Brands"} filter={brandWithCount} />
            </div>
          </div>
          {/* Filtered Products */}
          <div className="lg:col-span-11 lg:row-span-6 lg:col-start-4">
            {itemView === "grid" ? (
              <div
                className={`grid md:grid md:grid-cols-3 lg:grid-cols-5 gap-4`}>
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            ) : (
              <div>
                {products.map((p) => (
                  <ProductCardListView product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
