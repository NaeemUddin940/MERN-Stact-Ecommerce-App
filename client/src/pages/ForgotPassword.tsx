import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  return (
    <div
      style={{
        backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
      `,
      }}
      className="h-screen w-full flex items-center justify-center">
      <Card className="w-md border-slate-300 text-black shadow-shadow border-2 shadow-lg">
        <CardContent>
          <CardHeader className="px-0">
            <h2 className="text-2xl font-bold ">Set New Password.</h2>
            <p className="text-left mb-5">
              Your new password must different to previos password
            </p>
          </CardHeader>
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
          <Button variant="modern" className="w-full rounded-md">
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
