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
import { ChevronDown, Grid3X3, List, Star } from "lucide-react";
import { FaStar } from "react-icons/fa";

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
  const { products } = useProductContext();
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
        <div className="container-sm md:container-md">
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
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-dark-gray-2">
            dfgsdfg
            <span className="text-primary-500">dji phantom</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                // value={sortBy}
                // onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-auto bg-white border border-light-gray-2 rounded-md px-3 sm:px-4 py-2 pr-8 text-sm text-dark-gray-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="featured">Sort by Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-mid-gray-4 pointer-events-none"
              />
            </div>

            {/* View Toggle */}
            <div className="flex rounded-md overflow-hidden border border-light-gray-2">
              <button
              // onClick={() => setViewMode("grid")}
              // className={`p-2 transition-colors ${
              //   viewMode === "grid"
              //     ? "bg-light-gray-3 text-dark-gray-2"
              //     : "bg-light-gray-5 text-mid-gray-5 hover:bg-light-gray-3"
              // }`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
              // onClick={() => setViewMode("list")}
              // className={`p-2 transition-colors ${
              //   viewMode === "list"
              //     ? "bg-light-gray-3 text-dark-gray-2"
              //     : "bg-light-gray-5 text-mid-gray-5 hover:bg-light-gray-3"
              // }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="container-sm md:container-md grid grid-cols-1 lg:grid-cols-14 grid-rows-6 gap-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3 lg:row-span-6 py-3 bg-sidebar border-1 rounded-sm hidden lg:block">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
