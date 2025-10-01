import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_DATABASE_URI) {
  throw new Error("Please Provide MongoDB URI From .env File");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DATABASE_URI);
    console.log(`✅ Successfully Database Connected`);
  } catch (error) {
    console.error(`❌ Database Connection have some issue:`, error);
    process.exit(1);
  }
};

export default connectDB;
