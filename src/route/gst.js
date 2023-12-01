const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  registerNewGST,
  getGSTList,
  deleteGSTItem,
  updateById,
} = require("../controller/gst.controller");

router.post("/add", registerNewGST);

router.delete("/delete/:id", deleteGSTItem);

router.get("/", getGSTList);

router.patch("/update/:id", auth, updateById);

module.exports = router;
