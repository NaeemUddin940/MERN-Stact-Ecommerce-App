import { Router } from "express";
import {
  createChildCategory,
  createMainCategories,
  createSubCategory,
  getAllCategories,
  getChildCategoryCount,
  getMainCategoryCount,
  getSubCategoryCount,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.js";
import { authenticated } from "../middlewares/authenticated.js";

const categoryRoute = Router();

// Create Main Category and Upload Image
categoryRoute.post(
  "/create-main-category",
  authenticated,
  upload.single("image"),
  createMainCategories
);

// Create Sub Category
categoryRoute.post("/create-sub-category", authenticated, createSubCategory);

// Create Child Category
categoryRoute.post(
  "/create-child-category",
  authenticated,
  createChildCategory
);

// Get All Category
categoryRoute.get("/get-all-category", authenticated, getAllCategories);

// Get Main Category Count
categoryRoute.get(
  "/get-main-category-count",
  authenticated,
  getMainCategoryCount
);

// Get Sub Category Count
categoryRoute.get(
  "/get-sub-category-count",
  authenticated,
  getSubCategoryCount
);

// Get Child Categroy Count
categoryRoute.get(
  "/get-child-category-count",
  authenticated,
  getChildCategoryCount
);

export default categoryRoute;
