import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({

  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" } 
  
});

export const BlacklistModel = mongoose.model("Blacklist", BlacklistSchema);
