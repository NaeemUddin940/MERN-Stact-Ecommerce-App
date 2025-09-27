import HeroSection from "../components/Home/HeroSection";
import SmallBanner from "../components/Home/Banner/SmallBanner";
import CategorySection from "../components/Home/Slider/CategorySection";
import PopularProducts from "../components/Home/PopularProducts";
import BigBanner from "../components/Home/Banner/BigBanner";
import { SliderProductsShow } from "../components/Home/Slider/SliderProductsShow";
import { useProductContext } from "../context/ProductContext";
import BrandShowCase from "../components/Home/BrandShowCase";
import ClientReview from "../components/Home/ClientReview";
import { Separator } from "../components/ui/separator";

export default function Home() {
  const { products } = useProductContext();
//   const products = {
//   id: 740683,
//   name: "Nike Air Max Invigor 'Black' 740683",
//   sku: "BWRD-WATCH-CAPITAL",
//   brand: "Brand: Watch Capital",
//   rating: 4.5,
//   reviewCount: 17,
//   price: 120.0,
//   salePrice: 79.99,
//   shortDescription:
//     "Elevate your look with the modern, minimalist timepiece. Durable construction and quartz movement ensure timeless style and reliability.",
//   stock: 150,
//   sizes: ["Small", "Medium", "Large"],
//   colors: [
//     { name: "White/Rose Gold", hex: "#f8fafc" },
//     { name: "Black/Silver", hex: "#1f2937" },
//     { name: "Olive Green", hex: "#4b5563" },
//   ],
//   images: [
//     "https://demos.codezeel.com/prestashop/PRS21/PRS210502/123-home_default/hummingbird-notebook.jpg",
//     "https://placehold.co/500x500/e0e0e0/333?text=Watch+2",
//     "https://placehold.co/500x500/d0d0d0/333?text=Watch+3",
//     "https://placehold.co/500x500/c0c0c0/333?text=Watch+4",
//   ],
//   descriptionContent: [
//     {
//       title: "The Best Match",
//       text: "The best tool to compliment your look with a watch that never goes out of style. This aesthetic, sophisticated piece will look great on your desk, or during a special night out. Paired nicely with denim or dress pants for a more elegant look.",
//     },
//     {
//       title: "Lightweight Design",
//       text: "Designed with a super light aerospace-grade metal frame, this watch is surprisingly light, giving you comfort while maintaining a sense of luxury all day long. Built to absorb hard shocks, it offers a solid and secure accessory for everyday use. Its thin profile is also suitable for smaller wrists.",
//     },
//   ],
//   productDetailsContent: [
//     {
//       title: "Free Shipping & Returns",
//       text: "We offer free shipping for all products on orders above $50 and include free delivery for all orders in US/Canada. Orders usually ship within 24 hours.",
//     },
//     {
//       title: "Worry-Free Guarantee",
//       text: "We guarantee our products and service, offering a full refund or exchange within 30 days of purchase.",
//     },
//     {
//       title: "Online Support",
//       text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
//     },
//   ],
//   reviewsContent: [
//     {
//       title: "asefasdfsadfasdf",
//       text: "We offer free shippifasdfaasdfsdfngasd for all pfasdfroducts on ordasdfasdfasdove $50 and include free delivery forasdasdff all orders in US/Canada. Orders usually ship within 24 hours.",
//     },
//     {
//       title: "Worry-Free dfgsdfgsdfg",
//       text: "We guarantee our productss aasf",
//     },
//     {
//       title: "Online Support",
//       text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
//     },
//   ],
// };


  return (
    <div className="flex flex-col bg-muted items-center justify-center">
      {/* Home Page 1 */}
      <div className="page-1 container-sm md:container-md">
        <HeroSection />
        <CategorySection />
      </div>
      <Separator />

      {/* Home Page Section 2 FreeShipping & Small Banner*/}
      <div className="page-2 container-sm md:container-md my-10 ">
        <div className="bg-secondary border-2 rounded-sm  DmSans border-chart-4 flex flex-col lg:flex-row lg:justify-between justify-center items-center pr-5">
          <div className="flex items-center gap-5 py-4 xl:py-0 xl:px-0 px-4">
            <img className="hidden xl:block" src="./truck.png" alt="" />
            <p className="text-[30px] lg:text-4xl text-center font-medium ">
              Free Shipping
            </p>
          </div>
          <Separator orientation="vertical" className="h-10 hidden lg:block" />
          <div>
            <p className="text-[18px] lg:text-2xl mb-5 lg:mb-0">
              Free Delivery Now On Your First Order and over $200
            </p>
          </div>
          <Separator orientation="vertical" className="h-10 hidden lg:block" />
          <div>
            <p className="text-[23px] lg:text-3xl font-bold">- Only $200*</p>
          </div>
        </div>
        <div className="mt-5 items-center grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-5 justify-between">
          <div className="md:col-span-4 lg:col-span-1">
            <SmallBanner
              url={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
              }
              title={" Marcel Dining Room Chair"}
              price={119.0}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <SmallBanner
              url={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-2.jpg"
              }
              title={"Armchair Mad By shopstic"}
              price={190.0}
            />
          </div>
          <div className="md:col-span-2 md:col-start-3 lg:col-span-1">
            <SmallBanner
              url={
                "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-3.jpg"
              }
              title={"Noise Wireless Headphone"}
              price={158.0}
            />
          </div>
        </div>
      </div>

      {/* Home Ppage 3 Popular Products */}
      <div className="page-3 container-sm md:container-md">
        <PopularProducts />
        {/* Banner */}
        <div className="relative w-full mt-5 group overflow-hidden">
          <img
            className="group-hover:scale-110  h-[100px] transition-all duration-800 delay-100"
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/offer-banner.jpg"
            alt=""
          />
          <div className="absolute top-6 lg:top-[18%] lg:right-[50%] md:translate-x-[50%] translate-x-[20%] flex items-center justify-center gap-5">
            <h4 className="text-4xl font-bold text-white">Watch</h4>
            <div className="lg:text-xl text-smspace-y-3 text-white">
              <p className="lg:text-xl text-sm">
                M6 Smart Band 2.3 – Fitness Band
              </p>
              <p className="lg:text-lg whitespace-nowrap text-sm">
                Men’s and Women’s Health Tracking, Red Strap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Home Page 4 Latest Products */}
      <div className="page-4 container-sm md:container-md mt-10 relative">
        <SliderProductsShow
          title="Latest Products"
          filter="latest"
          products={products}
        />
      </div>

      {/* Home Page 5 Use Big Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-5 container-sm md:container-md">
        <div data-aos="slide-up" data-aos-delay="200" data-aos-duration="400">
          <BigBanner
            image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-4.jpg"
            bannerStatus="Save Up To 20% Off"
            title="Santa Lucia Three Seater Sofa"
          />
        </div>
        <div data-aos="slide-down" data-aos-delay="400" data-aos-duration="600">
          <BigBanner
            image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-5.jpg"
            bannerStatus="Best Online Discount"
            title="Woman In Red Crew Neck T-shirt"
          />
        </div>
      </div>

      {/* Home Page 6 Featured Products */}
      <div className="container-sm md:container-md my-5">
        <SliderProductsShow
          title="Featured Products"
          filter="featured"
          products={products}
        />
      </div>

      {/* Home Page 7 Brand Shocase  */}
      <div className="container-sm md:container-md">
        <BrandShowCase />
      </div>

      {/* Home Page 8 Deals Of The Day */}
      <div className="container-sm md:container-md">
        <SliderProductsShow
          title="Deals of The Day"
          filter="countdown"
          products={products}
        />
      </div>

      {/* Home Page 9 Big Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-5 container-sm md:container-md">
        <div data-aos="slide-up" data-aos-delay="200" data-aos-duration="400">
          <BigBanner
            image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-6.jpg"
            bannerStatus="20 Days Return Products"
            title="Mobile Shop-Smart Watch"
          />
        </div>
        <div data-aos="slide-left" data-aos-delay="400" data-aos-duration="600">
          <BigBanner
            image="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-7.jpg"
            bannerStatus="Save Up To 20% Off"
            title="Decorating Design Light Lamp"
          />
        </div>
      </div>

      {/* Home Page 10 What Our Clients Say / Clients Reviews */}
      <div className="container-sm md:container-md bg-secondary">
        <ClientReview />
      </div>
    </div>
  );
}
