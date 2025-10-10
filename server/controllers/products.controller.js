import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import productsCollection from "../models/product.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

// Create Products
export const createProducts = async (req, res) => {
  try {
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

// Get all Products
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

export const filterProducts = async (req, res) => {
  try {
    // 1️⃣ Query parameters
    const {
      page = 1,
      limit = 10,
      productName,
      productBrand,
      productDescription,
      categoryId,
      categoryName,
      minPrice,
      maxPrice,
      inStock = true,
      latest,
      popular,
      rating,
      sortBy = "createdAt",
      sortOrder = "desc", // or "asc"
    } = req.query;

    // 2️⃣ Build dynamic filter
    const filter = {};

    // productName By Product Title / Name
    if (productName)
      filter.title = { $regex: productName.trim(), $options: "i" };

    // Search By productDescription
    if (productDescription)
      filter.description = { $regex: productDescription.trim(), $options: "i" };

    // Search By productBrand
    if (productBrand)
      filter.brand = { $regex: productBrand.trim(), $options: "i" };

    // Category Filter
    if (categoryId) filter.categoryId = categoryId;
    if (categoryName)
      filter.categoryName = { $regex: categoryName, $options: "i" };

    // In-Stock
    if (inStock === "true") filter.inStockCount = { $gt: parseFloat(0) };

    // ✅ Is-Latest filter
    if (latest !== undefined) {
      if (latest === "true") {
        filter.isLatest = true;
      } else if (latest === "false") {
        filter.isLatest = false;
      }
    }

    // ✅ Is-Popular filter
    if (popular !== undefined) {
      if (popular === "true") {
        filter.isPopular = true;
      } else if (popular === "false") {
        filter.isPopular = false;
      }
    }

    // 🔹 Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    // 🔹 Rating filter
    if (rating) filter.rating = { $gte: parseFloat(rating) };

    // 3️⃣ Sorting options
    const sortOption = {};
    sortOption[sortBy] = sortOrder === "asc" ? 1 : -1;

    // 4️⃣ Pagination options
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sortOption,
    };

    // 5️⃣ Get filtered + paginated data
    const products = await productsCollection.paginate(filter, options);

    // 6️⃣ Response
    res.status(200).json({
      success: true,
      error: false,
      filtersApplied: filter,
      sorting: sortOption,
      products: products.docs,
      totalDocs: products.totalDocs,
      totalPages: products.totalPages,
      page: products.page,
      limit: products.limit,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
      message: "Filtered products fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message:
        error.message || "Internal Server Error while filtering products!",
    });
  }
};
