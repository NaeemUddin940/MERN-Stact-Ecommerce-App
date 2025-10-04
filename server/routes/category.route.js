import { Router } from "express";
import { categoryImageUploader } from "../controllers/category.controller.js";
import { authenticated } from "../middlewares/authenticated.js";
import upload from "../middlewares/multer.js";

const categoryRoute = Router();

categoryRoute.post(
  "/cateogry-image-upload",
  authenticated,
  upload.single("image"),
  categoryImageUploader
);

export default categoryRoute;
