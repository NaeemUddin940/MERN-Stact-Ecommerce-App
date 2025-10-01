"use client";

import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ImageDropzone from "@/components/ui/ImageDropzone";
import { XIcon } from "lucide-react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [subcategory, setSubcategory] = useState("Iphone");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isLatest, setIsLatest] = useState(false);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [ram, setRam] = useState("");
  const [weight, setWeight] = useState("");
  const [storage, setStorage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [rating, setRating] = useState(3.5);

  // Multiple images
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);

    const previews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleRemove = (url: string) => {
    URL.revokeObjectURL(url);
    setPreviewImages((prev) => prev.filter((item) => item !== url));
  };

  const handleSubmit = () => {
    const productData = {
      title,
      description,
      category,
      subcategory,
      price,
      oldPrice,
      isFeatured,
      isNewArrival,
      isTrending,
      isLatest,
      stock,
      brand,
      discount,
      ram,
      weight,
      storage,
      size,
      color,
      rating,
      images, // raw files to send to backend
    };
    console.log("Product Data:", productData);
    // Call your API to save product
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 overflow-auto addP">
      <h1 className="text-2xl font-bold">Add New Product</h1>

      {/* Product Name */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Product Name</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Name"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Description</label>
        <Textarea
          value={description}
          className="h-30"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
        />
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="flex flex-col lg:col-span-1">
          <label className="mb-1 font-medium">Category</label>
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Grocery">Grocery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col lg:col-span-1">
          <label className="mb-1 font-medium">Sub Category</label>
          <Select
            value={subcategory}
            onValueChange={(val) => setSubcategory(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select SubCategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Iphone">Iphone</SelectItem>
              <SelectItem value="Samsung">Samsung</SelectItem>
              <SelectItem value="Xaomi">Xaomi</SelectItem>
              <SelectItem value="Vivo">Vivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured & Tags */}
        <div className="flex flex-wrap gap-4 mt-2 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isFeatured}
              onCheckedChange={(val) => setIsFeatured(val)}
            />
            <span className="font-medium">Featured Product</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={isNewArrival}
              onCheckedChange={(val) => setIsNewArrival(val)}
            />
            <span className="font-medium">New Arrival</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4  mt-2 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={isTrending}
              onCheckedChange={(val) => setIsTrending(val)}
            />
            <span className="font-medium">Trending</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={isLatest}
              onCheckedChange={(val) => setIsLatest(val)}
            />
            <span className="font-medium">Latest</span>
          </div>
        </div>
      </div>

      {/* Price, Old Price, Discount */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Price</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Current Price"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Old Price</label>
          <Input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(Number(e.target.value))}
            placeholder="Old Price"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Discount (%)</label>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="Discount"
          />
        </div>
      </div>

      {/* Stock & Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Stock</label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Product Stock"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Brand</label>
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
        </div>
      </div>

      {/* Technical Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">RAM</label>
          <Input
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            placeholder="RAM"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Storage</label>
          <Input
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            placeholder="Storage"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Size</label>
          <Input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Size"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Color</label>
          <Input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          />
        </div>
      </div>

      {/* Weight & Rating */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Weight</label>
          <Input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-1 font-medium">Rating</p>
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              onChange={(_, newValue) => setRating(Number(newValue))}
              className=" border border-border px-2 py-1 rounded-md"
              value={rating}
              precision={0.5}
            />
          </Stack>
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-2">
        {previewImages.length > 0 && (
          <div
            className={`gap-2 flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5`}>
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative">
                <LazyLoadImage
                  className="h-[150px] w-[170px] object-contain rounded border"
                  alt={"image"}
                  src={src}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                />

                <div
                  className="absolute top-0 right-0"
                  onClick={() => handleRemove(src)}>
                  <XIcon className="bg-red-400 rounded-full p-1 hover:bg-red-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        )}

        <ImageDropzone handleChange={handleImageChange} multiple={true} />
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Add Product
      </Button>
    </div>
  );
}
