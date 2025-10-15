import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const AddAddress = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !address.fullName ||
      !address.phone ||
      !address.addressLine1 ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("Address added successfully!");
    console.log("Address data:", address);
    // 👉 Here you can call API to save the address
  };

  return (
    <Card className="w-full p-2 sm:p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-semibold text-center">
          🏠 Add New Address
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Full Name */}
            <div>
              <Label className="text-sm sm:text-base">Full Name *</Label>
              <Input
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-sm sm:text-base">Phone Number *</Label>
              <Input
                name="phone"
                type="tel"
                value={address.phone}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="text-sm sm:text-base">Email</Label>
              <Input
                name="email"
                type="email"
                value={address.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address Line 1 */}
            <div>
              <Label className="text-sm sm:text-base">Address Line 1 *</Label>
              <Input
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleChange}
                placeholder="House, Road, Area"
                className="mt-1"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <Label className="text-sm sm:text-base">Address Line 2</Label>
              <Input
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleChange}
                placeholder="Apartment, Building (optional)"
                className="mt-1"
              />
            </div>
          </div>

          {/* City, State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-sm sm:text-base">City *</Label>
              <Input
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="Dhaka"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">State/Division</Label>
              <Input
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="Dhaka Division"
                className="mt-1"
              />
            </div>
          </div>

          {/* Postal Code, Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-sm sm:text-base">Postal Code *</Label>
              <Input
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                placeholder="1207"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-base">Country *</Label>
              <Input
                name="country"
                value={address.country}
                onChange={handleChange}
                placeholder="Bangladesh"
                className="mt-1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-5 text-base sm:text-lg py-2 sm:py-3">
            Save Address
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAddress;
