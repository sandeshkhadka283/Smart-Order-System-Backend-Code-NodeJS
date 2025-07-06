import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
dotenv.config();
console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // TEMP for debugging

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // wait up to 10 seconds for primary
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
})
.catch((err) => console.error("❌ MongoDB Error:", err));
