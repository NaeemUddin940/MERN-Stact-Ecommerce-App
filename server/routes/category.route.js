import { Router } from "express";
import {
  createChildCategory,
  createMainCategories,
  createSubCategory,
  getAllCategories,
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

categoryRoute.get("/get-all-category", authenticated, getAllCategories);

export default categoryRoute;
