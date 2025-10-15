import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    address_line1: {
      type: String,
      default: null,
    },
    address_line2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: "",
    },
    division: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("address", addressSchema);

export default addressModel;
