import { ArrowButton } from "@/components/ui/ArrowButton";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminSignUp() {
  const navigate = useNavigate();

  function ForgotPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent form submission
    navigate("/admin/verify-otp");
    toast.success("OTP Send");
  }

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Prismatic Aurora Burst - Multi-layered Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
        }}>
        <div className="bg-[#bbb5b53d] backdrop-blur-sm py-2">
          <div className="flex items-center justify-between px-10">
            <img
              src="/PollenPop.png"
              className="h-16 w-16"
              alt="PollenPop Logo"
            />

            <div className="flex items-center gap-5">
              <Link to="/admin/login">
                <ArrowButton>Login</ArrowButton>
              </Link>
              <Link to="/admin/sign-up">
                <ArrowButton>Sign Up</ArrowButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center h-[90%]">
          <Card className="w-md border-slate-300 shadow-shadow border-2 shadow-md">
            <CardHeader>
              <CardTitle>Sign Up to your Dashboard</CardTitle>
              <CardDescription>
                Enter your email below to login to your Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  {/* Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="MD. NAEEM UDDIN"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mdnaeemuddin14@gmail.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <button
                        onClick={ForgotPassword}
                        type="button"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2 w-full">
              <Button type="submit" variant="modern" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
