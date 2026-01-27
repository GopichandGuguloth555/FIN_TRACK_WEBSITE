import mongoose, { Schema, model } from "mongoose";

const ImportBatchSchema = new Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,index: true,},

    fileName: {type: String,required: true,},

    source: {type: String,enum: ["pdf", "csv", "excel"],required: true, },

    status: {type: String,enum: ["uploaded", "processing", "completed", "failed"],default: "uploaded",},

    totalRows: {type: Number,default: 0,},

    successCount: {type: Number,default: 0,},

    failedCount: {type: Number,default: 0,},

    errorMessage: {type: String,},
  },
  {
    timestamps: true,
  }
);

export const ImportBatchModel = model(
  "ImportBatch",
  ImportBatchSchema
);
