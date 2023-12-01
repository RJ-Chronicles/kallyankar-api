const Product = require("../models/product");

const addSoldBatteryDetails = async (req, res) => {
  const battery = new Product({
    ...req.body,
  });

  try {
    await battery.save();
    await deleteBattery.save();
    res.status(201).send({ message: "New battery record submitted!", battery });
  } catch (e) {
    res.status(400).send(e);
  }
};

const fetchSoldBatteries = async (req, res) => {
  try {
    const items = await Product.find(
      {},
      {
        _id: 1,
        name: 1,
        type: 1,
        serial_number: 1,
        vehicle_name: 1,
        vehicle_number: 1,
        price: 1,
        customer: 1,
      }
    ).populate({
      path: "customer",
      select: "_id name last_name address email contact gst_number",
    });
    res.status(200).send(items);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const fetchSoldBatteriesToExport = async (req, res) => {
  try {
    const soldList = await Product.find({});
    res.status(200).send({ message: "List of sold batteries", soldList });
  } catch (e) {
    res.status(400).send(e);
  }
};

const fetchSoldBatteryByCustomerId = async (req, res) => {
  const customerId = req.params.id;
  console.log(customerId);
  try {
    const soldList = await Product.find({ customer: customerId }).populate(
      "customer"
    );
    res.status(200).send({
      message: "List of sold batteries to  specific customer",
      soldList,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteSoldBatteryById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOneAndDelete({
      _id: productId,
    });
    if (!product) {
      res.status(404).send({ message: "Record not found with given input" });
    } else
      res.status(200).send({
        message: "List of sold batteries to  specific customer",
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateBatteryById = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (product) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", product });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
  addSoldBatteryDetails,
  fetchSoldBatteries,
  fetchSoldBatteryByCustomerId,
  deleteSoldBatteryById,
  updateBatteryById,
  fetchSoldBatteriesToExport,
};
