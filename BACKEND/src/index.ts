import express from "express";
import { connectDB } from "./db";
import userRoutes from "./routes/userIndex";
import transactionRoutes from "./routes/transaction"
import budgetRoutes from "./routes/budjet";
import analyticRoutes from "./routes/analysis"
import fileRoutes from "./routes/files"

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
connectDB();

app.use("/user", userRoutes);
app.use("/transactions",transactionRoutes);
app.use("/budget",budgetRoutes);
app.use("/analytics",analyticRoutes);
app.use("/files",fileRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Welcome to Fin_Track Backend API!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
