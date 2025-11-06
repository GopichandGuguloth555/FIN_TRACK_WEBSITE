import express from "express";
import { connectDB } from "./db";
import userRoutes from "./routes/userIndex";
import transactionRoutes from "./routes/transaction"

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
connectDB();

app.use("/user", userRoutes);
app.use("/transactions",transactionRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Welcome to Fin_Track Backend API!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
