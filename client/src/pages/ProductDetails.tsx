import React, { useState, useMemo, useEffect } from "react";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Clock,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import capitalize from "@/utils/capitalize";
import { Separator } from "@/components/ui/separator";
import { useProductContext } from "@/context/ProductContext";

// --- MOCK DATA TYPES ---
interface ColorOption {
  name: string;
  hex: string;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  rating: number;
  reviewCount: number;
  price: number;
  salePrice?: number;
  shortDescription: string;
  stock: number;
  reviewsContent: { title: string; text: string }[];
  sizes: string[];
  colors: ColorOption[];
  images: string[];
  descriptionContent: { title: string; text: string }[];
  productDetailsContent: { title: string; text: string }[];
}

// --- MOCK PRODUCT DATA ---
const mockProduct: Product = {
  id: 740683,
  name: "Nike Air Max Invigor 'Black' 740683",
  sku: "BWRD-WATCH-CAPITAL",
  brand: "Brand: Watch Capital",
  rating: 4.5,
  reviewCount: 17,
  price: 120.0,
  salePrice: 79.99,
  shortDescription:
    "Elevate your look with the modern, minimalist timepiece. Durable construction and quartz movement ensure timeless style and reliability.",
  stock: 150,
  sizes: ["Small", "Medium", "Large"],
  colors: [
    { name: "White/Rose Gold", hex: "#f8fafc" },
    { name: "Black/Silver", hex: "#1f2937" },
    { name: "Olive Green", hex: "#4b5563" },
  ],
  images: [
    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/123-home_default/hummingbird-notebook.jpg",
    "https://placehold.co/500x500/e0e0e0/333?text=Watch+2",
    "https://placehold.co/500x500/d0d0d0/333?text=Watch+3",
    "https://placehold.co/500x500/c0c0c0/333?text=Watch+4",
  ],
  descriptionContent: [
    {
      title: "The Best Match",
      text: "The best tool to compliment your look with a watch that never goes out of style. This aesthetic, sophisticated piece will look great on your desk, or during a special night out. Paired nicely with denim or dress pants for a more elegant look.",
    },
    {
      title: "Lightweight Design",
      text: "Designed with a super light aerospace-grade metal frame, this watch is surprisingly light, giving you comfort while maintaining a sense of luxury all day long. Built to absorb hard shocks, it offers a solid and secure accessory for everyday use. Its thin profile is also suitable for smaller wrists.",
    },
  ],
  productDetailsContent: [
    {
      title: "Free Shipping & Returns",
      text: "We offer free shipping for all products on orders above $50 and include free delivery for all orders in US/Canada. Orders usually ship within 24 hours.",
    },
    {
      title: "Worry-Free Guarantee",
      text: "We guarantee our products and service, offering a full refund or exchange within 30 days of purchase.",
    },
    {
      title: "Online Support",
      text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
    },
  ],
  reviewsContent: [
    {
      title: "asefasdfsadfasdf",
      text: "We offer free shippifasdfaasdfsdfngasd for all pfasdfroducts on ordasdfasdfasdove $50 and include free delivery forasdasdff all orders in US/Canada. Orders usually ship within 24 hours.",
    },
    {
      title: "Worry-Free dfgsdfgsdfg",
      text: "We guarantee our productss aasf",
    },
    {
      title: "Online Support",
      text: "You can reach our team via chat or email, 24/7. We usually respond within an hour, even on weekends.",
    },
  ],
};

// --- UTILITY COMPONENTS ---

const RatingStars: React.FC<{ rating: number; reviewCount: number }> = ({
  rating,
  reviewCount,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              className="w-4 h-4 fill-yellow-500 text-yellow-500"
            />
          ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 fill-yellow-500/50 text-yellow-500/50" />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
          ))}
      </div>
      <span className="text-gray-500 dark:text-slate-400">
        ({reviewCount} reviews)
      </span>
    </div>
  );
};

const PolicyModule: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}> = ({ icon, title, subtitle }) => (
  <div className="flex items-start p-4 border-b border-gray-100 last:border-b-0">
    <div className="text-gray-800 dark:text-slate-400 pt-1 flex-shrink-0">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="font-semibold text-gray-800 dark:text-slate-200 text-sm">
        {title}
      </h3>
      <p className="text-gray-800 dark:text-slate-400 text-xs">{subtitle}</p>
    </div>
  </div>
);

// --- MAIN PRODUCT DETAILS COMPONENT ---

