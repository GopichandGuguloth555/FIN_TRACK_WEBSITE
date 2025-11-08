import express from "express";
import multer from "multer";
import csv from "csv-parser";
import { Parser } from "json2csv";
import fs from "fs";
import path, { parse } from "path";
import { TransactionModel } from "../models/tarnsactions";
import { userAuth } from "../middlewares/auth";
import csvParser from "csv-parser";

const router = express.Router();

const upload = multer({ dest: path.join(__dirname, "../uploads/") });

router.post("/import", userAuth, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const transactions: any[] = [];
        // @ts-ignore
        const userId = req.user.id;

        const filePath = req.file.path;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                if (row.title && row.amount && row.category && row.type && row.date) {
                    transactions.push({
                        userId,
                        title: row.title,
                        amount: parseFloat(row.amount),
                        category: row.category,
                        type: row.type.toLowerCase(), 
                        date: new Date(row.date),
                    });
                }
            })
            .on("end", async () => {
                try {
                    if (transactions.length === 0) {
                        fs.unlinkSync(filePath);
                        return res
                            .status(400)
                            .json({ message: "No valid transactions found in CSV" });
                    }

                    await TransactionModel.insertMany(transactions);
                    fs.unlinkSync(filePath);
                    res.json({
                        message: "Transactions imported successfully",
                        count: transactions.length,
                    });
                } catch (dbError) {
                    console.error("Database error:", dbError);
                    res.status(500).json({ message: "Database insert failed" });
                }
            })
            .on("error", (err) => {
                console.error("CSV read error:", err);
                res.status(500).json({ message: "Error reading CSV file" });
            });
    } catch (error) {
        console.error("Import error:", error);
        res.status(500).json({ message: "Failed to import CSV" });
    }
});

router.get("/export", userAuth, async (req, res) => {
  try 
  {
    //@ts-ignore
    const userId = req.user.id;
    const transactions = await TransactionModel.find({ userId });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const fields = ["title", "amount", "category", "type", "date"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to export CSV" });
  }
});

export default router;
