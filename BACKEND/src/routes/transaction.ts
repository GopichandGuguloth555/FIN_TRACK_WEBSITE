import express from "express";
import { userAuth } from "../middlewares/auth";
import { ImportedTransactionModel } from "../models/importTransaction";

const router = express.Router();

router.get("/", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 500, 1), 2000);
    const transactions = await ImportedTransactionModel.find({ userId })
      .sort({ date: -1 })
      .limit(limit);

    res.json({
      transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;