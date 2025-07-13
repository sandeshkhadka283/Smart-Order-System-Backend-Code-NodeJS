import express from "express";
import Order from "../models/order.js";
import User from "../models/User.js";
import Table from "../models/Table.js";
import { authenticate, authorizeStaff } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", authenticate, authorizeStaff, async (req, res) => {
  try {
    // Fetch detailed data (you can add limits if dataset is huge)
    const orders = await Order.find().lean();
    const users = await User.find().lean();
    const tables = await Table.find().lean();

    // Aggregated counts
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalTables = tables.length;

    // Aggregate order statuses
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalOrders,
      totalUsers,
      totalTables,
      byStatus: statusCounts,
      orders,
      users,
      tables,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
