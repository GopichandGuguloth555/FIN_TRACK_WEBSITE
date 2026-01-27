import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import xlsx from "xlsx";
import pdf from "pdf-parse";
import { userAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { ImportedTransactionModel } from "../models/importTransaction";
import { ImportBatchModel } from "../models/importBatch";

const router = express.Router();

router.post("/upload", userAuth, upload.single("file"), async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const source =
      req.file.mimetype === "application/pdf"
        ? "pdf"
        : req.file.mimetype.includes("csv")
          ? "csv"
          : "excel";

    const batch = await ImportBatchModel.create({
      userId,
      fileName: req.file.filename,
      source,
      status: "uploaded",
    });

    res.status(201).json({
      message: "File uploaded successfully",
      batchId: batch._id,
      source,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
}
);


router.post("/parse/:batchId", userAuth, async (req, res) => {
  try {
    const { batchId } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    const batch = await ImportBatchModel.findOne({ _id: batchId, userId });
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const filePath = path.join("uploads", batch.fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "File missing" });
    }

    let rows: any[] = [];

    if (batch.source === "csv") {
      rows = await new Promise<any[]>((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (d) => results.push(d))
          .on("end", () => resolve(results))
          .on("error", reject);
      });
    }

    if (batch.source === "excel") {
      const wb = xlsx.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      rows = xlsx.utils.sheet_to_json(sheet);
    }

    if (batch.source === "pdf") {
      const buffer = fs.readFileSync(filePath);
      //@ts-ignore
      const data = await pdf(buffer);
      rows = data.text
        .split("\n")
        //@ts-ignore
        .map((line) => ({
          description: line,
          amount: 0,
          type: "expense",
          date: new Date(),
        }))
        .filter(Boolean);
    }

    let success = 0;
    let failed = 0;

    for (const row of rows) {
      try {
        await ImportedTransactionModel.create({
          userId,
          date: new Date(row.date),
          description: row.description || "",
          amount: Number(row.amount || 0),
          type: row.type || "expense",
          category: "Others",
          source: batch.source,
          importBatchId: batch._id,
          rawRow: row,
        });
        success++;
      } catch {
        failed++;
      }
    }

    batch.status = "completed";
    batch.totalRows = rows.length;
    batch.successCount = success;
    batch.failedCount = failed;
    await batch.save();

    res.json({ success, failed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Parse failed" });
  }
});

export default router;
