import mongoose, { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
    type: { type: String, enum: ["income", "expense"], required: true, },
    category: {type: String,enum: [ "Food", "Travel", "Shopping", "Bills", "Entertainment", "Others",
        "Salary",
      ], required: true, },
      
    amount: { type: Number, required: true, min: 0,},
    date: {type: Date,required: true,  },
    description: { type: String, trim: true, },
  },
  {
    timestamps: true, 
  }
);

export const TransactionModel = model(
  "Transaction", 
  TransactionSchema
);
