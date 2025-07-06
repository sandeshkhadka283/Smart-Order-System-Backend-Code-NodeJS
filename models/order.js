import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableId: String,
  items: [{ name: String, price: Number }],
  location: {
    lat: Number,
    lng: Number,
  },
  ip: String,
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("Order", orderSchema);
