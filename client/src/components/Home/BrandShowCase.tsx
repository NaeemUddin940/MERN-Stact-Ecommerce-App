import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export const brands = [
  {
    brand: "Nike",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.nike.com",
  },
  {
    brand: "Apple",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.apple.com",
  },
  {
    brand: "Adidas",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.adidas.com",
  },
  {
    brand: "Samsung",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.samsung.com",
  },
  {
    brand: "Sony",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.sony.com",
  },
  {
    brand: "Puma",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.puma.com",
  },
  {
    brand: "Gucci",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.gucci.com",
  },
  {
    brand: "FreshFarm",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.freshfarm.com",
  },
  {
    brand: "Maybelline",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.maybelline.com",
  },
  {
    brand: "Reebok",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.reebok.com",
  },
  {
    brand: "Tanishq",
    image:
      "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",

    url: "https://www.tanishq.co.in",
  },
];

export default function BrandShowCase() {
  return (
    <div className="page-4 mb-5 overflow-hidden">
      <Swiper
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        breakpoints={{
          600: { slidesPerView: 4, spaceBetween: 20 },
          700: { slidesPerView: 5, spaceBetween: 20 },
          930: { slidesPerView: 6, spaceBetween: 20 },
          1150: { slidesPerView: 7, spaceBetween: 20 },
          1300: { slidesPerView: 9, spaceBetween: 20 },
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiperr">
        {brands.map((brand, i) => (
          <SwiperSlide key={i}>
            <Link
              to={brand.url}
              className="h-32 w-32 bg-chart-1 flex items-center justify-center border p-2">
              <img
                src={brand.image}
                alt={brand.brand}
                className="h-full w-full object-contain"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
