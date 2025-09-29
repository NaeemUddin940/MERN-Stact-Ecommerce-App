// components/DashboardWelcome.tsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function DashboardWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `
        radial-gradient(ellipse 80% 60% at 70% 20%, rgba(175, 109, 255, 0.85), transparent 68%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.75), transparent 68%),
        radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.98), transparent 68%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.3), transparent 68%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 80%)
      `,
      }}
      className="w-full rounded-xl border bg-card shadow-sm  gap-6">
      {/* Left Section */}

      <div className="flex flex-col md:flex-row mx-6 items-center justify-between">
        <div className="flex flex-col py-5 items-start text-center md:text-left space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Good Morning,{" "}
            <span className="text-primary">MD. NAEEM UDDIN 👋</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            Here’s what’s happening on your store today. See the statistics at
            once.
          </p>
          <Button
            variant="modern"
            className="flex rounded-sm items-center mt-5 gap-2">
            <ShoppingBag className="w-5 h-5" />
            Add Product
          </Button>
        </div>

        {/* Right Section (Image/Illustration) */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src="/shop-illustration.png"
            alt="Dashboard illustration"
            className="w-[300px] max-w-sm"
          />
        </div>
      </div>
    </motion.div>
  );
}
