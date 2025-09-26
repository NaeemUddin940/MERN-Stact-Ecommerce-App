import { Expand, GitCompare, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaRegClock, FaStar } from "react-icons/fa";

type Product = {
  image: string;
  discount: string;
  isNew: boolean;
  brand: string;
  name: string;
  rating: number;
  oldPrice: string;
  newPrice: string;
  colors?: string[];
  countdown?: string;
};

interface ProductCardProps {
  product: Product;
  filter?: string;
}

const icons = [
  { id: "heart", icon: Heart },
  { id: "refresh", icon: GitCompare },
  { id: "expand", icon: Expand },
  { id: "share", icon: Share2 },
];

export default function ProductCard({ product, filter }: ProductCardProps) {
  const handleEnter = (e: React.MouseEvent) => {
    const card = e.currentTarget;

    // Stop any running animations before starting
    gsap.killTweensOf(
      card.querySelectorAll(".animate-left-item, .animate-right-item")
    );

    gsap.to(card.querySelectorAll(".animate-left-item"), {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    gsap.to(card.querySelectorAll(".animate-right-item"), {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.inOut",
    });
  };
  const handleLeave = (e: React.MouseEvent) => {
    const card = e.currentTarget;

    // Stop any running animations before starting leave
    gsap.killTweensOf(
      card.querySelectorAll(".animate-left-item, .animate-right-item")
    );

    gsap.to(card.querySelectorAll(".animate-left-item"), {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    gsap.to(card.querySelectorAll(".animate-right-item"), {
      opacity: 0,
      x: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="flex group min-h-sm w-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}>
      <div className="border-1 relative  border-gray-400 rounded product-card w-full overflow-hidden">
        {/* Image Section */}
        <div className="relative  overflow-hidden rounded">
          <img
            className="w-full h-full hover:scale-115 transition-all duration-700 object-cover"
            src={product.image}
            alt={product.name}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 animate-pulse bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.discount}
          </div>
          {product.isNew && (
            <div className="absolute top-10 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full animate-left-item -translate-x-[20px] opacity-0">
              NEW
            </div>
          )}

          {/* Action Icons */}
          <div className="absolute transition-all duration-300 flex top-2 right-2 flex-col space-y-2">
            {icons.map(({ id, icon: Icon }) => (
              <button
                key={id}
                className="bg-white cursor-pointer text-gray-800 rounded-full p-2 shadow-md hover:bg-chart-1 transition-colors duration-200 animate-right-item opacity-0">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Colors */}
          {product.colors && (
            <div className="absolute bottom-0 flex left-2 gap-2 mb-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-black cursor-pointer animate-left-item opacity-0"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          {product.countdown && filter === "countdown" && (
            <div className="flex absolute bottom-0 left-2/12 group-hover:animate-fade-out animate-fade-in justify-center gap-2 items-center font-bold text-chart-1 text-xl my-2">
              <div className="flex gap-2 items-center bg-gray-100 border-1 border-gray-400 rounded-lg px-3 py-1">
                <FaRegClock className="text-red-500" />
                <span>{product.countdown}</span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Section */}
        <div className="p-4 space-y-5 text-left bg-muted">
          <Link to="/product-details">
            <div className="text-gray-700 my-1 dark:text-gray-400 text-sm">
              {product.brand}
            </div>
            <h3 className="text-sm font-semibold text-card-foreground my-2">
              {product.name}
            </h3>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-400 ${
                    i + 1 <= product.rating ? "" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 line-through">
                {product.oldPrice}
              </span>
              <span className="text-red-500 font-bold text-xl">
                ${product.newPrice}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
