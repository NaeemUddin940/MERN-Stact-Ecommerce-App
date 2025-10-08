import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { putData } from "@/utils/PutData";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("forgotEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email) {
        toast.error("Email not found. Please try resetting again.");
        setLoading(false);
        return;
      }
      console.log(formData);
      const res = await putData("/api/user/change-password", formData);

      console.log("Response:", res);

      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
        localStorage.removeItem("forgotEmail"); // optional
        navigate("/user/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("❌ Error while resetting password:", error);
      toast.error("Internal error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

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
      <form onSubmit={formSubmit}>
        <Card className="w-md border-slate-300 text-black shadow-shadow border-2 shadow-lg">
          <CardContent>
            <CardHeader className="px-0">
              <h2 className="text-2xl font-bold text-white">
                Set New Password.
              </h2>
              <p className="text-left mb-5 text-white">
                Your new password must different to previos password
              </p>
            </CardHeader>
            <div className="flex flex-col gap-6 text-white">
              {/* New Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="new-password">New Password</Label>
                </div>

                <div className="relative">
                  <Input
                    id="new-password"
                    name="newPassword"
                    value={formData.newPassword}
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter Your New Password.."
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300">
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>

                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Your Confirm Password.."
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300">
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              variant="modern"
              className="w-full rounded-md">
              {loading ? "Password is Changing...." : "Change Password"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
