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
    },
    image: {
      type: String,
      default: null,
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      default: null,
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
