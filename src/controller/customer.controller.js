const Customer = require("../models/customer");
const Product = require("../models/product");
const _ = require("lodash");
const registerCustomer_post = async (req, res) => {
  const customer = new Customer({
    ...req.body,
  });
  try {
    await customer.save();
    res.status(201).send({ message: "Customer has been added!", customer });
  } catch (e) {
    console.log("Error occured!");
    res.status(400).send(e);
  }
};

const customerList_get = async (req, res) => {
  try {
    let items = await Customer.find(
      {},
      {
        _id: 1,
        name: 1,
        last_name: 1,
        address: 1,
        email: 1,
        contact: 1,
        gst_number: 1,
      }
    );

    res.status(200).send(items);
  } catch (e) {
    res.status(400).send("Error" + e.message);
  }
};

const customer_get = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findOne({ _id: customerId });
    if (customer) {
      res.status(200).send({ message: "customer for given Id", customer });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getCustomerListByBillingStatus = async (req, res) => {
  try {
    const bill_status = req.params.status;
    const list = await Customer.find({ bill_status });
    res.status(200).send({ message: "customer for given Id", list });
  } catch (err) {
    res.status(400).send(e);
  }
};

const customer_update = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (customer) {
      res
        .status(200)
        .send({ message: "customer has been updated for given Id", customer });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

//update billing status only

const customerUpdateBillingStatus = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const statusAndUnpaidAmount = await Customer.findById({ _id: _id });
    console.log(statusAndUnpaidAmount);
    console.log(dataToUpdate);
    // if (statusAndUnpaidAmount.unpaid_amount > 0) {
    //   dataToUpdate.unpaid_amount =
    //     parseInt(dataToUpdate.unpaid_amount) +
    //     parseInt(dataToUpdate.unpaid_amount);
    // }
    const customer = await Customer.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (customer) {
      res
        .status(200)
        .send({ message: "customer has been updated for given Id", customer });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

const initialBillingStatus = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const statusAndUnpaidAmount = await Customer.findById({ _id: _id });

    if (statusAndUnpaidAmount.unpaid_amount > 0) {
      dataToUpdate.unpaid_amount =
        parseInt(dataToUpdate.unpaid_amount) +
        parseInt(statusAndUnpaidAmount.unpaid_amount);
    }
    console.log(dataToUpdate);
    const customer = await Customer.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (customer) {
      res
        .status(200)
        .send({ message: "customer has been updated for given Id", customer });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

const customer_delete = async (req, res) => {
  const customerId = req.params.id;
  try {
    // find and delete customer by id, It will return deleted customer record
    //const customer = await Customer.findOneAndDelete({ _id: customerId });
    const customer = await Customer.findOneAndDelete({ _id: customerId });
    //if the customer is deleted then save deleted customer in DeletedCustomer Table
    if (customer) {
      // find the list list of product sold
      const soldList = await Product.find({ customer: customerId }).populate(
        "customer"
      );
      console.log(soldList);
      if (soldList) {
        // await DeleteProduct.insertMany(soldeProdList);
        const prodList = await Product.deleteMany({ customer: customerId });
        console.log(prodList);
      }
      res
        .status(200)
        .send({ message: "customer has been delete for given Id", customer });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  registerCustomer_post,
  customerList_get,
  customer_delete,
  customer_get,
  customer_update,
  customerUpdateBillingStatus,
  getCustomerListByBillingStatus,
  initialBillingStatus,
};

/*
------------------dELETED cODE-----------------------------


const customer_paginatedResults = async (req, res) => {
  const field = req.query.field || "name";
  const value = req.query.value || "";
  // const page = req.query.page ? parseInt(req.query.page) : 1;
  // const limit = req.query.limit ? parseInt(req.query.limit) : 12;
  // const sort = req.query.sort ? (req.query.sort === "asc" ? 1 : -1) : 1;

  // console.log(
  //   `field: ${field} & value : ${value} & page ${page} & limit ${limit} & sort ${sort}`
  // );
  try {
    const customer = await Customer.find({
      [field]: { $regex: ".*" + value + ".*" },
    });
    res
      .status(200)
      .send({ message: "customer has been delete for given Id", customer });
  } catch (e) {
    res.status(404).send({ message: "Customer not found for your query" });
  }
};


*/
