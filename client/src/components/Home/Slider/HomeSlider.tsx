import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./HomeSlider.css";

// import required modules
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "../../ui/button";

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
    title: "Luxury Sofa Set",
    colorText: "Grey Color",
    price: "$299.00",
  },
];

export default function HomeSlider() {
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
      modules={[Pagination, Navigation, Autoplay, EffectFade]}
      className="mySwiper h-[300px] md:h-[400px] lg:h-[500px]">
      {HomeSlides.map((slide) => (
        <SwiperSlide className="relative">
          <img
            className="rounded-sm h-full w-full object-contain"
            src={slide.img}
            alt={slide.title}
          />
          <div className="absolute right-10 md:right-30 lg:right-15 xl:right-20 flex flex-col items-start justify-start xl:space-y-5">
            <h5 className="text-[14px] md:text-[22px] my-2 xl:text-2xl font-medium text-black">
              {slide.smallText}
            </h5>

            <h2 className="text-[14px] md:text-[25px] xl:text-4xl font-bold text-black">
              {slide.title}
            </h2>
            <span className="text-[14px] md:text-[25px] xl:text-4xl font-bold text-black">
              {slide.colorText}
            </span>

            <p className="text-[14px] md:text-[23px] my-2 xl:text-xl font-medium text-black">
              Starting At Only{" "}
              <span className="text-[18px] text-chart-1 font-bold">
                {slide.price}
              </span>
            </p>
            <Button variant={"modern"} className="rounded-sm">
              Shop Now
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
