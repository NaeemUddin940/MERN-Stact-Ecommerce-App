import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define the product type
interface ProductType {
  image: string;
  discount: string;
  isNew: boolean;
  brand: string;
  name: string;
  rating: number;
  oldPrice: string;
  newPrice: string;
  colors: string[];
  category: string;
  isLatest: boolean;
  description: string;
  isPopular: boolean;
  isFeatured: boolean;
  countdown?: string;
}
export const initialProducts: ProductType[] = [
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
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    countdown: "9:10:22:10",
    description:
      "Experience responsive cushioning with the Nike Air Zoom. Perfect for daily runs and long distances.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-home_default/blouse.jpg",
    discount: "15% OFF",
    isNew: false,
    brand: "Adidas",
    name: "Ultraboost 22",
    rating: 4.7,
    oldPrice: "$180",
    newPrice: "$150",
    colors: ["white", "black"],
    category: "Fashion",
    isLatest: true,
    isPopular: false,
    isFeatured: true,
    countdown: "2:11:23:00",
    description:
      "The Ultraboost 22 provides incredible energy return and comfort, designed for the ultimate running experience.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/38-home_default/printed-dress.jpg",
    discount: "30% OFF",
    isNew: true,
    brand: "Zara",
    name: "Summer Floral Dress",
    rating: 4.3,
    oldPrice: "$90",
    newPrice: "$63",
    colors: ["yellow", "pink"],
    category: "Fashion",
    isLatest: true,
    isPopular: true,
    isFeatured: false,
    countdown: null,
    description:
      "A light and breezy floral dress, perfect for sunny days and outdoor gatherings. Made with sustainable cotton.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/43-home_default/printed-summer-dress.jpg",
    discount: "10% OFF",
    isNew: false,
    brand: "H&M",
    name: "Casual T-Shirt",
    rating: 4.1,
    oldPrice: "$25",
    newPrice: "$22",
    colors: ["gray", "black", "white"],
    category: "Fashion",
    isLatest: false,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "Your everyday essential. This soft cotton t-shirt offers a comfortable fit for any casual occasion.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/45-home_default/printed-summer-dress.jpg",
    discount: "25% OFF",
    isNew: true,
    brand: "Puma",
    name: "Running Shorts",
    rating: 4.6,
    oldPrice: "$60",
    newPrice: "$45",
    colors: ["black", "blue"],
    category: "Fashion",
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    countdown: "8:02:03:13",
    description:
      "Stay cool and comfortable during your workout with these lightweight, breathable running shorts from Puma.",
  },
  {
    image:
      "https://img.drz.lazcdn.com/static/bd/p/80edc3d4bc83d08d511df8ca893a4f68.jpg_720x720q80.jpg_.webp",
    discount: "18% OFF",
    isNew: true,
    brand: "Levi's",
    name: "Slim Fit Jeans",
    rating: 4.4,
    oldPrice: "$110",
    newPrice: "$90",
    colors: ["blue", "black"],
    category: "Fashion",
    isLatest: false,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "A timeless classic. These Levi's slim fit jeans offer a modern silhouette with all-day comfort and style.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/53-home_default/printed-chiffon-dress.jpg",
    discount: "12% OFF",
    isNew: false,
    brand: "Reebok",
    name: "Training Hoodie",
    rating: 4.2,
    oldPrice: "$70",
    newPrice: "$62",
    colors: ["black", "green"],
    category: "Fashion",
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    countdown: "5:01:23:13",
    description:
      "The perfect layer for your workout or cool-down. This Reebok hoodie combines soft fabric with a sporty design.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/59-home_default/printed-summer-dress.jpg",
    discount: "22% OFF",
    isNew: true,
    brand: "Under Armour",
    name: "Gym Tank Top",
    rating: 4.0,
    oldPrice: "$40",
    newPrice: "$31",
    colors: ["red", "white"],
    category: "Fashion",
    isLatest: true,
    isPopular: true,
    isFeatured: false,
    countdown: null,
    description:
      "Push your limits with this performance-driven gym tank top, engineered to keep you dry and comfortable.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/63-home_default/printed-dress.jpg",
    discount: "35% OFF",
    isNew: false,
    brand: "Gucci",
    name: "Designer Handbag",
    countdown: "4:11:23:13",
    rating: 4.9,
    oldPrice: "$1200",
    newPrice: "$780",
    colors: ["brown", "black"],
    category: "Accessories",
    isLatest: false,
    isPopular: true,
    isFeatured: true,
    description:
      "Elevate your style with this exquisite Gucci handbag, a statement piece of luxury craftsmanship and timeless design.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/67-home_default/printed-dress.jpg",
    discount: "40% OFF",
    isNew: true,
    brand: "Prada",
    name: "Luxury Sunglasses",
    rating: 4.8,
    oldPrice: "$350",
    newPrice: "$210",
    colors: ["black", "gold"],
    category: "Accessories",
    isLatest: true,
    isPopular: true,
    isFeatured: false,
    countdown: null,
    description:
      "Protect your eyes in style with these chic Prada sunglasses, featuring a bold design and superior UV protection.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg",
    discount: "15% OFF",
    isNew: true,
    brand: "Samsung",
    name: "Galaxy Buds Pro",
    rating: 4.5,
    oldPrice: "$200",
    newPrice: "$170",
    colors: ["black", "white"],
    category: "Electronics",
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "Immerse yourself in crystal-clear audio with intelligent Active Noise Canceling. Perfect for music and calls.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-home_default/blouse.jpg",
    discount: "10% OFF",
    isNew: false,
    brand: "Apple",
    name: "AirPods Max",
    rating: 4.7,
    oldPrice: "$550",
    newPrice: "$495",
    colors: ["gray", "blue"],
    category: "Electronics",
    isLatest: false,
    isPopular: true,
    isFeatured: true,
    countdown: "9:11:23:13",
    description:
      "Experience high-fidelity audio and industry-leading Active Noise Cancellation with a breathtaking design.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/38-home_default/printed-dress.jpg",
    discount: "20% OFF",
    isNew: true,
    brand: "Sony",
    name: "PlayStation 5",
    rating: 4.9,
    oldPrice: "$600",
    newPrice: "$480",
    colors: ["white", "black"],
    category: "Electronics",
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "Dive into next-gen gaming with the PS5. Experience lightning-fast loading, haptic feedback, and stunning 4K visuals.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/43-home_default/printed-summer-dress.jpg",
    discount: "5% OFF",
    isNew: false,
    brand: "LG",
    name: "Smart OLED TV",
    rating: 4.6,
    oldPrice: "$1500",
    newPrice: "$1425",
    colors: ["black"],
    countdown: "4:11:23:13",
    category: "Electronics",
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    description:
      "Witness perfect blacks and infinite contrast with this LG OLED TV. Bring the cinematic experience to your living room.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/45-home_default/printed-summer-dress.jpg",
    discount: "18% OFF",
    isNew: true,
    brand: "Dell",
    name: "XPS 13 Laptop",
    rating: 4.7,
    oldPrice: "$1200",
    newPrice: "$984",
    colors: ["silver", "black"],
    category: "Electronics",
    isLatest: true,
    isPopular: true,
    isFeatured: false,
    countdown: null,
    description:
      "Power and portability combined. The Dell XPS 13 features a stunning InfinityEdge display and robust performance.",
  },
  {
    image:
      "https://i5.walmartimages.com/seo/HP-Pavilion-15-6-FHD-Gaming-Laptop-Intel-Core-i5-10300H-8GB-RAM-NVIDIA-GeForce-GTX-1650-4GB-250GB-SSD-Windows-10-Home-Black-15-dk1056wm_8b269d16-6343-40c0-832f-e4d394ad8b75.9a1d5beb1ed0c4b7815d8657536428f9.jpeg",
    discount: "12% OFF",
    isNew: false,
    brand: "HP",
    name: "Pavilion Gaming Laptop",
    rating: 4.3,
    oldPrice: "$1000",
    newPrice: "$880",
    colors: ["black", "green"],
    category: "Electronics",
    isLatest: false,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "Enter the world of gaming with the HP Pavilion, equipped with a powerful GPU and efficient cooling for smooth gameplay.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/53-home_default/printed-chiffon-dress.jpg",
    discount: "25% OFF",
    isNew: true,
    brand: "Canon",
    name: "EOS R6 Camera",
    rating: 4.8,
    oldPrice: "$2500",
    newPrice: "$1875",
    colors: ["black"],
    category: "Electronics",
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "Capture breathtaking photos and cinematic 4K video with the Canon EOS R6. A camera for passionate creators.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/59-home_default/printed-summer-dress.jpg",
    discount: "30% OFF",
    isNew: false,
    brand: "Bose",
    name: "QuietComfort 45",
    rating: 4.7,
    oldPrice: "$350",
    newPrice: "$245",
    colors: ["black", "white"],
    category: "Electronics",
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    countdown: null,
    description:
      "Enjoy world-class noise cancellation and balanced audio with the legendary Bose QuietComfort 45 headphones.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/63-home_default/printed-dress.jpg",
    discount: "20% OFF",
    isNew: true,
    brand: "Microsoft",
    name: "Surface Pro 9",
    rating: 4.6,
    oldPrice: "$1400",
    newPrice: "$1120",
    colors: ["platinum", "black"],
    category: "Electronics",
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    countdown: null,
    description:
      "The versatility of a laptop, the flexibility of a tablet. The Surface Pro 9 is your ultra-portable powerhouse.",
  },
  {
    image:
      "https://demos.codezeel.com/prestashop/PRS21/PRS210502/67-home_default/printed-dress.jpg",
    discount: "15% OFF",
    isNew: true,
    brand: "Asus",
    name: "ROG Phone 6",
    rating: 4.5,
    oldPrice: "$900",
    newPrice: "$765",
    colors: ["black", "red"],
    category: "Electronics",
    isLatest: true,
    isPopular: false,
    isFeatured: true,
    countdown: null,
    description:
      "Unleash your gaming potential with the ROG Phone 6, featuring a high-refresh-rate screen and powerful processor.",
  },
];

// Define context type
interface ProductContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider props
interface ProductProviderProps {
  children: ReactNode;
}

// ProductProvider component
export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
