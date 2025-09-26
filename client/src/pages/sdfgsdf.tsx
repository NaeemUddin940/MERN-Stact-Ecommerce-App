import React, { useState, useEffect } from "react";
import { Heart, Plus, Grid3X3, List, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isFavorited?: boolean;
  features?: string[];
  videoResolution?: string;
  skillLevel?: string;
  brand?: string;
}

interface FilterState {
  priceMin: string;
  priceMax: string;
  quadcopterFeatures: string[];
  videoResolution: string[];
  skillLevel: string[];
  brand: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "DJI Phantom 2 Vision+",
    price: 599,
    rating: 3.5,
    reviews: 243,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/59645bfcd17c2e4351b30737d808d332347c1cda?width=500",
    features: ["App-Controlled", "Wi-Fi"],
    videoResolution: "FHD 1080p",
    skillLevel: "Intermediate",
    brand: "DJI",
  },
  {
    id: 2,
    name: "DJI Phantom 4 Multispectral",
    price: 1449,
    rating: 5,
    reviews: 98,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/29179eb411320dfd811f8f05a491ec9cb0c0e4ab?width=500",
    features: ["App-Controlled", "Obstacle Avoidance"],
    videoResolution: "4K UHD 2160p",
    skillLevel: "Expert",
    brand: "DJI",
  },
  {
    id: 3,
    name: "DJI Phantom 4 PRO",
    price: 739,
    rating: 2,
    reviews: 1002,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/0e07331447c4adeeacdaf977f42bbb5d97a61e47?width=500",
    features: [
      "App-Controlled",
      "Obstacle Avoidance",
      "Video Downlink Capable",
    ],
    videoResolution: "4K UHD 2160p",
    skillLevel: "Intermediate",
    brand: "DJI",
  },
  {
    id: 4,
    name: "4 Series — Intelligent Flight Battery (5…",
    price: 186,
    rating: 3.5,
    reviews: 243,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ed071bbed3e15b731cece8ae9c8ce1b93ec7731d?width=500",
    features: ["App-Controlled"],
    videoResolution: "HD 720p",
    skillLevel: "Beginner",
    brand: "DJI",
  },
  {
    id: 5,
    name: "DJI Phantom 3 — Intelligent Flight Bat…",
    price: 98,
    rating: 5,
    reviews: 98,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/4ec8d8f4934e020f368a9fb0755bff45132d1110?width=500",
    features: ["Wi-Fi"],
    videoResolution: "FHD 1080p",
    skillLevel: "Beginner",
    brand: "DJI",
  },
  {
    id: 6,
    name: "DJI Phantom 4 PRO",
    price: 739,
    rating: 2,
    reviews: 1002,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/3a5eda790cb8518495ff70d9a6ebcbcd50aa934b?width=500",
    features: [
      "App-Controlled",
      "Obstacle Avoidance",
      "Video Downlink Capable",
    ],
    videoResolution: "4K UHD 2160p",
    skillLevel: "Intermediate",
    brand: "DJI",
  },
];

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L9.77994 6.05749L14 6.58359L10.88 9.61736L11.7082 14L8 11.8175L4.2918 14L5.12 9.61736L2 6.58359L6.22006 6.05749L8 2Z"
      fill={filled ? "#F8C51B" : "#D5DADD"}
    />
  </svg>
);

const Rating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {stars.map((filled, index) => (
          <Star key={index} filled={filled} />
        ))}
      </div>
      <span className="text-xs text-mid-gray-1">
        {reviews.toLocaleString()}
      </span>
    </div>
  );
};

const ProductCard = ({
  product,
  index,
  viewMode,
}: {
  product: Product;
  index: number;
  viewMode: "grid" | "list";
}) => {
  const [isFavorited, setIsFavorited] = useState(product.isFavorited || false);

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-light-gray-3 hover:shadow-lg transition-all duration-300 group flex flex-col sm:flex-row gap-4 p-4">
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full sm:w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-light-gray-5 transition-colors">
              <Heart
                size={20}
                className={
                  isFavorited ? "fill-red-500 text-red-500" : "text-mid-gray-5"
                }
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-light-gray-5 transition-colors">
              <Plus size={20} className="text-mid-gray-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-sm font-normal text-dark-gray-2 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="text-lg font-semibold text-dark-gray-2 mb-2">
            ${product.price.toLocaleString()}
          </div>
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-light-gray-3 hover:shadow-lg transition-all duration-300 group">
      <div className="relative p-6 sm:p-8 pb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-64 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-light-gray-5 transition-colors">
            <Heart
              size={20}
              className={
                isFavorited ? "fill-red-500 text-red-500" : "text-mid-gray-5"
              }
            />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-light-gray-5 transition-colors">
            <Plus size={20} className="text-mid-gray-5" />
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6 pt-4">
        <h3 className="text-sm font-normal text-dark-gray-2 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="text-lg font-semibold text-dark-gray-2 mb-2">
          ${product.price.toLocaleString()}
        </div>
        <Rating rating={product.rating} reviews={product.reviews} />
      </div>
    </div>
  );
};

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-sm font-semibold text-dark-gray-2 mb-3 sm:mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center gap-2 mb-3">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border border-mid-gray-5 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
    />
    <label htmlFor={id} className="text-sm text-dark-gray-2 cursor-pointer">
      {label}
    </label>
  </div>
);

