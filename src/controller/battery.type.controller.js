const Batteries = require("../models/batteries");

const registerNewType = async (req, res) => {
  const batteries = new Batteries({
    ...req.body,
  });
  try {
    await batteries.save();
    res
      .status(201)
      .send({ message: "Your batteries message submitted!", batteries });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllBatteryTypes = async (req, res) => {
  try {
    const items = await Batteries.find({}, { name: 1, createdAt: 1 });
    res.status(200).send(items);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const deleteBatteryType = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Batteries.findOneAndDelete({ _id: id });
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
    const batteries = await Batteries.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (batteries) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", batteries });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  registerNewType,
  getAllBatteryTypes,
  deleteBatteryType,
  updateById,
};
