import express from "express";
import { BudjetModel } from "../models/bujet";
import { TransactionModel } from "../models/tarnsactions";
import { userAuth } from "../middlewares/auth";

const router = express.Router();


router.post("/", userAuth, async (req, res) => {
  try {
    const { category, month, amount } = req.body;

    if (!category || !month || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // @ts-ignore
    const userId = req.user.id;

    const budget = await BudjetModel.create({
      userId,
      category,
      month,
      amount,
    });

    res.json({
      message: "Budget created successfully",
      data: budget,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const budgets = await BudjetModel.find({ userId });

    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const [year, month] = budget.month.split("-");
        const start = new Date(+year, +month - 1, 1);
        const end = new Date(+year, +month, 1);

        const spentAgg = await TransactionModel.aggregate([
          {
            $match: {
              userId,
              type: "expense",
              category: budget.category,
              date: { $gte: start, $lt: end },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        return {
          ...budget.toObject(),
          spent: spentAgg[0]?.total || 0,
        };
      })
    );

    res.json({
      message: "Budgets fetched successfully",
      data: budgetsWithSpent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
});


router.get("/health", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const budgets = await BudjetModel.find({ userId });

    const items = await Promise.all(
      budgets.map(async (budget) => {
        const [year, month] = budget.month.split("-");
        const start = new Date(+year, +month - 1, 1);
        const end = new Date(+year, +month, 1);

        const spentAgg = await TransactionModel.aggregate([
          {
            $match: {
              userId,
              type: "expense",
              category: budget.category,
              date: { $gte: start, $lt: end },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        const spent = spentAgg[0]?.total || 0;

        const percent =
          budget.amount > 0
            ? Math.min(Math.round((spent / budget.amount) * 100), 100)
            : 0;

        let color = "#2A9D8F"; // green
        if (percent >= 80) color = "#E63946"; // red
        else if (percent >= 50) color = "#F4A261"; // orange

        return {
          label: budget.category,
          percent,
          color,
        };
      })
    );

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch budget health" });
  }
});

router.put("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { category, month, amount } = req.body;

    // @ts-ignore
    const userId = req.user.id;

    const budget = await BudjetModel.findOne({ _id: id, userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    if (category) budget.category = category;
    if (month) budget.month = month;
    if (amount !== undefined) budget.amount = amount;

    await budget.save();

    res.json({
      message: "Budget updated successfully",
      data: budget,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update budget" });
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // @ts-ignore
    const userId = req.user.id;

    await BudjetModel.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete budget" });
  }
});

export default router;
