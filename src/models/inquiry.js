const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
