import mongoose, { Schema, model, mongo } from "mongoose";
import { ref } from "process";

const BudjetSchema = new Schema({

    userId:{type:mongoose.Schema.ObjectId, ref:"User", required:true},
    category:{type:String,required:true},
    month:{type:String,required:true},
    amount:{type:Number,required:true},

},{timestamps: true});
export const BudjetModel = model("Budjet",BudjetSchema);