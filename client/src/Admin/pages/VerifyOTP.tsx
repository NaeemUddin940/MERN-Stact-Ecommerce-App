import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import shield from "/shield.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function AdminVerifyOTP() {
  function sendOTP() {
    toast.success("OTP Send");
  }

  function OTPVerify() {
    toast.success("OTP Verify Successfull.");
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
        <div className="flex mt-20 items-center justify-center">
          <div className="backdrop-blur-2xl flex items-center justify-center border-1 p-5 rounded-2xl ">
            <div className="w-md ">
              <div className="flex flex-col space-y-3 mb-3 items-center justify-center">
                <img className="h-40 w-40" src={shield} alt="" />

                <h3 className="text-xl font-bold">Verify OTP</h3>
                <p>
                  OTP send to{" "}
                  <span className="text-chart-1">mdnaeemuddin14@gmail.com</span>
                </p>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="text-white" />
                    <InputOTPSlot index={1} className="text-white" />
                    <InputOTPSlot index={2} className="text-white" />
                    <InputOTPSlot index={3} className="text-white" />
                    <InputOTPSlot index={4} className="text-white" />
                    <InputOTPSlot index={5} className="text-white" />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  className="cursor-pointer hover:text-chart-4 text-white"
                  onClick={sendOTP}>
                  Send Again
                </button>
              </div>
              <Button
                onClick={OTPVerify}
                className="mt-3 rounded-2xl w-full"
                variant="modern">
                Verify OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
