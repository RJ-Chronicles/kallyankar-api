const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  registerNewType,
  deleteBatteryType,
  getAllBatteryTypes,
  updateById,
} = require("../controller/battery.type.controller");

router.post("/add", auth, registerNewType);

router.delete("/delete/:id", auth, deleteBatteryType);

router.get("/", getAllBatteryTypes);

router.patch("/update/:id", auth, updateById);

module.exports = router;
