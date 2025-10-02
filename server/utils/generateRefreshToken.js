import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function generateRefreshToken(userId) {
  const token = await jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  await userModel.updateOne({ _id: userId }, { refresh_token: token });
  return token;
}
