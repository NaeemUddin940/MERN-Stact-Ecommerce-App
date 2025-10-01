import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
// import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
const app = express();

const port = process.env.PORT || 8080;

// Middlewares setup
app.use(express.json());
app.use(cors());
// app.options("http://localhost:5173", cors());
app.use(express.json());
app.use(cookieParser());
// app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Database Connect
connectDB();

// Home Page Route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Server is Running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
