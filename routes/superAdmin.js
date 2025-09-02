import express from "express";
import mongoose from "mongoose";
import Business from "../models/business.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/**
 * Get all businesses
 */
router.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new business
 */
router.post("/businesses", async (req, res) => {
  try {
    const { name, ownerEmail, dbName } = req.body;

    const business = new Business({
      businessId: uuidv4(),
      name,
      ownerEmail,
      dbName,
      status: "active",
    });

    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Update a business
 */
router.put("/businesses/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;
    const updated = await Business.findOneAndUpdate(
      { businessId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Business not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Delete a business
 */
router.delete("/businesses/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;
    const deleted = await Business.findOneAndDelete({ businessId });
    if (!deleted) return res.status(404).json({ message: "Business not found" });
    res.json({ message: "Business deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Suspend a business
 */
router.put("/businesses/:businessId/suspend", async (req, res) => {
  try {
    const { businessId } = req.params;
    const updated = await Business.findOneAndUpdate(
      { businessId },
      { status: "suspended" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Business not found" });
    res.json({ message: "Business suspended", business: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Resume a business
 */
router.put("/businesses/:businessId/resume", async (req, res) => {
  try {
    const { businessId } = req.params;
    const updated = await Business.findOneAndUpdate(
      { businessId },
      { status: "active" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Business not found" });
    res.json({ message: "Business resumed", business: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
