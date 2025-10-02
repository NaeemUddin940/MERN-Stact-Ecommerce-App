import userModel from "../models/user.model.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

// This is user Register Controller
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
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User Registerd Successfully! Please Verify Your Email",
      token: token, // Optional: include this if needed for verification
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to Register a user",
      error: true,
      success: false,
    });
  }
}

// This is user Email Verify Controller
export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;

    // Found the user is he/she have in databse or not if not then user not found error throw
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found.",
        error: true,
        success: false,
      });
    }

    // check otp in user otp and user gmail send otp which i get req.body
    const isOtpValid = user.otp === otp;

    // check isOtpExpired or not if current date is greater than user.otpExpired time then otp expired true
    const isNotExpired = user.otpExpires > Date.now();

    // Check is otpValid && isNotExpired then Email verified Successfull
    if (isOtpValid && isNotExpired) {
      (user.verify_email = true),
        (user.otp = null),
        (user.otpExpires = null),
        await user.save();
      return res.status(200).json({
        message: "Email Verified Successfull",
        error: false,
        success: true,
      });
    } else if (!isOtpValid) {
      // if user.otp & user input otp is not equal then throw this error
      return res.status(400).json({
        message: "Invalid OTP, Please Enter a Valid OTP",
        error: true,
        success: false,
      });
    } else {
      // if isNotExpired means otpExpires time is greater then current time then otp isNotExpired === false but if isNotExpired  = otpExpires time is less then current time or current time is bigger then otpExpires time then throw this error
      return res.status(400).json({
        message: "OTP Expired",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Email Varification Failed.",
      error: true,
      success: false,
    });
  }
}

// This is user Login Controller
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    // Found The user is he/she have on database or not
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not Found with This Email",
        success: false,
        error: true,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Please Contact to Our Contact Team.",
        error: true,
        success: false,
      });
    }
    const isPassMatch = await bcryptjs.compare(password, user.password);

    if (!isPassMatch) {
      return res.status(400).json({
        message: "Your Password is Wrong, Please try again!",
        success: false,
        error: true,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    await userModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "Login Successfull",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to Login",
      error: true,
      success: false,
    });
  }
}

// This is user Logout Controller
export async function logoutUserController(req, res) {
  try {
    const userid = req.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    await userModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Log Out Successfull.",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to Log Out",
      error: true,
      success: false,
    });
  }
}
