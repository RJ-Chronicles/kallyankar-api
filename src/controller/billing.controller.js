const Billing = require("../models/billing");

const addBilling = async (req, res) => {
  const billing = new Billing({
    ...req.body,
  });
  try {
    await billing.save();
    res
      .status(201)
      .send({ message: "Your billing message submitted!", billing });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getBillingRecords = async (req, res) => {
  try {
    const billingList = await Billing.find({});
    res.status(200).send({ message: "Your size  List!", billingList });
  } catch (e) {
    res.status(404).send({ message: "No record" });
  }
};

const getBillingRecordsByStatus = async (req, res) => {
  try {
    const billing_status = req.params.billing_status;

    const billingList = await Billing.find({
      bill_status: billing_status,
    }).populate("customer");

    res.status(200).send({ message: "Your size  List!", billingList });
  } catch (e) {
    res.status(404).send({ message: "No record" });
  }
};

const deleteBilling = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Billing.findOneAndDelete({ _id: id });
    if (result) res.status(200).send({ message: "selected Item Deleted" });
    else res.status(404).send({ message: "Record Not Found with Id" });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};

const updateBillingById = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;
  try {
    const billing = await Billing.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (billing) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", billing });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

const billintByCustomerId = async (req, res) => {
  console.log("work");
  const customerId = req.params.id;
  console.log(customerId);
  try {
    const billingList = await Billing.find({ customer: customerId }).populate(
      "customer"
    );
    res.status(200).send({
      message: "List of sold batteries to  specific customer",
      billingList,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  updateBillingById,
  deleteBilling,
  addBilling,
  getBillingRecordsByStatus,
  billintByCustomerId,
  getBillingRecords,
};
