import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="flex min-h-sm w-full animate-pulse">
      <div className="border-1 border-gray-300 rounded w-full overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative bg-gray-200 h-56 w-full" />

        {/* Bottom Details */}
        <div className="p-4 space-y-4">
          {/* Brand */}
          <div className="h-3 w-20 bg-gray-300 rounded" />

          {/* Name */}
          <div className="h-4 w-40 bg-gray-300 rounded" />

          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-300 rounded" />
            ))}
          </div>

          {/* Prices */}
          <div className="flex gap-2 items-center">
            <div className="h-3 w-10 bg-gray-300 rounded" />
            <div className="h-4 w-14 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
