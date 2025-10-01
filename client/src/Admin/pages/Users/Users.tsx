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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Pen, Trash2, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?u=john",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/100?u=jane",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Add or Update User
  const handleSubmit = () => {
    if (!name || !email || !role || !status) return;

    if (editId) {
      setUsers(
        users.map((u) =>
          u.id === editId
            ? { id: editId, name, email, role, status, avatar }
            : u
        )
      );
      setEditId(null);
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name,
          email,
          role,
          status,
          avatar: avatar || `https://i.pravatar.cc/100?u=${name}`,
        },
      ]);
    }

    setName("");
    setEmail("");
    setRole("");
    setStatus("");
    setAvatar("");
  };

  // Delete User
  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // Edit User
  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setAvatar(user.avatar || "");
    setEditId(user.id);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Manage Users</h2>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        <div>
          <Label htmlFor="name-input" className="mb-3">
            Name
          </Label>
          <Input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label htmlFor="email-input" className="mb-3">
            Email
          </Label>
          <Input
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <Label htmlFor="role-select" className="mb-3">
            Role
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger
              id="role-select"
              className="w-full border rounded-md p-2">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status-select" className="mb-3">
            Status
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              id="status-select"
              className="w-full border rounded-md p-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="avatar-input" className="mb-3">
            Upload Avatar (optional)
          </Label>
          <Input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAvatar(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <div className="mt-4 col-span-full">
          <Button onClick={handleSubmit} className="w-full">
            <Plus className="mr-2 h-5 w-5" />
            {editId ? "Update User" : "Add User"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* TABLE */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">User List</h3>
        <Table className="border w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="border text-center">Avatar</TableHead>
              <TableHead className="border text-center">Name</TableHead>
              <TableHead className="border text-center">Email</TableHead>
              <TableHead className="border text-center">Role</TableHead>
              <TableHead className="border text-center">Status</TableHead>
              <TableHead className="border text-center w-[200px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No Users Found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="border text-center">
                    <Avatar className="mx-auto">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="border text-center">
                    {user.name}
                  </TableCell>
                  <TableCell className="border text-center">
                    {user.email}
                  </TableCell>
                  <TableCell className="border text-center">
                    {user.role}
                  </TableCell>
                  <TableCell className="border text-center">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      )}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="border text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        className="p-2 rounded-md "
                        onClick={() => handleEdit(user)}>
                        <Pen size={16} /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="p-2 rounded-md "
                        onClick={() => handleDelete(user.id)}>
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
    </div>
  );
}
