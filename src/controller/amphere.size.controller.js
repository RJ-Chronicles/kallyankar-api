const Amphere = require("../models/amphere");

const registerNewSize = async (req, res) => {
  console.log("body: ", req.body);
  const amphere = new Amphere({
    ...req.body,
  });
  try {
    await amphere.save();
    res
      .status(201)
      .send({ message: "Your amphere message submitted!", amphere });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllSize = async (req, res) => {
  try {
    const items = await Amphere.find({}, { size: 1, createdAt: 1 });
    res.status(200).send(items);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const deleteSize = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Amphere.findOneAndDelete({ _id: id });
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
    const amphere = await Amphere.findOneAndUpdate(
      { _id: _id },
      { ...dataToUpdate }
    );
    if (amphere) {
      res
        .status(200)
        .send({ message: "product has been updated for given Id", amphere });
    } else res.status(404).send({ message: "product not found with id" });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  registerNewSize,
  getAllSize,
  deleteSize,
  updateById,
};
