import { Router } from "express";
import { registerUserController, verifyEmailController } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController)

export default userRoute;
