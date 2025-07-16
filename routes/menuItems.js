// routes/menuItems.js
import express from "express";
import MenuItem from "../models/menuItem.js";
import { authenticate, authorizeStaff } from "../middleware/auth.js";

const router = express.Router();

// ➕ Add Menu Item
router.post("/", authenticate, authorizeStaff, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;
    const newItem = new MenuItem({ name, price, category, description, image });
    await newItem.save();
    res.status(201).json({ message: "Menu item added", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 📥 Get All Menu Items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🖊️ Update Menu Item
router.put("/:id", authenticate, authorizeStaff, async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Updated successfully", item: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Delete Menu Item
router.delete("/:id", authenticate, authorizeStaff, async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted", item: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
