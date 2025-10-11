import { mylistCollection } from "../models/myList.model.js";

// Add MyList Controller
export const addToMyListController = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingItem = await mylistCollection.findOne({
      userId,
      productId: req.body.productId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Item Already In My List.",
        success: false,
      });
    }

    const myList = new mylistCollection({
      userId,
      ...req.body,
    });
    await myList.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "Successfull to Add My List",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Add My List!",
    });
  }
};

// Get My List Controller
export const getMyListController = async (req, res) => {
  try {
    const userId = req.user.id;

    const myLists = await mylistCollection.find({ userId: userId });

    if (!myLists) {
      return res.status(400).json({
        message: "My Lists Not Found.",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      error: false,
      myLists,
      message: "Successfull to Get My Lists.",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get My Lists!",
    });
  }
};

// Delete MyList Controller
export const deleteMyListController = async (req, res) => {
  try {
    const deletMyListItem = await mylistCollection.findByIdAndDelete(
      req.params.id
    );

    if (!deletMyListItem) {
      return res.status(400).json({
        message: "My List Item Not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Successfull to Delete My List Item",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Delete My List!",
    });
  }
};
