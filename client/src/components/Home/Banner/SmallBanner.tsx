import { Link } from "react-router-dom";

interface CardProps {
  url: string;
  title: string;
  price: number;
}

export default function SmallBanner({ url, title, price }: CardProps) {
  return (
    <div>
      <div className="group relative overflow-hidden rounded-sm ">
        <img
          className="group-hover:scale-115 h-[250px] w-full object-cover transition-all duration-1500 delay-100"
          src={url}
          alt={title}
        />
        <div className="absolute h-full w-5/8 p-4 space-y-3 flex flex-col items-end justify-center text-black font-medium top-0 right-0">
          <h3 className="text-2xl text-end font-bold">{title}</h3>
          <p className="text-2xl text-chart-4 font-bold">${price}</p>
          <Link
            to="#"
            className="text-lg text-black cursor-pointer hover:underline hover:text-chart-4">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
