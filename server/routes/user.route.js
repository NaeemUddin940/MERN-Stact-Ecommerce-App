import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  verifyEmailController,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController);

userRoute.post("/login", loginUserController);

userRoute.get("/logout", logoutUserController);

export default userRoute;
