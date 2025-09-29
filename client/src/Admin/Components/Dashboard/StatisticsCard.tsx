// components/StatsCard.tsx
import { Separator } from "@/components/ui/separator";

import {
  TrendingUp,
  TrendingDown,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive?: boolean;
};

export function StatsCard({
  title,
  value,
  icon,
  change,
  positive = true,
}: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border-1 border-foreground bg-background p-5 shadow-sm w-full">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`${
              title === "Total Sales" && positive
                ? "text-violet-600"
                : positive
                ? "text-green-500"
                : "text-red-500"
            }`}>
            {icon}
          </span>
          <h2 className="text-muted-foreground text-sm font-medium">{title}</h2>
        </div>
        {/* Placeholder mini graph */}
        <div>
          <ChartNoAxesColumnIncreasing
            className={`h-12 w-16 rounded-md ${
              title === "Total Sales" && positive
                ? "text-violet-600"
                : positive
                ? "text-green-500"
                : "text-red-500"
            }`}
          />
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Separator className="my-2" />
      {/* Change */}
      <div className="flex items-center gap-2 text-sm">
        {positive ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`font-semibold ${
            positive ? "text-green-500" : "text-red-500"
          }`}>
          {change}
        </span>
        <span className="text-muted-foreground">last month</span>
      </div>
    </div>
  );
}
