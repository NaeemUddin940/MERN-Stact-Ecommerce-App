import userModel from "../models/user.model.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";

export async function registerUserController(req, res) {
  try {
    let user;
    // Get auth details from frontend
    const { name, email, password } = req.body;

    // check if any field empty or not
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Provide Your Name, Email and Password.",
        error: true,
        success: false,
      });
    }

    // Check on database that there user alredy have or not
    user = await userModel.findOne({ email });

    // if user fill up all field then check that it already have in database then throw an error
    if (user) {
      return res.json({
        message: "User Already Registerd With This Email.",
        error: true,
        success: false,
      });
    }

    // Generate VerifyCode / OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // if user not found in database then hashed password and create as new user
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      otp: verifyCode,
      otpExpires: Date.now() + 300000, //5 Minutes
    });

    await user.save();

    // Send Verification Email
    await sendEmail({
      sendTo: email,
      subject: "Verify Your Email",
      text: "",
      html: verifyEmailTemplate(name, verifyCode),
    });

    // Create a JWT token for verification purpouse
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User Registerd Successfully! Please Verify Your Email",
      token: token, // Optional: include this if needed for verification
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
