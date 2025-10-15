import addressModel from "../models/address.model.js";

export const addAddressController = async (req, res) => {
  try {
    const {
      fullname,
      phone,
      address_line1,
      address_line2,
      city,
      postalCode,
      state,
      country,
    } = req.body;

    const newAddress = await addressModel.create({
      userId: req.user.id,
      fullname,
      phone,
      address_line1,
      address_line2,
      city,
      postalCode,
      state,
      country,
    });

    res.status(200).json({
      success: true,
      error: false,
      newAddress,
      message: "Successfull to Add Address",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to do Add Address!",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await addressModel.find({ userId });

    res.status(200).json({
      success: true,
      error: false,
      address,
      message: "Successfull to get Address",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Get Address!",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    await addressModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      error: false,
      message: "Successfull to Delete Address",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error to Delete Address!",
    });
  }
};
