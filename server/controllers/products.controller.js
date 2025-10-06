import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

export const createProducts = async (req, res) => {
  try {
    const images = req.files;

    // Cloudinary upload options
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    // Upload images to Cloudinary and delete from uploads folder
    let productImage = [];

    for (let i = 0; i < images?.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, options);
      productImage.push(result.secure_url);

      // Optionally delete local file
      fs.unlinkSync(`uploads/${req.files[i].filename}`);
    }

    

    res.status(200).json({
      success: true,
      error: false,
      message: "Successfull to Create Product.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Create Products!",
    });
  }
};
