import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      default:"",
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const mainCategory = mongoose.model("category", categorySchema);
export default mainCategory;
