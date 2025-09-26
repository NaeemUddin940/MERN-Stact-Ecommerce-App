import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const clientReviews = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Amazing experience! The product quality is top-notch and delivery was super fast.",
  },
  {
    name: "Sophia Smith",
    email: "sophia.smith@example.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Customer support was very helpful. I’m really satisfied with my purchase.",
  },
  {
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    review:
      "Great pricing compared to other sites. I’ll definitely shop here again!",
  },
  {
    name: "Emma Brown",
    email: "emma.brown@example.com",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The website is easy to navigate and checkout was seamless. Highly recommend.",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    review:
      "I had a minor issue but it was resolved quickly. Excellent customer service!",
  },
];

export default function ClientReview() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        930: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
      }}
      speed={800}
      modules={[Navigation, Autoplay]}>
      {clientReviews.map((client, index) => (
        <SwiperSlide key={index}>
          <div className="bg-secondary p-6 rounded-xl border shadow-lg my-3 w-full max-w-lg font-sans">
            <div className="flex items-center mb-2 ">
              <img
                src={client.image}
                height={10}
                width={10}
                alt={client.name}
                className="rounded-full h-20 w-20 object-cover mr-4 border-2 border-gray-200"
              />
              <div className="flex flex-col justify-start items-start">
                <h4 className="font-semibold .DmSans text-foreground text-lg">
                  {client.name}
                </h4>
                <p className="text-sm .DmSans text-muted-foreground">
                  {client.email}
                </p>
              </div>
            </div>
            <p className="text-gray-500 .DmSans line-clamp-2 text-left leading-relaxed">
              {client.review}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
