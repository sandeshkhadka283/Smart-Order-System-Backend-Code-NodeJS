import express from "express";
import Business from "../models/business.js";
import mongoose from "mongoose";

const router = express.Router();

// Get all businesses
router.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Suspend a business
router.put("/businesses/:businessId/suspend", async (req, res) => {
  try {
    const { businessId } = req.params;
    const updated = await Business.findOneAndUpdate(
      { businessId },
      { status: "suspended" },
      { new: true }
    );
    res.json({ message: "Business suspended", business: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch orders from a business DB
router.get("/businesses/:businessId/orders", async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findOne({ businessId });
    if (!business) return res.status(404).json({ message: "Business not found" });

    // Connect to the business DB dynamically
    const conn = mongoose.connection.useDb(business.dbName); // switch DB on the same cluster

    const Order = conn.model(
      "Order",
      new mongoose.Schema({
        items: Array,
        table: Number,
        status: String
      }),
      "orders" // specify collection name
    );

    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
