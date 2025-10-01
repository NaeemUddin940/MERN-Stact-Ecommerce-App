import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ImageDropzone from "@/components/ui/ImageDropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image, Pen, Plus, Trash2, XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export default function AddHomeSliders() {
  const [smallStatus, setSmallStatus] = useState("Deals Of The Day");
  const [title, setTitle] = useState("Modern Luxury Sofa Set");
  const [color, setColor] = useState("Color Gray");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(fileArray);
    }
  };
  return (
    <div className="p-5 space-y-5">
      <div className="text-4xl font-bold flex items-center justify-between">
        <h2>Add Home Sliders</h2>

        <Button>
          {" "}
          <Plus /> Add Home Slides{" "}
        </Button>
      </div>
      <Separator />

      <div className="grid grid-cols-12 grid-rows-8 gap-4">
        <div className="col-span-8 row-span-2">
          {/* Input fields */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="small-status">Small Status</Label>
              <Input
                id="small-status"
                value={smallStatus}
                onChange={(e) => setSmallStatus(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 row-span-6 col-start-1 row-start-3 bg-blue-100">
          {/* Home Sliders upload */}
          <div className="flex items-center gap-2 h-[440px]">
            <div className="p-3 rounded-md overflow-hidden border border-dashed border-input h-full w-full bg-card cursor-pointer hover:bg-accent flex items-center justify-center flex-col relative">
              {images.length === 0 ? (
                <>
                  <Image size={70} />
                  <h4 className="text-5xl pointer-events-none mt-8">
                    Home Sliders Upload
                  </h4>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Small Banner Info 01 */}
        <div className="col-span-4 col-start-9 row-start-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <Label htmlFor="title">Title</Label>
            <Input placeholder="Samsung Gear VR Camera" />
            <Label htmlFor="price">Price</Label>
            <Input className="w-25" placeholder="119" />
          </div>
          <Separator />
        </div>
        <div className="col-span-4 row-span-3 col-start-9 row-start-2 bg-red-100">
          {" "}
          {/* Small Banner Image 01 */}
          <div className="flex items-center gap-2 h-[212px]">
            <div className="p-3 rounded-md overflow-hidden border border-dashed border-input h-full w-full bg-card cursor-pointer hover:bg-accent flex items-center justify-center flex-col relative">
              {images.length === 0 ? (
                <>
                  <Image size={70} />
                  <h4 className="text-2xl mt-5 pointer-events-none">
                    First Small Banner Upload
                  </h4>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Small Banner Info 02 */}
        <div className="col-span-4 col-start-9 row-start-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <Label htmlFor="title">Title</Label>
            <Input placeholder="Marcel Dining Room Chair" />
            <Label htmlFor="price">Price</Label>
            <Input className="w-25" placeholder="129" />
          </div>
          <Separator />
        </div>
        <div className="col-span-4 row-span-3 col-start-9 row-start-6 bg-green-100">
          {/* Small Banner Image 02 */}
          <div className="flex items-center gap-2 h-[212px]">
            <div className="p-3 rounded-md overflow-hidden border border-dashed border-input h-full w-full bg-card cursor-pointer hover:bg-accent flex items-center justify-center flex-col relative">
              {images.length === 0 ? (
                <>
                  <Image size={70} />
                  <h4 className="text-2xl mt-5 pointer-events-none">
                    Second Small Banner Upload
                  </h4>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Image Preview Section */}
      <div className="grid grid-cols-12 grid-rows-3 gap-4">
        <div className="col-span-8 row-span-3">
          <Table className="border border-collapse w-full">
            {/* Table Header */}
            <TableHeader className="bg-muted/50">
              <TableRow className="divide-x">
                <TableHead className="w-[40px]  text-center border">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[700px] text-center border">
                  Slides Image
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              <TableRow className="hover:bg-muted/30 divide-x">
                <TableCell className="text-center w-[40px] border">
                  <Checkbox />
                </TableCell>
                <TableCell className="h-[200px] w-[700px] border group relative">
                  <img
                    className="h-[200px] w-full hover:blur-sm hover:animate-fade-out animate-blurred-fade-in object-cover rounded-md"
                    src="https://img.freepik.com/premium-photo/cartoon-man-sits-desk-with-laptop-picture-man-working-it_1103290-10643.jpg"
                    alt="Slide"
                  />
                  <div className=" hidden group-hover:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-3">
                    <button className="p-2 rounded-md hover:bg-accent">
                      <Pen size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-accent">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="col-span-4 row-span-3 col-start-9">
          <Table className="border border-collapse w-full">
            {/* Table Header */}
            <TableHeader className="bg-muted/50">
              <TableRow className="divide-x">
                <TableHead className="w-[50px] text-center border">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[650px] text-center border">
                  Slides Image
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              <TableRow className="hover:bg-muted/30 divide-x">
                <TableCell className="text-center border">
                  <Checkbox />
                </TableCell>
                <TableCell className="h-[200px] w-[650px] border relative group ">
                  <img
                    className="h-[200px] hover:blur-sm w-[650px] hover:animate-fade-out animate-blurred-fade-in object-cover rounded-md"
                    src="https://img.freepik.com/premium-photo/cartoon-man-sits-desk-with-laptop-picture-man-working-it_1103290-10643.jpg"
                    alt="Slide"
                  />
                  <div className=" hidden group-hover:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-3">
                    <button className="p-2 rounded-md hover:bg-accent">
                      <Pen size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-accent">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
