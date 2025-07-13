import express from "express";
import Table from "../models/Table.js"; // ✅ Make sure you have this model file

const router = express.Router();

// ✅ POST /api/tables - Add a new table
router.post("/", async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const table = new Table({ tableNumber });
    await table.save();
    res.status(201).json({ success: true, table });
  } catch (err) {
    console.error("Error creating table:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
