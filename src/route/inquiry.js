const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  postInquiryMessage,
  getAllInquiryMessage,
  filterBasedOnStatus,
  changeInquiryStatus,
  deleteManyBasedOnId,
} = require("../controller/inquiry.controller");

router.post("/post", postInquiryMessage);

router.get("/fetch-all-inquiryMessages", auth, getAllInquiryMessage);

router.put("/change-status", auth, changeInquiryStatus);

router.get("/get-unseen", auth, filterBasedOnStatus);

router.delete("/delete/:id", auth, deleteManyBasedOnId);
module.exports = router;
