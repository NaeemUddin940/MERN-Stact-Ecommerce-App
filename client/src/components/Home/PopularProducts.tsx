import { useCategoryContext } from "../../context/CategoryContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
export default function PopularProducts() {
  const { categories } = useCategoryContext();

  const products = [
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg",
      discount: "20% OFF",
      isNew: true,
      brand: "Nike",
      name: "Air Zoom Pegasus",
      rating: 4.5,
      oldPrice: "$120",
      newPrice: "$95",
      colors: ["red", "black", "blue"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/86-home_default/hummingbird-cushion.jpg",
      discount: "15% OFF",
      isNew: false,
      brand: "Apple",
      name: "AirPods Pro",
      rating: 4.8,
      oldPrice: "$250",
      newPrice: "$210",
      colors: ["white"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/90-home_default/brown-bear-printed-sweater.jpg",
      discount: "10% OFF",
      isNew: true,
      brand: "Adidas",
      name: "UltraBoost 22",
      rating: 4.7,
      oldPrice: "$180",
      newPrice: "$162",
      colors: ["black", "white", "grey"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/87-home_default/mountain-fox-cushion.jpg",
      discount: "25% OFF",
      isNew: false,
      brand: "Samsung",
      name: "Galaxy Buds 2",
      rating: 4.4,
      oldPrice: "$150",
      newPrice: "$112",
      colors: ["white", "lavender", "olive"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/99-home_default/hummingbird-printed-t-shirt.jpg",
      discount: "30% OFF",
      isNew: true,
      brand: "Sony",
      name: "WH-1000XM5 Headphones",
      rating: 4.9,
      oldPrice: "$400",
      newPrice: "$280",
      colors: ["black", "silver"],
      category: "Bags",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/70-home_default/mountain-fox-vector-graphics.jpg",
      discount: "5% OFF",
      isNew: false,
      brand: "Puma",
      name: "Running T-Shirt",
      rating: 4.2,
      oldPrice: "$45",
      newPrice: "$42.75",
      colors: ["blue", "yellow"],
      category: "Bags",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/101-home_default/leather-bag.jpg",
      discount: "15% OFF",
      isNew: true,
      brand: "Gucci",
      name: "Leather Bag Classic",
      rating: 4.6,
      oldPrice: "$300",
      newPrice: "$255",
      colors: ["brown", "black"],
      category: "Bags",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/102-home_default/running-shoes.jpg",
      discount: "20% OFF",
      isNew: false,
      brand: "Nike",
      name: "Air Max 270",
      rating: 4.7,
      oldPrice: "$150",
      newPrice: "$120",
      colors: ["white", "black"],
      category: "Footwear",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/103-home_default/organic-apple.jpg",
      discount: "10% OFF",
      isNew: true,
      brand: "FreshFarm",
      name: "Organic Apple Pack",
      rating: 4.3,
      oldPrice: "$10",
      newPrice: "$9",
      colors: ["red", "green"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/104-home_default/lipstick.jpg",
      discount: "25% OFF",
      isNew: false,
      brand: "Maybelline",
      name: "Matte Lipstick",
      rating: 4.5,
      oldPrice: "$20",
      newPrice: "$15",
      colors: ["red", "pink", "nude"],
      category: "Fashion",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/105-home_default/yoga-mat.jpg",
      discount: "10% OFF",
      isNew: true,
      brand: "Reebok",
      name: "Yoga Mat",
      rating: 4.8,
      oldPrice: "$40",
      newPrice: "$36",
      colors: ["purple", "blue"],
      category: "Wellness",
    },
    {
      image:
        "https://demos.codezeel.com/prestashop/PRS21/PRS210502/106-home_default/gold-necklace.jpg",
      discount: "30% OFF",
      isNew: false,
      brand: "Tanishq",
      name: "Gold Necklace",
      rating: 4.9,
      oldPrice: "$500",
      newPrice: "$350",
      colors: ["gold"],
      category: "Jewellery",
    },
  ];

  return (
    <Tabs defaultValue={categories[0]?.title}>
      <div className="flex items-center justify-between">
        <h3 className="lg:text-4xl xl:hidden block text-3xl font-bold ">
          Popular Products
        </h3>
        <div className="flex gap-2 md:hidden">
          <div className="swiper-prev bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer">
            <ChevronLeft />
          </div>
          <div className="swiper-next bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer">
            <ChevronRight />
          </div>
        </div>
      </div>
      <div className="flex items-center rounded-sm justify-between bg-muted shadow border py-4 px-2">
        <h3 className="lg:text-4xl hidden xl:block text-4xl font-bold ">
          Popular Products
        </h3>
        <TabsList className="flex gap-2">
          <div>
            {categories.map((cat) => (
              <TabsTrigger key={cat.title} value={cat.title}>
                {cat.title}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>

        {/* Important: make navigation buttons persistent (outside of TabsContent) */}
        <div className="md:flex gap-2 hidden">
          <div className="swiper-prev bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer">
            <ChevronLeft />
          </div>
          <div className="swiper-next bg-ring hover:bg-chart-1 p-2 rounded-full cursor-pointer">
            <ChevronRight />
          </div>
        </div>
      </div>
      {/* Tabs content with Swipers */}
      {categories.map((cat) => {
        const filteredProducts = products.filter(
          (p) => p.category === cat.title
        );

        return (
          <TabsContent key={cat.title} value={cat.title}>
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={10}
              className="mySwiperr"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              breakpoints={{
                668: { slidesPerView: 2, spaceBetween: 30 },
                880: { slidesPerView: 3, spaceBetween: 30 },
                1050: { slidesPerView: 4, spaceBetween: 10 },
                1280: { slidesPerView: 5, spaceBetween: 20 },
              }}
              modules={[Navigation, Autoplay]}>
              {filteredProducts.map((product, i) => (
                <SwiperSlide key={i}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
