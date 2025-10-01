"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CategoryData {
  id: number;
  image: string;
  mainCategory: string;
  subCategories: string[]; // array
  childCategories: string[]; // array
  color: string;
}

export default function AllCategorieLists() {
  const [categories, setCategories] = useState<CategoryData[]>([
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/modern-living-room-with-sofa_1127-1851.jpg",
      mainCategory: "Furniture",
      subCategories: ["Living Room", "Bedroom"],
      childCategories: ["Sofa", "Bed"],
      color: "Gray",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/laptop-on-desk_1150-32403.jpg",
      mainCategory: "Electronics",
      subCategories: ["Laptop", "Accessories"],
      childCategories: ["Gaming Laptop", "Mouse"],
      color: "Black",
    },
  ]);

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (id: number) => {
    alert(`Edit category with ID: ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">All Categories</h2>
      <Separator />

      <Table className="border w-full">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="border text-center">Image</TableHead>
            <TableHead className="border text-center">Main Category</TableHead>
            <TableHead className="border text-center">Sub Categories</TableHead>
            <TableHead className="border text-center">
              Child Categories
            </TableHead>
            <TableHead className="border text-center">
              Main Category Color
            </TableHead>
            <TableHead className="border text-center w-[200px] px-10">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map((cat) => (
              <TableRow key={cat.id} className="hover:bg-muted/20">
                <TableCell className="border text-center">
                  <img
                    src={cat.image}
                    alt={cat.mainCategory}
                    className="h-[100px] w-[100px] object-cover mx-auto rounded-md"
                  />
                </TableCell>
                <TableCell className="border text-center">
                  {cat.mainCategory}
                </TableCell>
                <TableCell className="border text-center">
                  {cat.subCategories.join(", ")}
                </TableCell>
                <TableCell className="border text-center">
                  {cat.childCategories.join(", ")}
                </TableCell>
                <TableCell className="border text-center">
                  {cat.color}
                </TableCell>
                <TableCell className="border text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cat.id)}
                      className="flex items-center gap-1">
                      <Pen size={16} /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cat.id)}
                      className="flex items-center gap-1">
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
