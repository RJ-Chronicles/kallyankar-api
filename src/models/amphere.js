const mongoose = require("mongoose");
const amphereSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Amphere = mongoose.model("Amphere", amphereSchema);

module.exports = Amphere;
