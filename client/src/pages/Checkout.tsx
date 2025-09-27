import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
      {/* Left Side - Billing & Shipping */}
      <div className="lg:col-span-2 space-y-6">
        {/* Billing Info */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+8801..." />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Dhaka" />
            </div>
            <div>
              <Label htmlFor="zip">ZIP / Postal</Label>
              <Input id="zip" placeholder="1207" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Bangladesh" />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="cod">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit / Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bkash" id="bkash" />
                <Label htmlFor="bkash">bKash / Mobile Payment</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <img
                  className="h-15 w-15 border-1 rounded-sm"
                  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/122-small_default/hummingbird-notebook.jpg"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <span className="truncate">This is a watch skimeis </span>
                  <span>Qty : 1</span>
                </div>
              </div>
              <span>$50</span>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <img
                  className="h-15 w-15 border-1 rounded-sm"
                  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/122-small_default/hummingbird-notebook.jpg"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <span className="truncate">This is a watch skimeis </span>
                  <span>Qty : 1</span>
                </div>
              </div>
              <span>$50</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Subtotal</span>
              <span>$80</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$85</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="modern" className="w-full">
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
