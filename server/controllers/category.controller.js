import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mainCategory from "../models/mainCategory.model.js";
import subCategory from "../models/subCategory.model.js";
import childCategory from "../models/childCategory.model.js";

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
    const categories = await mainCategory.create({
      name,
      image: categoryImage,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    });

    // Success Status and Message
    res.status(200).json({
      success: true,
      error: false,
      mainCategory: categories,
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
    res.status(201).json({
      success: true,
      error: false,
      message: "Successfull to Create Sub Category ",
      data: subCategories,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Create Sub-Category!",
    });
  }
};

//✅ Step 03 : Sub Category Create Controller
export const createChildCategory = async (req, res) => {
  try {
    // 1. Extract data from req.body, req.params, or req.query
    const { name, subCategoryId } = req.body;

    // 2. Perform DB operations or business logic
    const subCategories = await subCategory.findById(subCategoryId);

    if (!subCategories) {
      return res.status(404).json({
        message: "Sub Category Not Found!",
        error: true,
        success: false,
      });
    }

    const childCategories = await childCategory.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      subCategoryId,
    });

    // 3. Send success response
    return res.status(201).json({
      success: true,
      error: false,
      message: "Successfull to Create Child Category.",
      childCategory: childCategories,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Create Child Category!",
    });
  }
};

// ✅ Step 04 : Import করা model গুলোর ওপর ভিত্তি করে সব Main Category, SubCategory এবং Child Category একসাথে এনে nested আকারে পাঠানোর function
export const getAllCategories = async (req, res) => {
  try {
    // 🔹 Step 1: সব Main Category খুঁজে বের করা (lean() ব্যবহার করলে mongoose document না, plain JS object ফেরত দেয়)
    const categories = await mainCategory.find().lean();

    // 🔹 Step 2: প্রতিটি Main Category-এর জন্য SubCategory গুলো খুঁজে বের করা
    const result = await Promise.all(
      categories.map(async (cat) => {
        // 🟢 SubCategory গুলো বের করা যেগুলোর mainCategoryId বর্তমান cat._id এর সমান
        const subCats = await subCategory
          .find({ mainCategoryId: cat._id })
          .lean();

        // 🔹 Step 3: প্রতিটি SubCategory-এর জন্য Child Category গুলো বের করা
        const subWithChild = await Promise.all(
          subCats.map(async (sub) => {
            // 🟡 Child Category খুঁজে বের করা যেগুলোর subCategoryId বর্তমান sub._id এর সমান
            const childCats = await childCategory
              .find({
                subCategoryId: sub._id,
              })
              .lean();

            // 🧩 SubCategory object এর সাথে তার Child Category গুলো merge করে ফেরত দিচ্ছি
            return { ...sub, childCategories: childCats };
          })
        );

        // 🧩 Main Category object এর সাথে তার SubCategory ও SubCategory এর মধ্যে Child Category গুলো merge করছি
        return { ...cat, subCategories: subWithChild };
      })
    );

    // ✅ সবকিছু সফলভাবে হলে success response পাঠানো হচ্ছে
    return res.status(200).json({
      success: true,
      error: false,
      message: "Successfull to Get All Category.",
      data: result,
    });
  } catch (error) {
    // ❌ কোনো error হলে catch এ এসে error message পাঠানো হচ্ছে
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get All Category.",
    });
  }
};
