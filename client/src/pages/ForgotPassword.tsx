import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex  items-center justify-center my-10">
      <Card className="w-full max-w-sm border-slate-300 shadow-shadow border-2 shadow-md">
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">New Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your New Password.."
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your Confirm Password.."
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="modern" className="w-full">
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
