interface BannerTypes {
  image: string;
  bannerStatus: string;
  title: string;
}

export default function BigBanner({ image, bannerStatus, title }: BannerTypes) {
  return (
    <div className="mx-auto relative h-[250px] overflow-hidden group  rounded-sm shadow-xl flex">
      <img
        className="rounded-sm h-full w-full object-cover group-hover:scale-115 duration-800 delay-150"
        src={image}
        alt={title}
      />
      {/* Content Section (Left) */}
      <div className="absolute lg:pl-15 p-5 w-3/4">
        <p className="text-sm sm:text-lg text-gray-700 font-semibold mb-2">
          {bannerStatus}
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        <button className="px-8 py-3 cursor-pointer bg-chart-4 hover:bg-chart-1 text-white font-bold rounded-full shadow-lg hover:transition-all hover:duration-300 hover:transform hover:scale-105">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
