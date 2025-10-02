import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  userAvatarRemoveController,
  userAvatarUploadController,
  verifyEmailController,
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
export default userRoute;
