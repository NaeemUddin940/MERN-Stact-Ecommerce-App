import { body } from "express-validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is Required.")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be at least 6 to 16 digits.")
    .custom(async (value, { req }) => {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("User Not Found!");
      }
      const isPasswordMatched = await bcrypt.compare(value, user.password);
      if (!isPasswordMatched) {
        throw new Error("Invalid Password");
      }
    }),
];
