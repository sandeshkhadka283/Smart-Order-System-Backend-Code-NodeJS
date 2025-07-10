import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableId: {
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }, // ✅ Add quantity field
      subtotal: { type: Number, required: true }, // ✅ Add subtotal
    },
  ],
  location: {
    lat: Number,
    lng: Number,
  },
  ip: String,

  // ✅ Updated status with default and enum values
  status: {
  type: String,
  enum: [
    "Pending",      // 👈 Add this
    "Received",
    "Preparing",
    "Ready",
    "Serving",
    "Completed",
    "Cancelled",
  ],
  default: "Pending", // 👈 Or keep "Received" if you want to skip pending
},
}, { timestamps: true }); // ✅ To track createdAt / updatedAt

export default mongoose.model("Order", orderSchema);
