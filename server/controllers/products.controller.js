import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import productsCollection from "../models/product.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

export const createProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: true,
        errors: errors.array(),
      });
    }
    // Cloudinary upload options
    const options = {
      use_filename: true,
      uniques_filename: true,
      overwrite: false,
    };

    const images = req.files;
    let productImage = [];

    for (let i = 0; i < images?.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, options);
      productImage.push(result.secure_url);
      fs.unlinkSync(images[i].path);
    }

    const productData = {
      ...req.body,
      price: Number(req.body.price),
      oldPrice: Number(req.body.oldPrice),
      inStockCount: Number(req.body.inStockCount),
      productimages: productImage,
    };

    const newProduct = await productsCollection.create(productData);

    res.status(200).json({
      success: true,
      error: false,
      products: newProduct,
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

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }, // newest first
    };

    const products = await productsCollection.paginate({}, options);

    res.status(200).json({
      success: true,
      error: false,
      products: products.docs, // only products array
      totalDocs: products.totalDocs,
      totalPages: products.totalPages,
      page: products.page,
      limit: products.limit,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
      message: "Successfully fetched all products with pagination.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get All Products!",
    });
  }
};
