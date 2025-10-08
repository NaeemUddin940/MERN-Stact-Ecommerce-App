import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
const app = express();

const port = process.env.PORT || 8080;

// Middlewares setup
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-stact-ecommerce-app.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Allowed Origins List
// const allowedOrigins = [
//   "http://localhost:5173", // local frontend
//   "https://yourapp.vercel.app", // vercel frontend
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps, Postman)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
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

app.use("/api/user", userRoute);
app.use("/api/user/admin", categoryRoute);
app.use("/api/user/admin", productRoute);
app.use("/api", productRoute);

// Server is Running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
