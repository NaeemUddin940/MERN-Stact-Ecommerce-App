import { Router } from "express";
import {
  checkIsLogin,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  sendAgainOtp,
  userAvatarRemoveController,
  userAvatarUploadController,
  userDetails,
  userDetailsUpdateControlers,
  userForgotPasswordController,
  verifyEmailController,
  verifyForgotPasswordOTPController,
} from "../controllers/user.controller.js";
import { authenticated } from "../middlewares/authenticated.js";
import upload from "../middlewares/multer.js";
import { validateSendAgainOtp } from "../validations/validateSendAgainOtp.js";
import { loginValidator } from "../validations/loginValidations.js";
import { validateRequest } from "../middlewares/validationRequest.js";
import { changePasswordValidator } from "../validations/changePassword.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController);

userRoute.post(
  "/send-again-otp",
  validateSendAgainOtp,
  validateRequest,
  sendAgainOtp
);

userRoute.post("/login", loginValidator, validateRequest, loginUserController);

userRoute.get("/checkislogin", checkIsLogin);

userRoute.get("/logout", authenticated, logoutUserController);

userRoute.post(
  "/upload-avatar",
  upload.single("avatar"),
  authenticated,
  userAvatarUploadController
);

userRoute.delete("/delete-avatar", authenticated, userAvatarRemoveController);

userRoute.put(
  "/update-user-details",
  authenticated,
  userDetailsUpdateControlers
);

userRoute.post("/forgot-password", userForgotPasswordController);

userRoute.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOTPController
);

userRoute.put(
  "/change-password",
  changePasswordValidator,
  validateRequest,
  resetPasswordController
);

userRoute.post("/refresh-token", refreshTokenController);
userRoute.get("/user-details", authenticated, userDetails);

export default userRoute;
