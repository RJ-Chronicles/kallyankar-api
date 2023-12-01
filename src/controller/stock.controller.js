const Stock = require("../models/stock");

const registerNewStockElement = async (req, res) => {
  const stock = new Stock({
    ...req.body,
  });
  try {
    await stock.save();
    res.status(201).send({ message: "Your stock message submitted!", stock });
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteStockElement = async (req, res) => {
  try {
    console.log("inside stock delete");
    const id = req.params.id;
    const result = await Stock.findOneAndDelete({ _id: id });
    if (result) res.status(200).send({ message: "selected Item Deleted" });
    else res.status(404).send({ message: "Record Not Found with Id" });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};

const getAllStockElements = async (req, res) => {
  try {
    console.log("inside the get list");
    const list = await Stock.find({});
    res.status(200).send({ message: "Your stock elements  List!", list });
  } catch (e) {
    res.status(404).send({ message: "No record" });
  }
};

const updateById = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const stock = await Stock.findOneAndUpdate({ _id: _id }, { ...dataToUpdate });
    if (stock) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", stock });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
  registerNewStockElement,
  getAllStockElements,
  deleteStockElement,
  updateById
};
