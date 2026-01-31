
import express from "express";
import { userAuth } from "../middlewares/auth";
import { ImportedTransactionModel } from "../models/importTransaction";

const router = express.Router();

router.get("/", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const transactions = await ImportedTransactionModel.find({ userId })
      .sort({ date: -1 })
      .limit(50);

    res.json({
      transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;
