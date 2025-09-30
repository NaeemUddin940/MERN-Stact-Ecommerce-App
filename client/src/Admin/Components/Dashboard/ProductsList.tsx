"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddProduct from "@/Admin/Components/Products/AddProducts";

const products = [
  {
    id: 1,
    name: "Tasty Metal Shirt",
    category: "Books",
    subcategory: "Fiction",
    stock: 30,
    price: 410,
    rating: 3.5,
    reviews: 14,
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Modern Gloves",
    category: "Kids",
    subcategory: "Clothing",
    stock: 0,
    price: 340,
    rating: 4.5,
    reviews: 9,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Rustic Steel Computer",
    category: "Games",
    subcategory: "Consoles",
    stock: 50,
    price: 948,
    rating: 3.8,
    reviews: 19,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=60",
  },
];

export default function ProductsList() {
  const [selected, setSelected] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const allSelected = selected.length === products.length;
  const isIndeterminate =
    selected.length > 0 && selected.length < products.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.id));
    }
  };

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Category,Subcategory,Price,Stock,Rating,Reviews,Status"]
        .concat(
          products.map(
            (p) =>
              `${p.name},${p.category},${p.subcategory},${p.price},${p.stock},${p.rating},${p.reviews},${p.status}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4 border-2 rounded-sm shadow-lg border-accent p-5 ">
      {/* Toolbar */}
      <h3 className="text-3xl font-semibold">Products List</h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Select onValueChange={setCategoryFilter} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Products
          </Button>
          <Sheet>
            <SheetTitle className="sr-only">Add Products Form</SheetTitle>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="fixed top-0">
              <AddProduct />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-md border bg-background text-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[40px] border-r">
                <Checkbox
                  checked={
                    allSelected
                      ? true
                      : isIndeterminate
                      ? "indeterminate"
                      : false
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="border-r">Product</TableHead>
              <TableHead className="border-r">Category</TableHead>
              <TableHead className="border-r">Sub Category</TableHead>
              <TableHead className="border-r">Stock</TableHead>
              <TableHead className="border-r">Price</TableHead>
              <TableHead className="border-r">Rating</TableHead>
              <TableHead className="border-r">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-b">
                <TableCell className="border-r">
                  <Checkbox
                    checked={selected.includes(product.id)}
                    onCheckedChange={() => toggleOne(product.id)}
                  />
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-md h-10 w-10 object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground border-r">
                  {product.category}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground border-r">
                  {product.subcategory}
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex flex-col">
                    <Progress
                      value={product.stock > 0 ? 100 : 0}
                      className="h-2 w-[100px]"
                    />
                    <span className="text-xs text-muted-foreground">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold border-r">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{product.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                </TableCell>
                <TableCell className="border-r">
                  <Badge
                    variant={
                      product.status === "Pending" ? "default" : "secondary"
                    }
                    className={
                      product.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : ""
                    }>
                    {product.status}
                  </Badge>
                </TableCell>
                {/* Actions */}
                <TableCell className="text-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
