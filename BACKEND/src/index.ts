import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport";

import { connectDB } from "./db";
import userRoutes from "./routes/userIndex";
import importsRoutes from "./routes/import";
import analytics from "./routes/analysis";
import transactions from "./routes/transaction";
import authRoutes from "./routes/auth";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const app = express();


const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173"
)
  .split(",")
  .map((url) => url.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use("/uploads", express.static("uploads"));


connectDB();
app.use(passport.initialize());

app.use("/user", userRoutes);
app.use("/imports", importsRoutes);
app.use("/analytics", analytics);
app.use("/transactions", transactions);
app.use("/auth", authRoutes);


app.get("/", (_req, res) => {
  res.send("✅ Fin_Track Backend API is running");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`);
});
