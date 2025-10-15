import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
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
    state: {
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
