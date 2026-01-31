import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import userRoutes from "./routes/userIndex";
import importsRoutes from "./routes/import";
import analytics from "./routes/analysis";
import transactions from "./routes/transaction"

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));


connectDB();

app.use("/user", userRoutes);
app.use("/imports", importsRoutes);
app.use("/analytics", analytics);
app.use("/transactions",transactions);


app.get("/", (req, res) => {
  res.send(" Welcome to Fin_Track Backend API!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
