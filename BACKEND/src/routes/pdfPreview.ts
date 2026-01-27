import express from "express";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { userAuth } from "../middlewares/auth";
import { ImportBatchModel } from "../models/importBatch";

const router = express.Router();


router.get("/pdf-preview/:batchId", userAuth, async (req, res) => {
  try {
    const { batchId } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    const batch = await ImportBatchModel.findOne({
      _id: batchId,
      userId,
      source: "pdf",
    });

    if (!batch) {
      return res.status(404).json({
        message: "PDF batch not found",
      });
    }

    const filePath = path.join("uploads", batch.fileName);
    const buffer = fs.readFileSync(filePath);
    //@ts-ignore
    const data = await pdf(buffer);

    const lines = data.text.split("\n");

    const transactions = [];


    const txRegex =
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}).*?([\d,]+\.\d{2})/;

    for (const line of lines) {
      const match = line.match(txRegex);
      if (match) {
        transactions.push({
          raw: line.trim(),
          date: match[1],
          amount: match[2],
        });
      }
    }

    res.json({
      message: "Transaction preview extracted",
      count: transactions.length,
      transactions: transactions.slice(0, 20), 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to preview PDF transactions",
    });
  }
});

export default router;
