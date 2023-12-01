const mongoose = require("mongoose");
const batterySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Batteries = mongoose.model("Batteries", batterySchema);

module.exports = Batteries;
