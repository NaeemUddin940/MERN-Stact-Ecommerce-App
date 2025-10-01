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
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  function ForgotPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent form submission
    navigate("/verify-otp");
    toast.success("OTP Send");
  }

  return (
    <div
      style={{
        backgroundImage: `
        linear-gradient(180deg, 
          rgba(245,245,220,1) 0%, 
          rgba(255,223,186,0.8) 25%, 
          rgba(255,182,193,0.6) 50%, 
          rgba(147,112,219,0.7) 75%, 
          rgba(72,61,139,0.9) 100%
        ),
        radial-gradient(circle at 30% 20%, rgba(255,255,224,0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(72,61,139,0.6) 0%, transparent 70%),
        radial-gradient(circle at 50% 60%, rgba(147,112,219,0.3) 0%, transparent 60%)
      `,
      }}
      className="flex items-center  justify-center h-screen">
      <Card className="w-full max-w-sm text-black border-slate-300 shadow-shadow border-2 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Login to your account</CardTitle>
          <CardDescription className="text-black">
            Enter your email below to login to your Account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/user/sign-up" className="text-black">
                Sign Up
              </Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 w-full">
          <Button type="submit" variant="modern" className="w-full rounded-md">
            Login
          </Button>
          <GoogleLoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}
