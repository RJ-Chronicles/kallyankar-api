const StockItem = require("../models/stock_item");
const Stock = require("../models/stock");
const addStockItem = async (req, res) => {
  const stockItem = new StockItem({
    ...req.body,
  });
  try {
    const stock = await Stock.findById({ _id: req.body.stock });
    if (stock) {
      const available = parseInt(req.body.quantity) + parseInt(stock.available);
      await Stock.findByIdAndUpdate({ _id: req.body.stock }, { available });
      await stockItem.save();
      res
        .status(201)
        .send({ message: "Your stockItem message submitted!", stockItem });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getStockItemRecords = async (req, res) => {
  try {
    const stockItemList = await StockItem.find({});
    res.status(200).send({ message: "Your size  List!", stockItemList });
  } catch (e) {
    res.status(404).send({ message: "No record" });
  }
};

const deleteStockItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await StockItem.findOneAndDelete({ _id: id });
    if (result) res.status(200).send({ message: "selected Item Deleted" });
    else res.status(404).send({ message: "Record Not Found with Id" });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};

const updateStockItemById = async (req, res) => {
  const _id = req.params.id;

  try {
    const stock = await Stock.findById({ _id: req.body.stock });
    if (stock) {
      const available =
        parseInt(stock.available) -
        parseInt(req.body.previousStockQuantity) +
        parseInt(req.body.quantity);
      if (available >= 0) {
        const stockItem = await StockItem.findOneAndUpdate(
          { _id: _id },
          { quantity: req.body.quantity }
        );
        await Stock.findByIdAndUpdate({ _id: req.body.stock }, { available });
        if (stockItem) {
          res.status(200).send({
            message: "product has been updated for given Id",
            stockItem,
          });
        } else res.status(404).send({ message: "product not found with id" });
      } else res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const stockItemByStockId = async (req, res) => {
  const stockId = req.params.id;
  try {
    const stockItemList = await StockItem.find({ stock: stockId }).populate(
      "stock"
    );
    res.status(200).send({
      message: "Stock  specific stock items",
      stockItemList,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  updateStockItemById,
  deleteStockItem,
  addStockItem,
  stockItemByStockId,
  getStockItemRecords,
};
