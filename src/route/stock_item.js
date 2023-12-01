const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  updateStockItemById,
  deleteStockItem,
  addStockItem,
  stockItemByStockId,
  getStockItemRecords,
} = require("../controller/stock_item.controller");

router.post("/add", addStockItem);

router.delete("/delete/:id", deleteStockItem);

router.get("/stock-items-by/:id", stockItemByStockId);

router.patch("/update/:id", auth, updateStockItemById);

router.get("/stock-items", getStockItemRecords);

module.exports = router;
