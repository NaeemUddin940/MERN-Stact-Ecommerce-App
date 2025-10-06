import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    mainCatId: {
      type: String,
      default: "",
    },
    mainCatName: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    subCatName: {
      type: String,
      default: "",
    },
    childCatId: {
      type: String,
      default: "",
    },
    childCatName: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    inStockCount: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isLatest: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
    },
    size: [{ type: String }, { default: null }],
    ram: [{ type: String }, { default: null }],
    storage: [{ type: String }, { default: null }],
    weight: [{ type: String }, { default: null }],
  },
  { timestamps: true }
);

const productsCollection = mongoose.model("products", productSchema);
export default productsCollection;
