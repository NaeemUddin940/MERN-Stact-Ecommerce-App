import ProductCard from "../../ProductCard/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductType {
  id: string;
  image: string;
  discount: string;
  isNew: boolean;
  brand: string;
  name: string;
  rating: number;
  oldPrice: string;
  newPrice: string;
  colors: string[];
  category: string;
  isLatest?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  countdown?: string;
}
interface SliderProductsShowProps {
  title: string;
  filter: "featured" | "latest" | "countdown" | "all";
  products: ProductType[];
}

export const SliderProductsShow: React.FC<SliderProductsShowProps> = ({
  title,
  filter,
  products,
}) => {
  let filteredProducts: ProductType[] = [];
  if (filter === "featured") {
    filteredProducts = products.filter((product) => product.isFeatured);
  } else if (filter === "latest") {
    filteredProducts = products.filter((product) => product.isLatest);
  } else if (filter === "countdown") {
    filteredProducts = products.filter((product) => product.countdown);
  } else {
    filteredProducts = products;
  }
  return (
    <div className="page-4 mb-5 relative overflow-hidden">
      {/* Header with title + navigation */}
      <div className="flex bg-background justify-between border-slate-500 shadow-shadow shadow-lg/25 items-center  border rounded-sm mb-4 py-2 px-2">
        <h4 className="text-3xl font-bold">{title}</h4>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <div
            className={`${filter}-prev bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer`}>
            <ChevronLeft />
          </div>
          <div
            className={`${filter}-next bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer`}>
            <ChevronRight />
          </div>
        </div>
      </div>

      {/* Slider */}
      {filteredProducts.length >= 0 ? (
        <Swiper
          slidesPerView={2}
          loop={true}
          spaceBetween={30}
          navigation={{
            nextEl: `.${filter}-next`,
            prevEl: `.${filter}-prev`,
          }}
          breakpoints={{
            700: { slidesPerView: 3, spaceBetween: 30 },
            930: { slidesPerView: 4, spaceBetween: 30 },
            1150: { slidesPerView: 5, spaceBetween: 10 },
            1300: { slidesPerView: 6, spaceBetween: 20 },
          }}
          modules={[Navigation]}
          className="mySwiper">
          {filteredProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <ProductCard filter={filter} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ""
      )}
    </div>
  );
};
