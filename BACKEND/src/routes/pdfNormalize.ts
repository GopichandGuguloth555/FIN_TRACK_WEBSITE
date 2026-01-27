import express from "express";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { userAuth } from "../middlewares/auth";
import { ImportBatchModel } from "../models/importBatch";

const router = express.Router();

function detectType(text: string): "income" | "expense" {
  const t = text.toLowerCase();
  if (
    t.includes("cr") ||
    t.includes("credit") ||
    t.includes("salary") ||
    t.includes("deposit")
  ) {
    return "income";
  }
  return "expense";
}

router.get("/pdf-normalize/:batchId", userAuth, async (req, res) => {
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

    const regex =
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}).*?([\d,]+\.\d{2})/;

    const normalized = [];

    for (const line of lines) {
      const match = line.match(regex);
      if (!match) continue;

      normalized.push({
        date: new Date(match[1]),
        amount: Number(match[2].replace(/,/g, "")),
        type: detectType(line),
        description: line.trim(),
      });
    }

    res.json({
      message: "PDF transactions normalized",
      count: normalized.length,
      preview: normalized.slice(0, 20),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to normalize PDF transactions",
    });
  }
});

export default router;
