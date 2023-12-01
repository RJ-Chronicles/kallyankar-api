const mongoose = require("mongoose");
const stockItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: mongoose.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const StockItem = mongoose.model("StockItem", stockItemSchema);

module.exports = StockItem;
