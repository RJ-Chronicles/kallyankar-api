const mongoose = require("mongoose");
const GSTSchema = new mongoose.Schema(
  {
    gst: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const GST = mongoose.model("GST", GSTSchema);

module.exports = GST;
