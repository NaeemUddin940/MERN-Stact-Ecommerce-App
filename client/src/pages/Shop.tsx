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
import { XIcon } from "lucide-react";
import { Separator } from "../components/ui/separator";
import FilterCheckbox from "@/components/Shop/FilterCheckbox";

const availability = [
  {
    maintitle: "Availability",
    filter: [
      { title: "In Stock", quantity: 10 },
      { title: "Out of Stock", quantity: 5 },
    ],
  },
];

const size = [
  {
    maiTitle: "Size",
    filter: [
      { title: "Small", quantity: 20 },
      { title: "Medium", quantity: 10 },
      { title: "Large", quantity: 30 },
      { title: "XL", quantity: 5 },
      { title: "XXL", quantity: 7 },
    ],
  },
];

export default function Shop() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <div>
      {/* Breadcrumb Design */}
      <div className="py-3 px-10 flex items-center justify-center">
        <div className="container-sm md:container-md">
          <Breadcrumb>
            <BreadcrumbList>
              {/* Home link */}
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg font-bold" asChild>
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
                        <BreadcrumbPage className="text-lg font-bold">
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
      </div>

      <div className="flex items-center justify-center">
        <div className="container-sm md:container-md grid grid-cols-1 lg:grid-cols-14 grid-rows-6 gap-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3 lg:row-span-6 py-3 bg-sidebar border-1 rounded-sm hidden lg:block">
            <div className="flex items-center justify-between px-3 pb-3">
              <h4 className="text-xl font-semibold">Filter Products</h4>
              <Button variant="secondary">
                Clear Filter
              </Button>
            </div>
            <Separator />
            <div>
              {availability.map((avi) => (
                <FilterCheckbox mainTitle={avi.maintitle} filter={avi.filter} />
              ))}
              {size.map((size) => (
                <FilterCheckbox
                  mainTitle={size.maiTitle}
                  filter={size.filter}
                />
              ))}
            </div>
          </div>
          {/* Filtered Products */}
          <div className="lg:col-span-11 lg:row-span-6 lg:col-start-4 bg-red-100">
            2
          </div>
        </div>
      </div>
    </div>
  );
}
