import { body } from "express-validator";

export const addressValidation = [
  body("fullname")
    .notEmpty()
    .withMessage("Please Enter Your Fullname.")
    .isLength({ min: 6, max: 25 })
    .withMessage("Fullname Must be at lest 6 to 25 characters."),

  body("phone").notEmpty().withMessage("Please Enter Your Phone Number."),
  body("address_line1")
    .notEmpty()
    .withMessage("Please Enter Your House No, Village, Post, District."),
  body("city").notEmpty().withMessage("Please Enter Your City."),
  body("division").notEmpty().withMessage("Please Enter Your Division."),
  body("postalCode").notEmpty().withMessage("Please Enter Your Postal Code."),
];
