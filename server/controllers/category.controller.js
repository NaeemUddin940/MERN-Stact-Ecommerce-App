import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

export const categoryImageUploader = async (req, res) => {
  try {

    console.log(req.file.filename);
    // Cloudinary Image upload options
    const options = {
      use_filename: true,
      uniques_filename: true,
      overwrite: false,
    };

    let categoryImage = "";
    await cloudinary.uploader.upload(req.file.path, options, (err, result) => {
      categoryImage = result.secure_url;
      fs.unlinkSync(`uploads/${req.file.filename}`);
    });

    res.status(200).json({
      success: true,
      image: categoryImage,
      error: false,
      message: "Category Image Upload Successfull.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error to Upload Category Image!",
    });
  }
};
