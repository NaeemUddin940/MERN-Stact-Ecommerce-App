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
export const createMainCategory = async (req, res) => {
  try {
    //  Extract data from req.body, req.params, or req.query
    const { name } = req.body;

    const mainCategories = await mainCategory.find();
    for (let i = 0; i < mainCategories.length; i++) {
      if (mainCategories[i].name === name) {
        return res.status(400).json({
          message: `This ${name} Category Already Exist in Databse.`,
          error: true,
          success: false,
        });
      }
    }

    if (mainCategories.slug === name.toLowerCase().replace(/\s+/g, "-")) {
      return res.status(400).json({
        message: "Main Category Already Exist With This Name.",
      });
    }

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
      message: `Successfull to Create ${name} Main Category`,
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

    const isExistSubCategories = await subCategory.find();
    for (let i = 0; i < isExistSubCategories.length; i++) {
      if (isExistSubCategories[i].name === name) {
        return res.status(400).json({
          message: `This ${name} Category Exist in Databse.`,
          error: true,
          success: false,
        });
      }
    }

    // Create Sub Category
    const subCategories = await subCategory.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      mainCategoryId,
    });

    res.status(201).json({
      success: true,
      error: false,
      message: `Successfull to Create ${name} Sub Category`,
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
    const isChildCategoriesExist = await childCategory.find();
    for (let i = 0; i < isChildCategoriesExist.length; i++) {
      if (isChildCategoriesExist[i].name === name) {
        return res.status(400).json({
          message: `This ${name} Category Exist in Databse.`,
          error: true,
          success: false,
        });
      }
    }

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
      message: `Successfull to Create ${name} Child Category`,
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

// ✅ Step 04 : Finally get all categories
export const getAllCategories = async (req, res) => {
  try {
    // Main and sub and Child Category get from Database
    const mainCategories = await mainCategory.find().lean();
    const subCategories = await subCategory.find().lean();
    const childCategories = await childCategory.find().lean();

    // Make Nested like MainCategory => SubCategory => ChildCategory
    const getAllCategories = mainCategories.map((mainCat) => {
      // Filter Sub Category using mainCategoryId
      const matchedSubCategory = subCategories.filter(
        (subCat) => String(subCat.mainCategoryId) === String(mainCat._id)
      );

      // 🟢 প্রতিটি subCategory এর childCategories filter করা
      const subWithChild = matchedSubCategory.map((subCat) => {
        const matchChildCategory = childCategories.filter(
          (childCat) => String(childCat.subCategoryId) === String(subCat._id)
        );
        return { ...subCat, childCategories: matchChildCategory };
      });

      // 🟢 mainCategory object এর সাথে nested subCategory ও childCategory attach করা
      return { ...mainCat, subCategories: subWithChild };
    });

    if (getAllCategories.length <= 0) {
      return res.status(404).json({
        message: "Not Found any Categories.",
        error: true,
        success: false,
      });
    }

    // ✅ Response পাঠানো
    return res.status(200).json({
      success: true,
      error: false,
      message: "Successfully fetched all categories.",
      mainCategories: getAllCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get All Category.",
    });
  }
};

// ✅ Step 05 : Get Main Category Count
export const getMainCategoryCount = async (req, res) => {
  try {
    // Find All Main Category
    const category = await mainCategory.find();

    // 3. Send success response
    res.status(200).json({
      success: true,
      error: false,
      mainCategoryCount: category.length || 0,
      message: "Successfull to Get Main Category Count",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Get Main Category Count!",
    });
  }
};

// ✅ Step 06 : Get Sub Category Count
export const getSubCategoryCount = async (req, res) => {
  try {
    // Find All Sub Category
    const category = await subCategory.find();

    // 3. Send success response
    res.status(200).json({
      success: true,
      error: false,
      subCategoryCount: category.length || 0,
      message: "Successfull to Get Sub Category Count",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Get Sub Category Count!",
    });
  }
};

// ✅ Step 07 : Get Child Category Count
export const getChildCategoryCount = async (req, res) => {
  try {
    // Find All Child Category
    const category = await childCategory.find();

    // 3. Send success response
    res.status(200).json({
      success: true,
      error: false,
      childCategoryCount: category.length || 0,
      message: "Successfull to Get Child Category Count",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Get Child Category Count!",
    });
  }
};

//✅ Step 08 : Delete Main Category And Upload Category Image Controller
export const deleteMainCategory = async (req, res) => {
  try {
    const allMainCategory = await mainCategory.find();
    const mainCategories = await mainCategory.findById(req.params.id);

    if (!mainCategories) {
      return res.status(404).json({
        message: "Main Category Not Found with this id.",
        error: true,
        success: false,
      });
    }

    const subCategories = await subCategory.find({
      mainCategoryId: req.params.id,
    });

    for (let i = 0; i < subCategories.length; i++) {
      const childCategories = await childCategory.find({
        subCategoryId: subCategories[i]._id,
      });

      for (let j = 0; j < childCategories.length; j++) {
        await childCategory.findByIdAndDelete(childCategories[j]._id);
      }

      await subCategory.findByIdAndDelete(subCategories[i]._id);
    }

    await mainCategory.findByIdAndDelete(req.params.id);

    // Get Image url From user query parameter
    const imageUrl = mainCategories.image;

    if (imageUrl) {
      // Make an Array of this image url by split("/")
      const urlArr = imageUrl.split("/");

      // Take the Last element of the Array
      const image = urlArr[urlArr.length - 1];

      // And Finally get a name of image without extention like (.jpg, .png, .jpeg)
      const imageName = image.split(".")[0];

      // In Cloudinary Remove image
      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }

    res.status(200).json({
      success: true,
      error: false,
      mainCategoryCount: allMainCategory.length - 1 || 0,
      message: `Successfull to Delete ${mainCategories.name} Category`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message ||
        `Internal Server Error to Delete ${mainCategories.name} Category!`,
    });
  }
};

//✅ Step 09 : Delete Sub Category Controller
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryNameToShow = await subCategory.findById(req.params.id);

    const childCategories = await childCategory.find({
      subCategoryId: req.params.id,
    });

    for (let j = 0; j < childCategories.length; j++) {
      await childCategory.findByIdAndDelete(childCategories[j]._id);
    }

    await subCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      error: false,
      message: `Successfull to Delete ${subCategoryNameToShow.name} Category`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Delete Sub Category!",
    });
  }
};

