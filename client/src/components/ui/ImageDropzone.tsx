import { Image } from "lucide-react";

export default function ImageDropzone({ multiple, handleChange }) {
  return (
    <div className="p-3 rounded-md overflow-hidden border border-dashed border-input h-[150px] w-[170px] bg-card cursor-pointer hover:bg-accent flex items-center justify-center flex-col relative">
      <Image />
      <h4 className="text-[14px] pointer-events-none"> Image Upload</h4>
      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
        className="absolute top-0 left-0 h-full w-full z-50 opacity-0"
      />
    </div>
  );
}
