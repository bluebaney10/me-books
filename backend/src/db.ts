import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGODB_URL ?? "";
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    process.exit(1);
  }
};

export default connectDB;
