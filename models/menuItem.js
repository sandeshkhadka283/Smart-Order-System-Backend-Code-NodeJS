// models/menuItem.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Breakfast", "Drinks"
  description: { type: String },
  image: { type: String }, // URL to food image if needed
});

export default mongoose.model("MenuItem", menuItemSchema);
