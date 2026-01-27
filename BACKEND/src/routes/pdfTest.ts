import express from "express";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse"
import { userAuth } from "../middlewares/auth";
import { ImportBatchModel } from "../models/importBatch";

const router = express.Router();


router.get("/pdf-text/:batchId", userAuth, async (req, res) => {
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
        message: "PDF import batch not found",
      });
    }

    const filePath = path.join("uploads", batch.fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        message: "PDF file not found on server",
      });
    }

    const buffer = fs.readFileSync(filePath);
    //@ts-ignore
    const data = await pdf(buffer);

    res.json({
      message: "PDF text extracted successfully",
      pages: data.numpages,
      textPreview: data.text.slice(0, 2000), 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to extract PDF text",
    });
  }
});

export default router;
