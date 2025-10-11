// 📁 components/InputField.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  disabled = false,
  onChange,
  placeholder,
  required = false,
  autoComplete = "off",
}) {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ toggle logic ঠিক করা হলো
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-600 font-medium mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 rounded-md p-2 w-full`}
        />

        {/* ✅ password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
