const GST = require("../models/gst");

const registerNewGST = async (req, res) => {
  const gst = new GST({
    ...req.body,
  });
  try {
    await gst.save();
    res.status(201).send({ message: "Your gst record added", gst });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getGSTList = async (req, res) => {
  try {
    const list = await GST.find({}, { gst: 1, createdAt: 1 });

    res.status(200).send(list);
  } catch (e) {
    res.status(404).send({ message: "No record" });
  }
};

const deleteGSTItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await GST.findOneAndDelete({ _id: id });
    if (result) res.status(200).send({ message: "selected Item Deleted" });
    else res.status(404).send({ message: "Record Not Found with Id" });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};
const updateById = async (req, res) => {
  const _id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const gst = await GST.findOneAndUpdate({ _id: _id }, { ...dataToUpdate });
    if (gst) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", gst });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  registerNewGST,
  getGSTList,
  deleteGSTItem,
  updateById,
};
