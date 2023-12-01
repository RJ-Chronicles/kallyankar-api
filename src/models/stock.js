const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema(
  {
    battery_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_code: {
      type: String,
      required: true,
      trim: true,
    },
    amphere_size: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.virtual("stock_item", {
  ref: "StockItem",
  localField: "_id",
  foreignField: "stock",
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
