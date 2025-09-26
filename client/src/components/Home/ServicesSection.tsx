import { BadgeAlert, Headset, Shield, Truck } from "lucide-react";

const featureData = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "For all Orders Over $100",
  },
  {
    icon: BadgeAlert,
    title: "30 Days Returns",
    description: "For an Exchange Product",
  },
  {
    icon: Shield,
    title: "Secured Payment",
    description: "Payment Cards Accepted",
  },
  {
    icon: Headset,
    title: "Support 24/7",
    description: "Contact us Anytime",
  },
];

export default function ServicesSection() {
  return (
    <div className="bg-background flex items-center justify-center py-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 container-sm md:container-md max-w-7xl mx-auto w-full">
        {featureData.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex group flex-col items-center text-center p-4 rounded-lg shadow-xl border border-white transition-transform transform hover:scale-105">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Icon
                  className="group-hover:animate-slide-out-top delay-100 duration-500"
                  size={50}
                />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
