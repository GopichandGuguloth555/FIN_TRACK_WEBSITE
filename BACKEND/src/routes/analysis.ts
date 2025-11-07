import express from "express";
import { userAuth } from "../middlewares/auth";
import { TransactionModel } from "../models/tarnsactions";

const router = express.Router();

router.get("/summary", userAuth, async (req, res) => {
    try {

        //@ts-ignore
        const userId = req.user.id;
        const { month } = req.query;

        const currentMonth = month || new Date().toISOString().slice(0, 7);
        const startDate = new Date(`${currentMonth}-01`);
        const endDate = new Date(`${currentMonth}-31`);

        const transactions = await TransactionModel.find({
            userId,
            date: { $gte: startDate, $lte: endDate },
        }).lean();

        let totalIncome = 0;
        let totalExpense = 0;

        for (const t of transactions) {
            if (t.type === "income") {
                totalIncome += t.amount;
            } else if (t.type === "expense") {
                totalExpense += t.amount;
            }
        }
        const balance = totalIncome - totalExpense;

        res.status(200).json({
            message: "Monthly summary fetched successfully",
            month: currentMonth,
            totalIncome,
            totalExpense,
            balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching summary" });
    }
});

router.get("/category", userAuth, async (req, res) => {
    try {

        //@ts-ignore
        const userId = req.user.id;
        const { month, type } = req.query;

        const now = new Date();
        const currentMonth = month ? new Date(`${month}-01`) : new Date(now.getFullYear(), now.getMonth(), 1);
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        if (type !== "income" && type !== "expense") {
            return res.status(400).json({ message: "Please provide a valid type: 'income' or 'expense'" });
        }

        const transactions = await TransactionModel.find({
            userId,
            type,
            date: { $gte: startDate, $lte: endDate },
        }).lean();

        const categoryTotals: Record<string, number> = {};

        for (const t of transactions) {
            if (!categoryTotals[t.category]) {
                categoryTotals[t.category] = 0;
            }
            categoryTotals[t.category] += t.amount;
        }

        const result = Object.entries(categoryTotals).map(([category, total]) => ({
            category,
            total,
        }));

        res.status(200).json({
            message: `${type} distribution fetched successfully`,
            month: month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
            type,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching category data" });
    }
});

router.get("/insights", userAuth, async (req, res) => {
  
    try 
    {
            //@ts-ignore
            const userId = req.user.id;

            const transactions = await TransactionModel.find({ userId }).lean();

            const monthlyTotals: Record<
            string,
            { totalIncome: number; totalExpense: number }
            > = {};

            for (const t of transactions) {
             if(!t.date) continue;
             
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

            const trends = Object.entries(monthlyTotals).map(([month, data]) => ({
            month,
            totalIncome: data.totalIncome,
            totalExpense: data.totalExpense,
            }));

            trends.sort((a, b) => a.month.localeCompare(b.month));

            res.status(200).json({
            message: "Monthly spending insights fetched successfully",
            data: trends,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error while fetching insights" });
        }
});
export default router;
