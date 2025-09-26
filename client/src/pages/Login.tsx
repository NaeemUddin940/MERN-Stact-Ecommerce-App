import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import capitalize from "@/utils/capitalize";

export default function Login() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <div>
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
  );
}
