import Loader from "@/components/Loader/Loader";
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
import { useAuthContext } from "@/context/AuthContext";
import { postData } from "@/utils/PostData";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState({ email: "" });

  // handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function forgotEmailChange(e) {
    const { name, value } = e.target;
    setForgotEmail({ ...forgotEmail, [name]: value });
  }
  console.log(forgotEmail);
  // login form submit
  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postData("/api/user/login", formData, {
        credentials: "include", // 🔥 cookie support
      });

      if (res.success) {
        setIsLogin(true);
        toast.success(res.message);
        setFormData({ email: "", password: "" });
        navigate("/"); // redirect after login
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to send data");
    } finally {
      setLoading(false);
    }
  }

  // forgot password handler
  async function ForgotPassword(e) {
    e.preventDefault();
    console.log("object");
    if (forgotEmail.email === "") {
      toast.error("Please Enter Your Email.");
      return;
    }

    try {
      console.log(forgotEmail);
      const res = await postData("/api/user/forgot-password", forgotEmail);
      if (res.success) {
        toast.success(`OTP Send to ${forgotEmail.email}`);
        localStorage.setItem("forgotEmail", forgotEmail.email);
        navigate("/user/verify-otp");
      } else {
        toast.error(`Failed to send OTP ${forgotEmail.email}`);
      }
    } catch (error) {
      console.error("Failed to Send Your Email.");
    }
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
      className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm text-black border-slate-300 border-2 shadow-md">
        <form onSubmit={submitForm}>
          <CardHeader>
            <CardTitle className="text-lg">Login to your account</CardTitle>
            <CardDescription className="text-black">
              Enter your email and password to login
            </CardDescription>
            <CardAction>
              <Button variant="link">
                <Link to="/user/register" className="text-black">
                  Sign Up
                </Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email || forgotEmail.email}
                  onChange={(e) => {
                    handleChange(e), forgotEmailChange(e);
                  }}
                  placeholder="example@gmail.com"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    onClick={ForgotPassword}
                    type="button"
                    className="ml-auto text-sm underline hover:underline-offset-4">
                    Forgot your password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4 mt-7 w-full">
            <Button
              type="submit"
              variant="modern"
              disabled={loading}
              className="w-full rounded-md flex items-center justify-center gap-2">
              {loading && <Loader />}
              Login
            </Button>
            <GoogleLoginButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
