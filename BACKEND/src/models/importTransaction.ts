import mongoose, { Schema, model } from "mongoose";

const ImportedTransactionSchema = new Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,index: true,},

    date: {type: Date,required: true,},

    description: {type: String,trim: true,},

    amount: {type: Number,required: true,},

    type: {type: String,enum: ["income", "expense"],required: true,},

    category: {type: String, default: "Uncategorized",},

    source: {type: String,enum: ["csv", "excel", "pdf"],required: true,},

    importBatchId: {type: mongoose.Schema.Types.ObjectId,ref: "ImportBatch",required: true,},

    rawRow: {type: Schema.Types.Mixed,},
  },
  {
    timestamps: true,
  }
);

export const ImportedTransactionModel = model(
  "ImportedTransaction",
  ImportedTransactionSchema
);
