import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Search() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="w-full bg-secondary/30 border-1 px-3 py-2 border-chart-4 rounded-full flex items-center h-full animate-bounce-fade-in delay-100">
        <input
          type="text"
          className="w-full ml-2 h-full focus:outline-none "
          placeholder="Search for Products..."
        />
        <SearchIcon className="animate-bounce-fade-in delay-200" />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="bg-chart-4 rounded-full animate-bounce-fade-in delay-300">
            Search
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>
    </div>
  );
}
