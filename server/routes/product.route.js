import { Router } from "express";
import {
  createProducts,
  getAllProducts,
} from "../controllers/products.controller.js";
import { authenticated } from "../middlewares/authenticated.js";
import upload from "../middlewares/multer.js";

const productRoute = Router();

// Create Product with Image
productRoute.post(
  "/create-product",
  authenticated,
  upload.array("productimages"),
  createProducts
);

productRoute.get("/get-all-products", authenticated, getAllProducts);

export default productRoute;
