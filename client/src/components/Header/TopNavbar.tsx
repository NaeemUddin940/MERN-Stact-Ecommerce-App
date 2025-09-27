import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function TopNavbar() {
  return (
    <section className="flex items-center px-10 md:px-0 border-y-1 justify-center bg-background overflow-hidden animate-slide-in-top delay-100">
      <div className="flex container-sm md:container-md items-center justify-center lg:justify-between  py-1 border-ring">
        <div className="hidden lg:flex items-center offer">
          <p className="font-medium animate-slide-in-top delay-300">
            Get up to 50% off new season styles, limited time only
          </p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center justify-center w-full">
            <div className="md:flex hidden">
              <Link
                className="font-medium hover:text-chart-4 "
                to="/help-center">
                Help Center
              </Link>
              <Separator
                orientation="vertical"
                className="h-5 mx-2 bg-gray-500"
              />

              <Link
                className="font-medium hover:text-chart-4 "
                to="/order-tracking">
                Order Tracking
              </Link>
              <Separator
                orientation="vertical"
                className="h-5 mx-2 bg-gray-500"
              />
            </div>

            {/* Quick Links For Small Device */}
            <div className="flex md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 font-medium">
                  Quick Links <ChevronDown size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out delay-200">
                  <DropdownMenuItem asChild>
                    <Link to="/help-center">Help Center</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/order-tracking">Order Tracking</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Language */}

            <div>
              <Select>
                <SelectTrigger className=" cursor-pointer">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent className="data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out delay-200">
                  <SelectGroup>
                    <SelectLabel>Choose Langluage</SelectLabel>
                    <SelectItem value="english">
                      <span className="flex items-center gap-2">
                        🇬🇧 English
                      </span>
                    </SelectItem>

                    <SelectItem value="french">
                      <span className="flex items-center gap-2">🇫🇷 French</span>
                    </SelectItem>

                    <SelectItem value="spanish">
                      <span className="flex items-center gap-2">
                        🇪🇸 Spanish
                      </span>
                    </SelectItem>

                    <SelectItem value="german">
                      <span className="flex items-center gap-2">🇩🇪 German</span>
                    </SelectItem>

                    <SelectItem value="hindi">
                      <span className="flex items-center gap-2">🇮🇳 Hindi</span>
                    </SelectItem>

                    <SelectItem value="bengali">
                      <span className="flex items-center gap-2">
                        🇧🇩 Bengali
                      </span>
                    </SelectItem>

                    <SelectItem value="chinese">
                      <span className="flex items-center gap-2">
                        🇨🇳 Chinese
                      </span>
                    </SelectItem>

                    <SelectItem value="japanese">
                      <span className="flex items-center gap-2">
                        🇯🇵 Japanese
                      </span>
                    </SelectItem>

                    <SelectItem value="arabic">
                      <span className="flex items-center gap-2">🇸🇦 Arabic</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Currency */}
            <div>
              <Select>
                <SelectTrigger className=" cursor-pointer">
                  <SelectValue placeholder="BDT" />
                </SelectTrigger>
                <SelectContent className="data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-fade-out delay-200">
                  <SelectGroup>
                    <SelectLabel>Choose Currency</SelectLabel>
                    <SelectItem value="bdt">
                      <span className="flex items-center gap-2">BDT</span>
                    </SelectItem>
                    <SelectItem value="usd">
                      <span className="flex items-center gap-2">USD</span>
                    </SelectItem>

                    <SelectItem value="eur">
                      <span className="flex items-center gap-2">EUR</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
