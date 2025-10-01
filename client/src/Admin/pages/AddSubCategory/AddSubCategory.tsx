"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pen, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubCategory {
  id: number;
  parentCategory: string;
  name: string;
  color: string;
}

export default function AddSubCategory() {
  const [parentCategory, setParentCategory] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Add / Update
  const handleSubmit = () => {
    if (!parentCategory || !name) return;

    if (editId !== null) {
      const updated = subCategories.map((sub) =>
        sub.id === editId ? { id: editId, parentCategory, name, color } : sub
      );
      setSubCategories(updated);
      setEditId(null);
    } else {
      setSubCategories([
        ...subCategories,
        { id: Date.now(), parentCategory, name, color },
      ]);
    }

    // reset form
    setParentCategory("");
    setName("");
    setColor("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setSubCategories(subCategories.filter((sub) => sub.id !== id));
  };

  // Edit
  const handleEdit = (sub: SubCategory) => {
    setParentCategory(sub.parentCategory);
    setName(sub.name);
    setColor(sub.color);
    setEditId(sub.id);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Add Sub Category</h2>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-full">
        {/* Parent Category */}

        <div>
          <Label htmlFor="parent-category" className="mb-2 block">
            Parent Category
          </Label>
          <Select value={parentCategory} onValueChange={setParentCategory}>
            <SelectTrigger
              id="parent-category"
              className="w-full border rounded-md p-2">
              <SelectValue placeholder="-- Select Category --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sub Category Name */}
        <div>
          <Label htmlFor="sub-category-name" className="mb-2 block">
            Sub Category Name
          </Label>
          <Input
            id="sub-category-name"
            placeholder="Enter sub category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Button */}
        <Button onClick={handleSubmit} className="w-full mt-5">
          <Plus className="mr-2 h-5 w-5" />
          {editId ? "Update Sub Category" : "Add Sub Category"}
        </Button>
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">Sub Category List</h3>
        <Table className="border w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="border text-center">
                Parent Category
              </TableHead>
              <TableHead className="border text-center">Sub Category</TableHead>

              <TableHead className="border text-center w-[200px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No Sub Categories added
                </TableCell>
              </TableRow>
            ) : (
              subCategories.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="border text-center">
                    {sub.parentCategory}
                  </TableCell>
                  <TableCell className="border text-center">
                    {sub.name}
                  </TableCell>

                  <TableCell className="border text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(sub)}
                        className="p-2 rounded-md ">
                        <Pen size={18} /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 rounded-md ">
                        <Trash2 size={18} /> Delete
                      </Button>
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
