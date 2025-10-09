import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import shield from "/shield.png";
import { toast } from "react-toastify";
import { useState } from "react";
import { postData } from "@/utils/PostData";
import Loader from "@/components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSentOtp, setIsSentOtp] = useState(false);

  const navigate = useNavigate();

  const handleOTPComplete = async (value) => {
    setOtpValue(value);
  };

  const email = localStorage.getItem("userEmail");
  const forgotEmail = localStorage.getItem("forgotEmail");

  // Verify Registered Email
  async function OTPVerify() {
    try {
      setLoading(true);

      const res = await postData("/api/user/verifyEmail", {
        email: email || forgotEmail,
        otp: otpValue,
      });
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem("userEmail");
        if (forgotEmail && !email) {
          navigate("/user/forgot-password");
        } else {
          navigate("/user/login");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to Verify Email.");
    } finally {
      setLoading(false);
    }
  }

  // Send Again OTP
  async function sendOTP() {
    try {
      setIsSentOtp(true);

      const res = await postData("/api/user/send-again-otp", {
        name: localStorage.getItem("userName"),
        email: email || localStorage.getItem("forgotEmail"),
      });
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem("forgotEmail");
        setIsSentOtp(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Failed to Send OTP.");
    } finally {
      setIsSentOtp(false);
    }
  }

  // // Verify Forgot Email
  // async function VerifyForgotEmail() {
  //   try {
  //     const res = await postData("/api/user/verify-forgot-password-otp", {
  //       email: localStorage.getItem("forgotEmail"),
  //       otp: otpValue,
  //     });
  //     if (res.success) {
  //       toast.success(res.message);
  //       localStorage.removeItem("forgotEmail");
  //       navigate("/user/forgot-password");
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (error) {
  //     toast.error("Falied to Verify");
  //   }
  // }

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
      className="flex items-center h-screen justify-center">
      <div className="backdrop-blur-3xl flex items-center justify-center border-1 border-slate-700 p-5 rounded-2xl shadow-shadow shadow-lg">
        <div>
          <div className="flex flex-col space-y-3 mb-3 items-center justify-center">
            <img className="h-40 w-40" src={shield} alt="" />

            <h3 className="text-xl font-bold">Verify OTP</h3>
            <p>
              OTP send to{" "}
              <span className="text-[#8b14e7]">
                {email || localStorage.getItem("forgotEmail")}
              </span>
            </p>
            <InputOTP maxLength={6} onComplete={handleOTPComplete}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <button
              className="cursor-pointer hover:text-chart-4"
              onClick={sendOTP}>
              {isSentOtp ? "Sending...." : "Send Again"}
            </button>
          </div>
          <Button
            onClick={OTPVerify}
            className="mt-3 rounded-2xl w-full"
            variant="modern">
            {loading ? <Loader /> : null}
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
}
