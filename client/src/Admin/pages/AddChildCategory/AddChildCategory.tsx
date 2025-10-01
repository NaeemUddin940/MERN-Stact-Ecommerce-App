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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ChildCategory {
  id: number;
  parentSubCategory: string;
  name: string;
  color: string;
}

export default function AddChildCategory() {
  const [parentSubCategory, setParentSubCategory] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Add / Update
  const handleSubmit = () => {
    if (!parentSubCategory || !name) return;

    if (editId !== null) {
      const updated = childCategories.map((child) =>
        child.id === editId
          ? { id: editId, parentSubCategory, name, color }
          : child
      );
      setChildCategories(updated);
      setEditId(null);
    } else {
      setChildCategories([
        ...childCategories,
        { id: Date.now(), parentSubCategory, name, color },
      ]);
    }

    // reset form
    setParentSubCategory("");
    setName("");
    setColor("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setChildCategories(childCategories.filter((child) => child.id !== id));
  };

  // Edit
  const handleEdit = (child: ChildCategory) => {
    setParentSubCategory(child.parentSubCategory);
    setName(child.name);
    setColor(child.color);
    setEditId(child.id);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Add Child Category</h2>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 w-full">
        {/* Parent Sub Category */}
        <div>
          <Label htmlFor="parent-sub-category" className="mb-2 block">
            Parent Sub Category
          </Label>
          <Select
            value={parentSubCategory}
            onValueChange={setParentSubCategory}>
            <SelectTrigger className="w-full border rounded-md p-2">
              <SelectValue placeholder="-- Select Sub Category --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Living Room">Living Room</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Men Clothing">Men Clothing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Child Category Name */}
        <div>
          <Label htmlFor="child-category-name" className="mb-2 block">
            Child Category Name
          </Label>
          <Input
            id="child-category-name"
            placeholder="Enter child category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="mt-5 w-full">
          <Button onClick={handleSubmit} className="w-full">
            <Plus className="mr-2 h-5 w-5" />
            {editId ? "Update Child Category" : "Add Child Category"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* TABLE */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">Child Category List</h3>
        <Table className="border w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="border text-center">Sub Category</TableHead>
              <TableHead className="border text-center">
                Child Category
              </TableHead>

              <TableHead className="border text-center w-[200px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {childCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No Child Categories added
                </TableCell>
              </TableRow>
            ) : (
              childCategories.map((child) => (
                <TableRow key={child.id}>
                  <TableCell className="border text-center">
                    {child.parentSubCategory}
                  </TableCell>
                  <TableCell className="border text-center">
                    {child.name}
                  </TableCell>

                  <TableCell className="border text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(child)}
                        className="p-2 rounded-md ">
                        <Pen size={18} /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(child.id)}
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
