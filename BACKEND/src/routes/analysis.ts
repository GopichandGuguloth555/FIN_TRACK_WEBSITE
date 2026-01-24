import express from "express";
import { userAuth } from "../middlewares/auth";
import { TransactionModel } from "../models/tarnsactions";
import { UserModel } from "../models/User";
import { Request, Response,NextFunction } from "express";
import premiumOnly from "../middlewares/premium";

const router = express.Router();

router.get("/summary", userAuth, premiumOnly, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const transactions = await TransactionModel.find({ userId }).lean();

    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of transactions) {
      if (t.type === "income") totalIncome += t.amount;
      if (t.type === "expense") totalExpense += t.amount;
    }

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching summary" });
  }
});

router.get("/category", userAuth, premiumOnly, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { type } = req.query;

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({
        message: "Please provide a valid type: 'income' or 'expense'",
      });
    }

    const transactions = await TransactionModel.find({
      userId,
      type,
    }).lean();

    const categoryTotals: Record<string, number> = {};

    for (const t of transactions) {
      if (!t.category) continue;

      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }

    const result = Object.entries(categoryTotals).map(
      ([category, total]) => ({
        category,
        total,
      })
    );

    res.status(200).json({
      type,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching category data" });
  }
});

router.get("/insights", userAuth, premiumOnly, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const transactions = await TransactionModel.find({ userId }).lean();

    const monthlyTotals: Record<
      string,
      { totalIncome: number; totalExpense: number }
    > = {};

    for (const t of transactions) {
      if (!t.date) continue;

      const month = t.date.toISOString().slice(0, 7);

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = { totalIncome: 0, totalExpense: 0 };
      }

      if (t.type === "income") {
        monthlyTotals[month].totalIncome += t.amount;
      } else if (t.type === "expense") {
        monthlyTotals[month].totalExpense += t.amount;
      }
    }

    const trends = Object.entries(monthlyTotals)
      .map(([month, data]) => ({
        month,
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.status(200).json({
      data: trends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching insights" });
  }
});

router.get("/stats/monthly", userAuth, premiumOnly, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const stats = await TransactionModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$date" },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ stats });
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    res.status(500).json({ message: "Failed to fetch monthly stats" });
  }
});

export default router;
