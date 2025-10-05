import { Router } from "express";
import {
  createChildCategory,
  createMainCategory,
  createSubCategory,
  deleteChildCategory,
  deleteMainCategory,
  deleteSubCategory,
  getAllCategories,
  getChildCategoryCount,
  getMainCategoryCount,
  getSubCategoryCount,
  updateMainCategory,
  updateSubCategory,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.js";
import { authenticated } from "../middlewares/authenticated.js";

const categoryRoute = Router();

// Create Main Category and Upload Image
categoryRoute.post(
  "/create-main-category",
  authenticated,
  upload.single("image"),
  createMainCategory
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

// Delete Main Category
categoryRoute.delete(
  "/delete-main-category/:id",
  authenticated,
  deleteMainCategory
);

// Delete Sub Category
categoryRoute.delete(
  "/delete-sub-category/:id",
  authenticated,
  deleteSubCategory
);

// Delete Child Category
categoryRoute.delete(
  "/delete-child-category/:id",
  authenticated,
  deleteChildCategory
);

// Update Main Category
categoryRoute.put(
  "/update-main-category/:id",
  authenticated,
  updateMainCategory
);

// Update Sub Category
categoryRoute.put("/update-sub-category/:id", authenticated, updateSubCategory);

export default categoryRoute;
