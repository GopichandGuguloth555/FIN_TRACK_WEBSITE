import express from "express";
import { userAuth } from "../middlewares/auth";
import { TransactionModel } from "../models/tarnsactions";
import { UserModel } from "../models/User";

const router = express.Router();

router.post("/", userAuth, async (req, res) => {

  try {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // @ts-ignore
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const transactionCount = await TransactionModel.countDocuments({ userId });

    if (!user.isPremium && transactionCount >= 5) {
      return res.status(403).json({
        message: "Upgrade to premium to add more transactions!",
      });
    }

    const transaction = await TransactionModel.create({
      userId,
      type,
      category,
      amount,
      date: new Date(date),
      description,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      message: "Failed to add transaction",
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
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      message: "Failed to fetch transactions",
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
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({
      message: "Failed to fetch transaction",
    });
  }
});

router.put("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    // @ts-ignore
    const userId = req.user.id;

    const transaction = await TransactionModel.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (type) transaction.type = type;
    if (category) transaction.category = category;
    if (amount !== undefined) transaction.amount = amount;
    if (date) transaction.date = new Date(date);
    if (description) transaction.description = description;

    await transaction.save();

    res.json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({
      message: "Failed to update transaction",
    });
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // @ts-ignore
    const userId = req.user.id;

    const transaction = await TransactionModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction removed successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({
      message: "Failed to remove transaction",
    });
  }
});

export default router;
