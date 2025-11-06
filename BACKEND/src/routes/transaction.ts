import express from "express";
import { userAuth } from "../middlewares/auth";
import { TransactionModel } from "../models/tarnsactions";

const router = express.Router();


router.post("/", userAuth, async (req, res) => {

  try {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
      return res.status(400).json({
        message: "All required fields must be filled!",
      });
    }

    // @ts-ignore
    const userId = req.user.id;

    const transaction = await TransactionModel.create({
      type,
      category,
      amount,
      date: new Date(date), 
      description,
      userId,
    });

    res.status(201).json({
      message: "Transaction added successfully!✅ ",
      data: transaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      message: "Failed to add transaction!",
      error: error instanceof Error ? error.message : error,
    });
  }
});


router.get("/", userAuth, async (req, res) => {
  try {

    // @ts-ignore
    const userId = req.user.id;

    const transactions = await TransactionModel.find({ userId }).sort({
      date: -1,
    });

    res.json({
      message: "Transactions fetched successfully! ✅ ",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      message: "Failed to fetch transactions!",
      error: error instanceof Error ? error.message : error,
    });
  }
});


router.get("/:id", userAuth, async (req, res) => {

  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    const transaction = await TransactionModel.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found!",
      });
    }

    res.json({
      message: "Transaction fetched successfully!✅ ",
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({
      message: "Failed to fetch transaction!",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.put("/:id",userAuth,async(req,res)=>{

    try 
    {
        const {id} = req.params;
        const { type,category, amount, date, description}=req.body;

        //@ts-ignore
        const userId = req.user.id;

        const transaction = await TransactionModel.findOne({_id: id, userId});

        if(!transaction)
        {
            return res.status(404).json({
                
                message:"Transaction Not Found!"
            });
        }

        if (type) transaction.type = type;
        if (category) transaction.category = category;
        if (amount) transaction.type = type;
        if (date) transaction.date = date;
        if (description) transaction.description = description;

        await transaction.save();

        res.json({

            message:"Transaction Updated Sucessfully! ✅",
            data: transaction
        })  
    } 
    catch (error) 
    {
        console.error("Error updating transaction:", error);
        res.status(500).json({
        message: "Failed to update transaction!",
        error: error instanceof Error ? error.message : error,
        });
        
    }
});

router.delete("/:id",userAuth,async(req,res)=>{

    try 
    {
       const {id} = req.params;
       
       //@ts-ignore
       const userId = req.user.id;

       const transaction = await TransactionModel.findOneAndDelete({ _id: id, userId});

       if(!transaction)
       {
           return res.status(404).json({
              
               message:"Transaction Not Found!"
           })
       }

       res.json({ 

        message:"Transaction Removed Sucessfully! ✅"

       });


    } 
    catch (error) {

        console.error("Error Deleting transaction:", error);
        res.status(500).json({
        message: "Failed to Remove Transaction!",
        error: error instanceof Error ? error.message : error,
        });
        
    }
})

export default router;
