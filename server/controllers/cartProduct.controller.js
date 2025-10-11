import cartCollection from "../models/cartProduct.model.js";
import userModel from "../models/user.model.js";

// Add Cart Item
export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const checkItemCart = await cartCollection.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item Already In Cart.",
        success: false,
      });
    }

    const cartItem = new cartCollection({
      quantity: 1,
      userId,
      productId,
    });

    const saveItem = await cartItem.save();

    await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    res.status(200).json({
      success: true,
      error: false,
      data: saveItem,
      message: "Successfull to Add Item to Cart.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to to Add Item to Cart!",
    });
  }
};

// Get Cart Item
export const getCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cartItem = await cartCollection
      .find({ userId })
      .populate("productId");

    res.status(200).json({
      success: true,
      cartItem,
      error: false,
      message: "Successfull to Get Cart Item.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get Cart Item!",
    });
  }
};
