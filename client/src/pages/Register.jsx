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
import { postData } from "@/utils/PostData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postData("/api/user/register", formData);

      if (!res.success) {
        // backend থেকে আসা error message
        toast.error(res.message);
      } else {
        // backend থেকে আসা success message
        toast.success(res.message);

        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.name);

        setFormData({ name: "", email: "", password: "" });
        navigate("/user/verify-otp");
      }
    } catch (error) {
      toast.error("Failed to Post Data on Backend");
    } finally {
      setLoading(false);
    }
  };

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
      className="flex  items-center justify-center h-screen ">
      <Card className="w-full max-w-sm border-slate-300 text-black shadow-shadow border-2 shadow-md">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription className="text-black">
            Enter your Name, email, Password below to Create your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/user/login" className="text-black">
                Login
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col placeholder:text-black gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password!"
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                variant="modern"
                disabled={loading ? "disabled" : ""}
                className="w-full flex items-center justify-center mt-4 rounded-md">
                {loading ? <Loader /> : " "}
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <GoogleLoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}
