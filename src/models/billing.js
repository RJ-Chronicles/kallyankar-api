const mongoose = require("mongoose");
const billingSchema = new mongoose.Schema(
  {
    total_amount: {
      type: Number,
      require: true,
    },
    bill_status: {
      type: String,
      default: "Paid",
    },
    unpaid_amount: {
      type: Number,
      require: true,
    },
    gst_amount: {
      type: Number,
      require: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      require: true,
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

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
