import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

export default userRoute;
