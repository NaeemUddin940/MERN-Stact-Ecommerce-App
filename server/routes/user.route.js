import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  verifyEmailController,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController);

userRoute.post("/login", loginUserController);

export default userRoute;
