const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  addSoldBatteryDetails,
  fetchSoldBatteries,
  fetchSoldBatteryByCustomerId,
  deleteSoldBatteryById,
  updateBatteryById,
  fetchSoldBatteriesToExport,
} = require("../controller/product/product.controller");

router.post("/post", auth, addSoldBatteryDetails);
router.get("", fetchSoldBatteries);
router.get("/list-to-export", auth, fetchSoldBatteriesToExport);
router.get("/customer-specific-list/:id", auth, fetchSoldBatteryByCustomerId);
router.delete("/delete/:productId", auth, deleteSoldBatteryById);
router.patch("/update/:id", auth, updateBatteryById);
module.exports = router;
