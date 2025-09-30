"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  sales: number;
  stock: number; // numeric stock
  image: string;
}

const initialProducts: Product[] = [
  {
    id: "P001",
    title: "Apple iPhone 15",
    category: "Electronics",
    price: 1200,
    quantity: 50,
    sales: 30,
    stock: 23,
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "P002",
    title: "Nike Sneakers",
    category: "Fashion",
    price: 150,
    quantity: 100,
    sales: 70,
    stock: 56,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "P003",
    title: "Samsung TV",
    category: "Electronics",
    price: 800,
    quantity: 20,
    sales: 15,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=60",
  },
];

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // filters
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filteredProducts = products.filter((p) => {
    return (
      (categoryFilter === "all" ? true : p.category === categoryFilter) &&
      (statusFilter === "all"
        ? true
        : statusFilter === "In Stock"
        ? p.stock > 0
        : p.stock === 0) &&
      (minPrice !== "" ? p.price >= minPrice : true) &&
      (maxPrice !== "" ? p.price <= maxPrice : true)
    );
  });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `P${Math.floor(Math.random() * 1000)}`,
      title: "New Product",
      category: "Misc",
      price: 0,
      quantity: 0,
      sales: 0,
      stock: 10,
      image: "/images/default.png",
    };
    setProducts([...products, newProduct]);
  };

  const handleExportProducts = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Title,Category,Price,Quantity,Sales,Stock"]
        .concat(
          products.map(
            (p) =>
              `${p.id},${p.title},${p.category},${p.price},${p.quantity},${p.sales},${p.stock}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Product Listing</h1>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={handleExportProducts}>
            Export Products
          </Button>
          <Button size="sm" onClick={handleAddProduct}>
            <Plus />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Category</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Misc">Misc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Min Price</label>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Max Price</label>
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col mt-6">
          <Button
            onClick={() => {
              setCategoryFilter("all"),
                setStatusFilter("all"),
                setMaxPrice(""),
                setMinPrice("");
            }}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-md border bg-background text-foreground shadow-sm">
        <Table className="min-w-[700px] text-xs sm:text-sm">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="font-semibold">Image</TableHead>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Sales</TableHead>
              <TableHead className="font-semibold">Stock</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/50">
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded border"
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell className="max-w-[150px] truncate">
                  {product.title}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Progress
                      value={product.stock > 0 ? product.stock : 0}
                      className="h-2 w-full sm:w-[100px]"
                    />
                    <span className="text-xs text-muted-foreground">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>
                </TableCell>
                {/* Actions Button */}
                <TableCell className="space-x-2">
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
