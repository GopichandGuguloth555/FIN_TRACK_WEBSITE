import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import xlsx from "xlsx";
import mongoose from "mongoose";

import { userAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { ImportedTransactionModel } from "../models/importTransaction";
import { ImportBatchModel } from "../models/importBatch";
import { detectCategory } from "../utils/categeoryDetector";

const router = express.Router();

const MONTH_NAMES: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseDateSafe(dateStr: any): Date | null {
  if (!dateStr) return null;

  if (typeof dateStr === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + dateStr * 86400000);
  }

  if (typeof dateStr === "string") {
    const s = dateStr.trim();

    if (s.includes("/") || s.includes("-")) {
      const parts = s.split(/[\/\-]/).map((p: string) => p.trim());
      if (parts.length === 3) {
        let year: string;
        let month: string;
        let day: string;

        if (parts[0].length === 4) {
          [year, month, day] = parts;
        } else {
          const [d, m, y] = parts;
          year = y.length === 2 ? `20${y}` : y;
          month = m;
          day = d;
        }

        if (MONTH_NAMES[month]) {
          month = MONTH_NAMES[month];
        }
        if (day.length === 1) day = "0" + day;
        if (month.length === 1) month = "0" + month;
        const parsed = new Date(`${year}-${month}-${day}`);
        return isNaN(parsed.getTime()) ? null : parsed;
      }
    }

    const ddmmyy = s.match(/^(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*,?\s*(\d{2,4})$/i);
    if (ddmmyy) {
      const [, day, mon, year] = ddmmyy;
      const month = MONTH_NAMES[mon.slice(0, 3)];
      const y = year.length === 2 ? `20${year}` : year;
      const parsed = new Date(`${y}-${month}-${day.padStart(2, "0")}`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    const mmmddyy = s.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})\s*,?\s*(\d{2,4})$/i);
    if (mmmddyy) {
      const [, mon, day, year] = mmmddyy;
      const month = MONTH_NAMES[mon.slice(0, 3)];
      const y = year.length === 2 ? `20${year}` : year;
      const parsed = new Date(`${y}-${month}-${day.padStart(2, "0")}`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    const parsed = new Date(s);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

function getFirstDefined<T = any>(row: any, keys: string[]): T | undefined {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key] as T;
    }
  }
  return undefined;
}

function normalizeAmount(raw: any): number | null {
  if (raw === undefined || raw === null || raw === "") return null;
  const num = Number(String(raw).replace(/[₹,\s]/g, ""));
  return isNaN(num) ? null : num;
}

function detectTypeFromPdfLine(text: string): "income" | "expense" {
  const t = text.toLowerCase();
  if (
    t.includes("cr ") ||
    t.includes(" credit") ||
    t.includes("credit ") ||
    t.includes("salary") ||
    t.includes("deposit") ||
    t.includes("refund") ||
    t.includes("reversal") ||
    /\bcr\b/.test(t)
  ) {
    return "income";
  }
  return "expense";
}

router.post("/upload", userAuth, upload.single("file"), async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const source = req.file.mimetype.includes("pdf")
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
});

