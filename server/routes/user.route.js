import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  verifyEmailController,
} from "../controllers/user.controller.js";
import { authenticated } from "../middlewares/authenticated.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);

userRoute.post("/verifyEmail", verifyEmailController);

userRoute.post("/login", loginUserController);

userRoute.get("/profile", authenticated, (req, res) => {
  res.send("Hello");
});

userRoute.get("/logout", authenticated, logoutUserController);

export default userRoute;
