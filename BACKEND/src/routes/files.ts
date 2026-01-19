import express from "express";
import multer from "multer";
import csv from "csv-parser";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";
import { TransactionModel } from "../models/tarnsactions";
import { userAuth } from "../middlewares/auth";

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../uploads"),
});

router.post("/import",userAuth, upload.single("file"),async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // @ts-ignore
    const userId = req.user.id;
    const filePath = req.file.path;
    const transactions: any[] = [];

    try {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          const type = row.type?.toLowerCase().trim();

        
          if (
            row.title &&
            row.amount &&
            row.category &&
            row.date &&
            (type === "income" || type === "expense")
          ) {
            transactions.push({
              userId,
              title: row.title.trim(),
              amount: Number(row.amount),
              category: row.category.trim(),
              type,
              date: new Date(row.date),
            });
          }
        })
        .on("end", async () => {
          fs.unlinkSync(filePath);

          if (transactions.length === 0) {
            return res
              .status(400)
              .json({ message: "No valid rows found in CSV" });
          }

          await TransactionModel.insertMany(transactions, {
            ordered: false, 
          });

          res.json({
            message: "Transactions imported successfully",
            count: transactions.length,
          });
        })
        .on("error", (err) => {
          fs.unlinkSync(filePath);
          console.error("CSV parse error:", err);
          res.status(500).json({ message: "CSV parsing failed" });
        });
    } catch (err) {
      fs.unlinkSync(filePath);
      console.error("Import error:", err);
      res.status(500).json({ message: "CSV import failed" });
    }
  }
);


router.get("/export", userAuth, async (req, res) => {
    
  try {
    // @ts-ignore
    const userId = req.user.id;

    const transactions = await TransactionModel.find({ userId }).lean();

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const fields = ["title", "amount", "category", "type", "date"];
    const parser = new Parser({ fields });
    const csvData = parser.parse(transactions);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transactions.csv"
    );

    res.status(200).send(csvData);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "CSV export failed" });
  }
});

export default router;
