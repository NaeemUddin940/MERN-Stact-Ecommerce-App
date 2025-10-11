import { body } from "express-validator";

export const changePasswordValidator = [
  body("oldPassword").notEmpty().withMessage("Please Enter Your Old Password."),
  body("newPassword")
    .notEmpty()
    .withMessage("Please Enter Your Change Password.")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password Must be at least 6 to 16 Digits."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please Enter Your Confim Password"),
];
