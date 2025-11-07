import mongoose, { Schema, model } from "mongoose";

const TransactionSchema= new Schema({

    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    type: {type:String,enum:["income","expense"], required:true},
    category:{type:String, required:true, trim:true},
    amount:{type:Number, required:true,min: 0},
    date:{type:Date,require:true},
    description:{type:String, trim:true},
    createdAt:{type:Date, default:Date.now}

});
export const TransactionModel =  model("Transactions",TransactionSchema);