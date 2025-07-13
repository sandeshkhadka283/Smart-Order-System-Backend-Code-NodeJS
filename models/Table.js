import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: "available" }, // optional
  createdAt: { type: Date, default: Date.now },
});

const Table = mongoose.model("Table", tableSchema);

export default Table;
