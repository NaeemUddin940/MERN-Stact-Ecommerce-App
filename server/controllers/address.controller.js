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

    await addressModel.create({
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
