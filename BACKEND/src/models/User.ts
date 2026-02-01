import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    googleId: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
