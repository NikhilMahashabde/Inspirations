import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const databaseURI = process.env.MONGO_URI;

    if (!databaseURI) {
      throw new Error(
        "DATABASE_URI is not defined in the environment variables"
      );
    }

    await mongoose.connect(databaseURI, {});
  } catch (err) {
    console.error(err);
  }
};
export default connectDB;
