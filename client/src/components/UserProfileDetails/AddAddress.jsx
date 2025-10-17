import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { postData } from "@/utils/PostData";
import { getData } from "@/utils/GetData";
import { Trash2 } from "lucide-react";
import { DeleteData } from "@/utils/DeleteData";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [getAddress, setGetAddress] = useState([]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch addresses from DB
  const fetchAddresses = async () => {
    try {
      const res = await getData("/api/user/get-address");
      if (res.success) {
        setGetAddress(res.address);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAddresses();

    if (
      !address.fullname ||
      !address.phone ||
      !address.address_line1 ||
      !address.city ||
      !address.postalCode ||
      !address.country ||
      !address.state
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    const res = await postData("/api/user/add-address", address);
    if (res.success) {
      toast.success(res.message);
      setGetAddress((prev) => [...prev, res.newAddress || address]);
      // Reset form
      setAddress({
        fullname: "",
        phone: "",
        email: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    } else {
      toast.error(res.message);
    }
  };

  // Delete address
  const handleDelete = async (id) => {
    const res = await DeleteData(`/api/user/delete-address/${id}`);
    if (res.success) {
      toast.success(res.message);
      setGetAddress((prev) => prev.filter((item) => item._id !== id));
    } else {
      toast.error(res.message);
    }
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
                name="fullname"
                value={address.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm sm:text-base">
                Phone Number *
              </Label>

              <div className="mt-1">
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="+8801000000xxxx"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
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
                name="address_line1"
                value={address.address_line1}
                onChange={handleChange}
                placeholder="House, Road, Area"
                className="mt-1"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <Label className="text-sm sm:text-base">Address Line 2</Label>
              <Input
                name="address_line2"
                value={address.address_line2}
                onChange={handleChange}
                placeholder="Apartment, Building (optional)"
                className="mt-1"
              />
            </div>
          </div>

          {/* City, State */}
          <div className="lg:grid lg:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-5 text-base sm:text-lg py-2 sm:py-3">
            Save Address
          </Button>
        </form>

        <div>
          {getAddress.map((getAddress, index) => (
            <Card key={index} className="p-4 shadow-sm mt-4 bg-chart-1">
              <CardContent className="flex text-sm items-center justify-between">
                <div className="pr-3">
                  <Input
                    type="radio"
                    name="selectedAddress"
                    value={index}
                    id={`address-${index}`}
                    className="mt-1 w-5 cursor-pointer"
                  />
                </div>
                <p>{getAddress.phone}</p>,<p>{getAddress.address_line1}</p>,
                {getAddress.address_line2 && <p>{getAddress.address_line2}</p>},
                <p>{getAddress.city}</p>,<p> {getAddress.state}</p>,
                <p>{getAddress.postalCode}</p>
                <p>{getAddress.country}</p>
                <Trash2
                  onClick={() => handleDelete(getAddress._id)}
                  className="cursor-pointer ml-4 hover:text-red-500 hover:bg-black hover:rounded-full p-1"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddAddress;
