import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mainCategory from "../models/mainCategory.model.js";
import subCategory from "../models/subCategory.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

//✅ Step 01 : Main Category Create And Upload Category Image Controller
export const createMainCategories = async (req, res) => {
  try {
    //  Extract data from req.body, req.params, or req.query
    const { name } = req.body;

    // Cloudinary Image upload options
    const options = {
      use_filename: true,
      uniques_filename: true,
      overwrite: false,
    };

    // Uploade Image On Cloudinary and Delete from uploads folder
    let categoryImage = "";
    await cloudinary.uploader.upload(req.file.path, options, (err, result) => {
      categoryImage = result.secure_url;
      fs.unlinkSync(`uploads/${req.file.filename}`);
    });

    // Create Main Category and Save it on MongoDb
    await mainCategory.create({
      name,
      image: categoryImage,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    });

    // Success Status and Message
    res.status(200).json({
      success: true,
      error: false,
      message: "Main Category Create Successfull.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Create Main Category!",
    });
  }
};

//✅ Step 02 : Sub Category Create Controller
export const createSubCategory = async (req, res) => {
  try {
    //  Extract data from req.body, req.params, or req.query
    const { name, mainCategoryId } = req.body;

    // Find Category By ID if not found trow error
    const category = await mainCategory.findById(mainCategoryId);
    if (!category)
      return res.status(404).json({ message: "Main category not found" });

    // Create Sub Category
    const subCategories = await subCategory.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      mainCategoryId,
    });
    res.status(201).json({ success: true, data: subCategories });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Create Sub-Category!",
    });
  }
};
