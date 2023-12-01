const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  registerNewStockElement,
  getAllStockElements,
  deleteStockElement,
  updateById,
} = require("../controller/stock.controller");

router.post("/add", registerNewStockElement);

router.delete("/delete/:id", deleteStockElement);

router.get("/list", getAllStockElements);

router.patch("/update/:id", auth, updateById);

module.exports = router;
