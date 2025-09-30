import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "react-toastify";

export default function VerifyOTP({sendOTP, OTPVerify}) {
 
  return (
    <div className="flex mt-5 items-center justify-center">
      <div className="bg-background flex items-center justify-center border-1 border-slate-700 p-5 rounded-2xl shadow-shadow shadow-lg">
        <div>
          <div className="flex flex-col space-y-3 mb-3 items-center justify-center">
            {/* ✅ Use public folder image */}
            <img className="h-40 w-40" src="/shield.png" alt="Shield" />

            <h3 className="text-xl font-bold">Verify OTP</h3>
            <p>
              OTP send to{" "}
              <span className="text-chart-1">mdnaeemuddin14@gmail.com</span>
            </p>
            <InputOTP maxLength={6}>
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
  );
}
