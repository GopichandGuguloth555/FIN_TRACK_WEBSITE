import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },

  isPremium: { type: Boolean, default: false }
});

export const UserModel = model("User", UserSchema);