export default function Index() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>({
    priceMin: "",
    priceMax: "",
    quadcopterFeatures: [],
    videoResolution: [],
    skillLevel: [],
    brand: [],
  });

  const quadcopterFeatures = [
    "App-Controlled",
    "Obstacle Avoidance",
    "Video Downlink Capable",
    "Wi-Fi",
  ];

  const videoResolutions = ["4K UHD 2160p", "FHD 1080p", "HD 720p"];

  const skillLevels = ["Beginner", "Intermediate", "Expert"];

  const brands = [
    "DJI",
    "Holy Stone",
    "Potensic",
    "Ruko",
    "aovo",
    "OXOXO",
    "DEERC",
  ];

  const updateFilterArray = (
    filterKey: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: checked
        ? [...(prev[filterKey] as string[]), value]
        : (prev[filterKey] as string[]).filter((item) => item !== value),
    }));
  };

  // Filter and sort products
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products.filter((product) => {
      // Price filter
      const minPrice = filters.priceMin ? parseFloat(filters.priceMin) : 0;
      const maxPrice = filters.priceMax
        ? parseFloat(filters.priceMax)
        : Infinity;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Features filter
      if (filters.quadcopterFeatures.length > 0) {
        const hasFeature = filters.quadcopterFeatures.some((feature) =>
          product.features?.includes(feature)
        );
        if (!hasFeature) return false;
      }

      // Video resolution filter
      if (filters.videoResolution.length > 0) {
        if (
          !product.videoResolution ||
          !filters.videoResolution.includes(product.videoResolution)
        ) {
          return false;
        }
      }

      // Skill level filter
      if (filters.skillLevel.length > 0) {
        if (
          !product.skillLevel ||
          !filters.skillLevel.includes(product.skillLevel)
        ) {
          return false;
        }
      }

      // Brand filter
      if (filters.brand.length > 0) {
        if (!product.brand || !filters.brand.includes(product.brand)) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  useEffect(() => {
    // Add scroll-based animations with staggered delays
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(
              entry.target.getAttribute("data-delay") || "0"
            );
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-up");
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredAndSortedProducts]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-dark-gray-2">
            Found {filteredAndSortedProducts.length} results for{" "}
            <span className="text-primary-500">dji phantom</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-light-gray-3 text-dark-gray-2"
                    : "bg-light-gray-5 text-mid-gray-5 hover:bg-light-gray-3"
                }`}>
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-light-gray-3 text-dark-gray-2"
                    : "bg-light-gray-5 text-mid-gray-5 hover:bg-light-gray-3"
                }`}>
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg border border-light-gray-3 p-4 sm:p-6 lg:sticky lg:top-8">
              {/* Price Range */}
              <FilterSection title="Price, $">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceMin: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-light-gray-2 rounded-md text-sm text-dark-gray-2 placeholder-mid-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceMax: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-light-gray-2 rounded-md text-sm text-dark-gray-2 placeholder-mid-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </FilterSection>

              {/* Quadcopter Features */}
              <FilterSection title="Quadcopter Features">
                {quadcopterFeatures.map((feature) => (
                  <Checkbox
                    key={feature}
                    id={`feature-${feature}`}
                    label={feature}
                    checked={filters.quadcopterFeatures.includes(feature)}
                    onChange={(checked) =>
                      updateFilterArray("quadcopterFeatures", feature, checked)
                    }
                  />
                ))}
              </FilterSection>

              {/* Video Capture Resolution */}
              <FilterSection title="Video Capture Resolution">
                {videoResolutions.map((resolution) => (
                  <Checkbox
                    key={resolution}
                    id={`resolution-${resolution}`}
                    label={resolution}
                    checked={filters.videoResolution.includes(resolution)}
                    onChange={(checked) =>
                      updateFilterArray("videoResolution", resolution, checked)
                    }
                  />
                ))}
              </FilterSection>

              {/* Operator Skill Level */}
              <FilterSection title="Operator Skill Level">
                {skillLevels.map((level) => (
                  <Checkbox
                    key={level}
                    id={`skill-${level}`}
                    label={level}
                    checked={filters.skillLevel.includes(level)}
                    onChange={(checked) =>
                      updateFilterArray("skillLevel", level, checked)
                    }
                  />
                ))}
              </FilterSection>

              {/* Brand */}
              <FilterSection title="Brand">
                {brands.map((brand) => (
                  <Checkbox
                    key={brand}
                    id={`brand-${brand}`}
                    label={brand}
                    checked={filters.brand.includes(brand)}
                    onChange={(checked) =>
                      updateFilterArray("brand", brand, checked)
                    }
                  />
                ))}
              </FilterSection>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-mid-gray-1 text-lg">
                  No products match your filters.
                </p>
                <p className="text-mid-gray-4 text-sm mt-2">
                  Try adjusting your filter criteria.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-px ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {filteredAndSortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-card opacity-0"
                    data-delay={index * 100}>
                    <ProductCard
                      product={product}
                      index={index}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-15 sm:h-15 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-110 z-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.546 16.732L6.728 17.328L6 10.642L18.093 9L18.821 15.686L15.121 16.254L13.11 19.3L10.546 16.732Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
