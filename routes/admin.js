import express from "express";
import Order from "../models/order.js";
import User from "../models/User.js";
import Table from "../models/Table.js";  // <-- import Table model
import { authenticate, authorizeStaff } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", authenticate, authorizeStaff, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalTables = await Table.countDocuments();

    // Aggregate order counts by status dynamically
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Convert aggregation to an object like { pending: X, completed: Y }
    const byStatus = {};
    ordersByStatus.forEach(({ _id, count }) => {
      byStatus[_id.toLowerCase()] = count;
    });

    // If you want, add activeSessions (or set 0)
    const activeSessions = 0;

    res.json({
      totalTables,
      activeSessions,
      totalOrders,
      byStatus,
      totalUsers,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