//✅ Step 10 : Delete Child Category Controller
export const deleteChildCategory = async (req, res) => {
  try {
    const childCategoryNameToShow = await childCategory.findById(req.params.id);
    await childCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      error: false,
      message: `Successfull to Delete ${childCategoryNameToShow.name} Category`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Delete Child Category!",
    });
  }
};

//✅ Step 11 : Update Main Category Controller
export const updateMainCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const oldMainCategoryName = await mainCategory.findById(req.params.id);
    await mainCategory.findOneAndUpdate(
      { _id: req.params.id },
      { name: name, slug: name.toLowerCase().replace(/\s+/g, "-") },
      { new: true }
    );

    res.status(200).json({
      success: true,
      error: false,
      message: `Successfull to Update ${oldMainCategoryName.name} to ${name} Category`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Update Main Category!",
    });
  }
};



//✅ Step 12 : Update Sub Category Controller
export const updateSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const oldSubCategoryName = await subCategory.findById(req.params.id);
    await subCategory.findOneAndUpdate(
      { _id: req.params.id },
      { name: name, slug: name.toLowerCase().replace(/\s+/g, "-") },
      { new: true }
    );

    res.status(200).json({
      success: true,
      error: false,
      message: `Successfull to Update ${oldSubCategoryName.name} to ${name} Category`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Update Sub Category!",
    });
  }
};
