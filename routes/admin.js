import express from "express";
import Order from "../models/order.js";
import User from "../models/User.js";
import { authenticate, authorizeStaff } from "../middleware/auth.js";

const router = express.Router();

// GET /api/admin/stats
router.get("/stats", authenticate, authorizeStaff, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedOrders = await Order.countDocuments({ status: "Completed" });
    const totalUsers = await User.countDocuments();

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalUsers,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
