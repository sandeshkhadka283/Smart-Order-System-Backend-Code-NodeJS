const express = require("express");
const router = express.Router();
const Table = require("../models/Table");

// POST /tables - Add a new table
router.post("/", async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const table = new Table({ tableNumber });
    await table.save();
    res.status(201).json({ success: true, table });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
