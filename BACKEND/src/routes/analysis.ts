import express from "express";
import { userAuth } from "../middlewares/auth";
import { ImportedTransactionModel } from "../models/importTransaction";

const router = express.Router();

router.get("/summary", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const txs = await ImportedTransactionModel.find({ userId });

    let income = 0;
    let expense = 0;

    for (const t of txs) {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    }

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
});

router.get("/category", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const data = await ImportedTransactionModel.aggregate([
      { $match: { userId, type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(
      data.map((d) => ({
        category: d._id,
        total: d.total,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Category analytics failed" });
  }
});

router.get("/monthly", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const data = await ImportedTransactionModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$date" },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      data.map((d) => ({
        month: d._id,
        income: d.income,
        expense: d.expense,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Monthly analytics failed" });
  }
});

export default router;
