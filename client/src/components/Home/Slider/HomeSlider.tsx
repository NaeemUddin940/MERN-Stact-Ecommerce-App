import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./HomeSlider.css";

// import required modules
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomeSlides = [
  {
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg",
    smallText: "Big Saving Days Sale",
    title: "Buy Modern Chair In",
    colorText: "Black Color",
    price: "$99.00",
  },
  {
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg",
    smallText: "Limited Time Offer",
    title: "Stylish Wooden Table",
    colorText: "Brown Color",
    price: "$149.00",
  },
  {
    img: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg",
    smallText: "Hot Deal",
    title: "Modern Luxury Sofa Set ",
    colorText: "Grey Color",
    price: "$299.00",
  },
];

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      fadeEffect={{ crossFade: true }}
      loop={true}
      effect={"fade"}
      navigation={true}
      pagination={pagination}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      modules={[Pagination, Navigation, Autoplay, EffectFade]}
      className="mySwiper h-[300px] md:h-[400px] lg:h-[500px]">
      {HomeSlides.map((slide) => (
        <SwiperSlide className="relative">
          <img
            className="rounded-sm animate-slide-in-right h-full w-full object-cover"
            src={slide.img}
            alt={slide.title}
          />
          <div className="absolute right-10 md:right-30 lg:right-15 xl:right-20 flex flex-col items-start justify-start xl:space-y-5">
            <motion.h5
              key={`smallText-${activeIndex}`} // key change triggers animation
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[14px] md:text-[22px] my-2 xl:text-2xl font-medium text-black">
              {slide.smallText}
            </motion.h5>

            <motion.h2
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-[14px] md:text-[25px] xl:text-4xl font-bold text-black">
              {slide.title}
            </motion.h2>

            <motion.span
              key={`color-${activeIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-[14px] md:text-[25px] xl:text-4xl font-bold text-black">
              {slide.colorText}
            </motion.span>

            <motion.p
              key={`paragraph-${activeIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-[14px] md:text-[23px] my-2 xl:text-xl font-medium text-black">
              Starting At Only{" "}
              <span className="text-[18px] text-chart-1 font-bold">
                {slide.price}
              </span>
            </motion.p>
            <motion.div
              key={`button-${activeIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}>
              <Link to="/shop">
                <Button variant="modern" className="rounded-sm">
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
