import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export default function Shop() {
  return (
    <div>
      {/* Breadcrumb Design */}
      <div className="py-3 flex items-center justify-center">
        <div className="container-sm md:container-md">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg font-bold" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-lg font-bold"
                  href="/components">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-bold">
                  Breadcrumb
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="container-sm md:container-md grid grid-cols-1 lg:grid-cols-12 grid-rows-6 gap-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3 lg:row-span-6 bg-green-100 hidden lg:block">
            1
          </div>
          {/* Filtered Products */}
          <div className="lg:col-span-9 lg:row-span-6 lg:col-start-4 bg-red-100">
            2
          </div>
        </div>
      </div>
    </div>
  );
}
