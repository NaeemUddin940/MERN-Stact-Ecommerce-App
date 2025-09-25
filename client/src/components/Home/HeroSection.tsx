import HomeSlider from "./Slider/HomeSlider";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="grid grid-cols-1 container-sm md:container-md lg:grid-cols-9 xl:grid-cols-8 lg:grid-rows-4 md:grid-cols-6 md:grid-rows-2 gap-4">
        {/* Main / Big Slider */}
        <div className="lg:col-span-6 lg:row-span-4 md:col-span-6 md:row-span-2">
          <HomeSlider />
        </div>

        <div className="lg:col-span-3 group lg:row-span-2 lg:col-start-7 md:col-span-3 md:row-span-2 md:row-start-5">
          <div className="h-60 md:h-full w-full relative overflow-hidden rounded-sm">
            <img
              className="group-hover:scale-105 h-full w-full object-cover transition-all duration-800 delay-150"
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
              alt=""
            />{" "}
            <div className="absolute h-full w-1/2 lg:w-2/3 p-4 space-y-3 flex flex-col items-start justify-center text-black font-medium top-0 left-0">
              <h3 className="text-lg font-bold">Samsung Gear VR Camera</h3>
              <p className="text-lg text-chart-4 font-bold">$129.00</p>
              <button className="text-lg text-black cursor-pointer hover:underline hover:text-chart-4">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 group lg:row-span-2 object-cover lg:col-start-7 lg:row-start-3 flex flex-col items-start justify-center text-black font-medium md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-5">
          {" "}
          <div className="h-60 md:h-full relative w-full overflow-hidden rounded-sm">
            <img
              className="group-hover:scale-105 h-full w-full object-cover transition-all duration-800 delay-150"
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
              alt=""
            />
            <div className="absolute h-full w-1/2 lg:w-2/3 p-4 space-y-3 flex flex-col items-end justify-center text-black font-medium top-0 right-0">
              <h3 className="text-lg text-end font-bold">
                Marcel Dining Room Chair
              </h3>
              <p className="text-lg text-chart-4 font-bold">$119.00</p>
              <button className="text-lg text-black cursor-pointer hover:underline hover:text-chart-4">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
