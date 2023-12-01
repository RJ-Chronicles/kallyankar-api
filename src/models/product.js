const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    serial_number: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_name: {
      type: String,
      required: false,
      trim: true,
    },
    vehicle_number: {
      type: Number,
      required: false,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