router.post("/parse/:batchId", userAuth, async (req, res) => {
  try {
    const batchId = req.params.batchId.trim();

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      return res.status(400).json({ message: "Invalid batchId" });
    }

    // @ts-ignore
    const userId = req.user.id;

    const batch = await ImportBatchModel.findOne({ _id: batchId, userId });
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const uploadsDir = path.join(__dirname, "..", "..", "uploads");
    const filePath = path.join(uploadsDir, batch.fileName);

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
      const { PDFParse } = require("pdf-parse");
      const buffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: buffer });
      let text = "";
      try {
        const textResult = await parser.getText();
        text = textResult?.text ?? "";
      } finally {
        await parser.destroy();
      }

      const lines = text.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean);

      const dateRegex = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{1,2}[\/\-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\/\-]\d{2,4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*,?\s*\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}\s*,?\s*\d{2,4}/gi;
      const amountRegex = /(?:₹\s*)?([\d,]+(?:\.\d{1,2})?)\s*(Cr|Dr)?/gi;

      for (let i = 0; i < lines.length; i++) {
        let combined = lines[i];
        if (i + 1 < lines.length && combined.length < 80 && /^\d{1,2}[\-\/]|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/i.test(combined)) {
          combined = combined + " " + lines[i + 1];
          if (i + 2 < lines.length && !/^(?:₹\s*)?[\d,]+(?:\.\d{1,2})?\s*(Cr|Dr)?\s*$/i.test(lines[i + 1])) {
            combined = combined + " " + lines[i + 2];
          }
        }

        const dateMatch = combined.match(dateRegex);
        const amountMatches = [...combined.matchAll(amountRegex)];

        if (!dateMatch || dateMatch.length === 0 || !amountMatches || amountMatches.length === 0) continue;

        const dateStr = dateMatch[0].trim();
        const parsedDate = parseDateSafe(dateStr);
        if (!parsedDate) continue;

        const lastAmount = amountMatches[amountMatches.length - 1];
        const amountStr = lastAmount[1].replace(/,/g, "");
        const amount = Number(amountStr);
        if (isNaN(amount) || amount <= 0) continue;

        const rawCrDr = (lastAmount[2] || "").trim().toLowerCase();
        let type: "income" | "expense" = detectTypeFromPdfLine(combined);
        if (rawCrDr === "cr") type = "income";
        else if (rawCrDr === "dr") type = "expense";

        let description = combined
          .replace(dateRegex, " ")
          .replace(amountRegex, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (description.length > 500) description = description.slice(0, 500);
        if (!description) description = "Transaction";

        rows.push({
          date: dateStr,
          amount,
          type,
          description,
        });
      }
    }

    let success = 0;
    let failed = 0;

    for (const row of rows) {
      try {
        const rawDate =
          getFirstDefined(row, [
            "date",
            "Date",
            "DATE",
            "Txn Date",
            "Transaction Date",
            "Value Date",
          ]) ?? null;

        const parsedDate = parseDateSafe(rawDate);

        const description =
          getFirstDefined<string>(row, [
            "description",
            "Description",
            "Narration",
            "Details",
            "Transaction Details",
            "Particulars",
            "title",
            "Title",
          ]) || "";

        const creditRaw = getFirstDefined(row, [
          "credit",
          "Credit",
          "CREDIT",
          "Credit Amount",
          "Cr",
          "CR",
        ]);
        const debitRaw = getFirstDefined(row, [
          "debit",
          "Debit",
          "DEBIT",
          "Debit Amount",
          "Dr",
          "DR",
        ]);
        const amountRaw = getFirstDefined(row, [
          "amount",
          "Amount",
          "Transaction Amount",
          "AMOUNT",
        ]);

        let amount: number | null = null;
        let txType: "income" | "expense" | null = null;

        const credit = normalizeAmount(creditRaw);
        const debit = normalizeAmount(debitRaw);
        const generic = normalizeAmount(amountRaw);

        const explicitType = getFirstDefined(row, [
          "type",
          "Type",
          "transactionType",
          "Transaction Type",
        ]);
        if (explicitType) {
          const t = String(explicitType).trim().toLowerCase();
          if (t === "income" || t === "expense") {
            txType = t as "income" | "expense";
          }
        }

        if (credit !== null && credit !== 0) {
          amount = credit;
          if (!txType) txType = "income";
        } else if (debit !== null && debit !== 0) {
          amount = debit;
          if (!txType) txType = "expense";
        } else if (generic !== null && generic !== 0) {
          amount = Math.abs(generic);
          if (!txType) {
            txType = generic >= 0 ? "income" : "expense";
          }
        }

        if (!txType) {
          const rawType = String(
            getFirstDefined(row, ["type", "Type", "Transaction Type", "DrCr"]) || ""
          ).toLowerCase();
          if (["credit", "cr", "c"].includes(rawType)) txType = "income";
          else if (["debit", "dr", "d"].includes(rawType)) txType = "expense";
        }

        if (!parsedDate || !amount || !txType) {
          failed++;
          continue;
        }

        await ImportedTransactionModel.create({
          userId,
          date: parsedDate,
          description,
          amount,
          type: txType,
          category: detectCategory(description || ""),
          source: batch.source,
          importBatchId: batch._id,
          rawRow: row,
        });

        success++;
      } catch (err) {
        console.error("Failed to import row:", row, err);
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
    res.status(500).json({ message: "Parse failed", error: err instanceof Error ? err.message : "" });
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

    res.json({ batches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch batches" });
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

    const batch = await ImportBatchModel.findOne({ _id: batchId, userId });
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    await ImportedTransactionModel.deleteMany({
      importBatchId: batch._id,
      userId,
    });

    const uploadsDir = path.join(__dirname, "..", "..", "uploads");
    const filePath = path.join(uploadsDir, batch.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await batch.deleteOne();

    res.json({ message: "Uploaded file deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete batch" });
  }
});

export default router;