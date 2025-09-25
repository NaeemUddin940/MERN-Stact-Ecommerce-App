// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./CategorySlider.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const categories = [
  {
    name: "Smart Tablet",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg",
  },
  {
    name: "Smart Tablet",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg",
  },
  {
    name: "Creap T-shirt",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg",
  },
  {
    name: "Smart Watch",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/13-cz_categoryimagelist.jpg",
  },
  {
    name: "Headphones",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/14-cz_categoryimagelist.jpg",
  },
  {
    name: "Smartphone",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/15-cz_categoryimagelist.jpg",
  },
  {
    name: "Camera",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/16-cz_categoryimagelist.jpg",
  },
  {
    name: "Laptop",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/17-cz_categoryimagelist.jpg",
  },
  {
    name: "Accessories",
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/18-cz_categoryimagelist.jpg",
  },
];

export default function CategorySection() {
  return (
    <Swiper
      slidesPerView={3} // default mobile
      spaceBetween={10}
      loop={true}
      className="mySwiperr"
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      speed={800}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        540: { slidesPerView: 3, spaceBetween: 20 },
        668: { slidesPerView: 4, spaceBetween: 30 },
        880: { slidesPerView: 5, spaceBetween: 30 },
        1200: { slidesPerView: 6, spaceBetween: 30 },
        1280: { slidesPerView: 8, spaceBetween: 30 },
      }}>
      {categories.map((category, index) => (
        <SwiperSlide key={index} className="relative group">
          <img
            className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={category.img}
            alt={category.name}
          />
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white bg-black/30 px-2 rounded text-lg font-semibold whitespace-nowrap">
            {category.name}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
