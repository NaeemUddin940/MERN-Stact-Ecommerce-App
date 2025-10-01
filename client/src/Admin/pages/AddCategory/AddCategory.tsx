"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Pen, Trash2, Plus, Image } from "lucide-react";

interface Category {
  id: number;
  name: string;
  color: string;
  image: string;
}

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  // Add or Update Category
  const handleSubmit = () => {
    if (!name || !color || !image) return;

    if (editId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editId ? { ...cat, name, color, image } : cat
        )
      );
      setEditId(null);
    } else {
      const newCategory: Category = {
        id: Date.now(),
        name,
        color,
        image,
      };
      setCategories([...categories, newCategory]);
    }

    // reset form
    setName("");
    setColor("");
    setImage(null);
  };

  // Delete Category
  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Edit Category
  const handleEdit = (cat: Category) => {
    setEditId(cat.id);
    setName(cat.name);
    setColor(cat.color);
    setImage(cat.image);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Add Category</h2>
      <Separator />

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* LEFT SIDE - Name & Color */}
        <div className="flex flex-col gap-4 space-y-5">
          {/* Category Name */}
          <div>
            <Label htmlFor="category-name" className="mb-2 block">
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category Color */}
          <div>
            <Label htmlFor="category-color" className="mb-2 block">
              Color
            </Label>
            <Input
              id="category-color"
              type="color"
              placeholder="Enter category color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE - Image Upload + Preview */}

        <div className="flex items-center justify-center w-full">
          <div className="p-3 rounded-md overflow-hidden border border-dashed border-input h-[200px] w-[200px] bg-card cursor-pointer hover:bg-accent flex items-center justify-center flex-col relative">
            {!image && (
              <div className="flex flex-col items-center justify-center">
                <Image size={70} />
                <h4 className="text-2xl mt-5 hover:opacity-15 pointer-events-none">
                  Add Image
                </h4>
                <input
                  type="file"
                  multiple={true}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
                />
              </div>
            )}

            {image && (
              <div className="flex flex-wrap gap-2">
                <img
                  src={image}
                  alt="preview"
                  className="h-full w-full object-cover rounded-md"
                />
                <input
                  type="file"
                  multiple={true}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full space-y-4">
          <h5 className="text-sm ">
            Image must use after removing bg and use 155 x 155px / 1:1 ratio
          </h5>
          {/* Add / Update Button */}
          <Button onClick={handleSubmit} className="w-full">
            <Plus className="mr-2 h-5 w-5" />
            {editId ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table className="border border-collapse w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-center border">Image</TableHead>
              <TableHead className="text-center border">Name</TableHead>
              <TableHead className="text-center border">Color</TableHead>
              <TableHead className="text-center border">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No categories added yet
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id} className="hover:bg-muted/30">
                  <TableCell className="border text-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-16 w-24 object-cover rounded-md border"
                    />
                  </TableCell>
                  <TableCell className="border text-center">
                    {cat.name}
                  </TableCell>
                  <TableCell className="border text-center">
                    {cat.color}
                  </TableCell>
                  <TableCell className="border text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 rounded-md hover:bg-accent">
                        <Pen size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 rounded-md hover:bg-accent">
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
