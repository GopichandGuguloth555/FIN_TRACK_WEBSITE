import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import xlsx from "xlsx";
import pdf from "pdf-parse";
import mongoose from "mongoose";
import { userAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { ImportedTransactionModel } from "../models/importTransaction";
import { ImportBatchModel } from "../models/importBatch";
import { detectCategory } from "../utils/categeoryDetector";


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

    const batchId = req.params.batchId.replace(/\s+/g, "");


    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      return res.status(400).json({ message: "Invalid batchId" });
    }

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

    batch.status = "processing";
    await batch.save();

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

      const regex =
        /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}).*?([\d,]+\.\d{2})/;

      rows = data.text
        .split("\n")
        //@ts-ignore
        .map((line) => {
          const match = line.match(regex);
          if (!match) return null;

          const lower = line.toLowerCase();
          const type =
            lower.includes("cr") ||
              lower.includes("credit") ||
              lower.includes("salary")
              ? "income"
              : "expense";

          return {
            date: match[1],
            amount: match[2],
            description: line.trim(),
            type,
          };
        })
        .filter(Boolean);
    }

    let success = 0;
    let failed = 0;

    for (const row of rows) {
      try {

        if (!row.date || !row.amount || !row.type) {
          failed++;
          continue;
        }

        await ImportedTransactionModel.create({
          userId,
          date: new Date(row.date),
          description: row.description || "",
          amount: Number(String(row.amount).replace(/,/g, "")),
          type: row.type,
          category: detectCategory(row.description || ""),
          source: batch.source,
          importBatchId: batch._id,
          rawRow: row,
        });

        success++;
      } catch (err) {
        failed++;
      }
    }

    batch.status = "completed";
    batch.totalRows = rows.length;
    batch.successCount = success;
    batch.failedCount = failed;
    await batch.save();

    res.json({
      message: "Parse completed",
      total: rows.length,
      success,
      failed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Parse failed" });
  }
});

router.get("/batches", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const batches = await ImportBatchModel.find({ userId })
      .sort({ createdAt: -1 })
      .select(
        "fileName source status totalRows successCount failedCount createdAt"
      );

    res.json({
      batches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch uploaded files",
    });
  }
});

router.delete("/batch/:batchId", userAuth, async (req, res) => {
  try {
    const { batchId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      return res.status(400).json({ message: "Invalid batchId" });
    }

    // @ts-ignore
    const userId = req.user.id;

    const batch = await ImportBatchModel.findOne({
      _id: batchId,
      userId,
    });

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    // 1️⃣ delete transactions linked to this batch
    await ImportedTransactionModel.deleteMany({
      importBatchId: batch._id,
      userId,
    });

    // 2️⃣ delete file from disk
    const filePath = path.join("uploads", batch.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 3️⃣ delete batch record
    await batch.deleteOne();

    res.json({
      message: "Uploaded file deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete uploaded file",
    });
  }
});

export default router;
