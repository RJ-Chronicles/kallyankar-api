const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  registerNewSize,
  deleteSize,
  getAllSize,
  updateById,
} = require("../controller/amphere.size.controller");

router.post("/", registerNewSize);

router.delete("/delete/:id", auth, deleteSize);

router.get("/", auth, getAllSize);

router.patch("/update/:id", auth, updateById);

module.exports = router;
