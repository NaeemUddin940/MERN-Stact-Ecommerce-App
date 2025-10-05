import { Router } from "express";
import {
  createChildCategory,
  createMainCategories,
  createSubCategory,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.js";
import { authenticated } from "../middlewares/authenticated.js";

const categoryRoute = Router();

categoryRoute.post(
  "/create-main-category",
  authenticated,
  upload.single("image"),
  createMainCategories
);

categoryRoute.post("/create-sub-category", authenticated, createSubCategory);
categoryRoute.post(
  "/create-child-category",
  authenticated,
  createChildCategory
);

export default categoryRoute;
