import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
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

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController);

userRoute.post("/login", loginUserController);

userRoute.get("/logout", authenticated, logoutUserController);

userRoute.put(
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

userRoute.put("/change-password", resetPasswordController);
userRoute.post("/refresh-token", refreshTokenController);
userRoute.get("/user-details", authenticated, userDetails)

export default userRoute;