const ProductDetails: React.FC = () => {
  const product = mockProduct;
  const { products } = useProductContext();
  const { id } = useParams();

  const productDetails = products.find((p) => (p.id = id));
  // if (!product) return <p>Loading...</p>;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    product.colors[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");

  const formattedPrice = useMemo(
    () => product.price.toFixed(2),
    [product.price]
  );
  const formattedSalePrice = useMemo(
    () => product.salePrice?.toFixed(2),
    [product.salePrice]
  );

  const incrementQuantity = () =>
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const activeContent =
    activeTab === "description"
      ? product.descriptionContent
      : activeTab === "details"
      ? product.productDetailsContent
      : product.reviewsContent;
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  return (
    <div className="min-h-screen bg-bcakground text-foreground font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs/Header - Minimal */}
        <div className="mb-6 flex items-center justify-between">
          <button className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
            <Breadcrumb>
              <BreadcrumbList>
                {/* Home link */}
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-bold" asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((name, index) => {
                  const path = "/" + pathnames.slice(0, index + 1).join("/");
                  const isLast = index === pathnames.length - 1;

                  return (
                    <div key={path} className="flex items-center gap-3">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="font-bold">
                            {productDetails.name} {/* last part e name show */}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink className="text-lg font-bold" asChild>
                            {/* Link path e id রাখবে, display হবে capitalized category/section */}
                            <Link
                              to={`/product/product-details/${productDetails.id}`}>
                              {capitalize(name)}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </button>
        </div>

        {/* Product Gallery & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-slate-300 shadow-shadow border-2 rounded-xl shadow-lg p-4 md:p-8">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails (Sidebar) */}
            <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    index === activeImageIndex
                      ? "border-indigo-500 ring-2 ring-indigo-500/50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                  onClick={() => setActiveImageIndex(index)}>
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/80x80?text=Img")
                    }
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-grow aspect-square h-[500px] rounded-xl overflow-hidden shadow-md">
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://demos.codezeel.com/prestashop/PRS21/PRS210502/123-home_default/hummingbird-notebook.jpg")
                }
              />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-foreground">
                {productDetails.name}
              </h1>
              <button className="p-2 text-gray-400 hover:text-chart-4 transition-colors rounded-full border border-gray-200 hover:border-chart-1">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Rating and SKU */}
            <div className="flex flex-col space-y-2 pb-4">
              <RatingStars
                rating={productDetails.rating}
                reviewCount={product.reviewCount}
              />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-chart-3">
                  {productDetails.brand}
                </span>{" "}
                | SKU: {product.sku}
              </p>
            </div>

            <Separator />
            {/* Sizes */}
            <div>
              <span className="text-sm font-semibold mb-2 block">
                Size:{" "}
                <span className="font-normal text-gray-500">
                  {selectedSize}
                </span>
              </span>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <span className="text-sm font-semibold mb-2 block">
                Color:{" "}
                <span className="font-normal text-gray-500 dark:text-slate-400">
                  {selectedColor.name}
                </span>
              </span>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center p-0.5 ${
                      selectedColor.hex === color.hex
                        ? "border-indigo-500 ring-2 ring-indigo-500/50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}>
                    {/* Inner color swatch */}
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: color.hex }}></div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />
            {/* Price */}
            <div className="flex items-end space-x-3">
              {formattedSalePrice ? (
                <>
                  <span className="text-4xl font-extrabold text-red-600">
                    ${formattedSalePrice}
                  </span>
                  <span className="text-xl font-medium text-gray-500 dark:text-slate-400 line-through">
                    ${formattedPrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-extrabold text-secondary-foreground">
                  ${formattedPrice}
                </span>
              )}
              <span className="text-sm text-green-600 font-medium ml-2">
                {formattedSalePrice
                  ? `(Save $${(product.price - product.salePrice!).toFixed(2)})`
                  : ""}
              </span>
              {/* Stock Message */}
              <p className="text-sm text-center pt-2">
                <span
                  className={`font-semibold ${
                    product.stock > 10 ? "text-green-600" : "text-orange-500"
                  }`}>
                  {product.stock > 10
                    ? "In Stock"
                    : `Low Stock: Only ${product.stock} remaining`}
                </span>
              </p>
            </div>

            {/* Quantity and Cart Actions */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-700 rounded-lg p-1">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 cursor-pointer hover:text-indigo-600 disabled:opacity-50">
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 text-center border-x border-gray-200 font-semibold text-lg py-1 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-2 text-gray-600 cursor-pointer hover:text-indigo-600 disabled:opacity-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                className="flex-1 px-6 py-3 bg-chart-1 text-white font-semibold rounded-lg shadow-md hover:bg-chart-4 transition-colors flex items-center justify-center disabled:bg-indigo-300"
                disabled={quantity === 0 || quantity > product.stock}
                onClick={() =>
                  console.log(`Added ${quantity} of ${product.name} to cart`)
                }>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>

              <button
                className="px-6 py-3 border border-chart-1 text-chart-1 font-semibold rounded-lg hover:bg-chart-1/9 transition-colors flex items-center justify-center"
                onClick={() =>
                  console.log(`Added ${product.name} to wishlist`)
                }>
                <Heart className="w-5 h-5 mr-1" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Description & Product Details Tabs */}
        <div className="flex w-full h-full items-center gap-5">
          <div className="mt-12 w-8/12 border-2 border-gray-300 shadow-shadow shadow-lg rounded-xl">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 p-4">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 px-6 text-lg font-semibold transition-colors border-b-2 ${
                  activeTab === "description"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-300 cursor-pointer"
                }`}>
                Description
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-3 px-6 text-lg font-semibold transition-colors border-b-2 ${
                  activeTab === "details"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-300 cursor-pointer"
                }`}>
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 px-6 text-lg font-semibold transition-colors border-b-2 ${
                  activeTab === "reviews"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-300 cursor-pointer"
                }`}>
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 space-y-6">
              {activeContent.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-500 dark:text-slate-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-500 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Modules */}
          <div className="w-4/12 border-2 border-gray-300 shadow-shadow shadow-lg h-full rounded-xl">
            <PolicyModule
              icon={<Shield className="w-5 h-5" />}
              title="Secure Payment"
              subtitle="All transactions are secured with encryption and fraud monitoring."
            />
            <PolicyModule
              icon={<Truck className="w-5 h-5" />}
              title="Delivery Policy"
              subtitle="Estimated delivery within 3-5 business days. Free shipping over $50."
            />
            <PolicyModule
              icon={<Clock className="w-5 h-5" />}
              title="Return Policy"
              subtitle="30-day return window from the date of purchase. Easy online returns."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
