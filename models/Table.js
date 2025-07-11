const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  status: { type: String, default: "available" }, // optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Table", tableSchema);
