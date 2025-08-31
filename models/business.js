import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  businessId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dbName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  status: { type: String, default: "active" }, // active, suspended
  plan: { type: String, default: "basic" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Business", businessSchema); // Use default mongoose connection
