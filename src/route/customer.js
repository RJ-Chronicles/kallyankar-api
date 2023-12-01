const auth = require("../middleware/auth");
const {
  registerCustomer_post,
  customerList_get,
  customer_delete,
  customer_get,
  customer_update,
  customerUpdateBillingStatus,
  getCustomerListByBillingStatus,
  initialBillingStatus,
} = require("../controller/customer.controller");
const express = require("express");

const router = new express.Router();

router.post("/new-customer", auth, registerCustomer_post);
router.get("", customerList_get);
router.get("/seleted/:id", auth, customer_get);
router.get("/billing-status/:status", auth, getCustomerListByBillingStatus);
router.delete("/delete/:id", auth, customer_delete);
router.patch("/update/:id", customer_update);
router.patch("/update-billing/:id", customerUpdateBillingStatus);
router.patch("/initial-billing/:id", initialBillingStatus);

module.exports = router;
