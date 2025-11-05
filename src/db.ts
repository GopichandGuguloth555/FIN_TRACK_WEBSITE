import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));


const UserSchema = new Schema({
  userName: {type: String,required: true, unique: true},
  password: {type: String,required: true}
});
export const UserModel = model("User", UserSchema);
