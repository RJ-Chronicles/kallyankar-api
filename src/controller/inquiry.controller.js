const Inquiry = require("../models/inquiry");
const auth = require("../middleware/auth");
const postInquiryMessage = async (req, res) => {
  const inquiry = new Inquiry({
    ...req.body,
    status: "unseen",
  });

  try {
    await inquiry.save();
    res
      .status(201)
      .send({ message: "Your inquiry message submitted!", inquiry });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllInquiryMessage = async (req, res) => {
  try {
    const list = await Inquiry.find({});
    res.status(200).send({ message: "Your inquiry message List!", list });
  } catch (e) {
    res.status(404).send({ message: "No Notification message" });
  }
};

const changeInquiryStatus = async (req, res) => {
  try {
    const updated = await Inquiry.updateMany(
      { status: "unseen" },
      { status: "seen" }
    );
    res.status(200).send({
      message: "Your inquiry message submitted!",
      modifiedCount: updated.modifiedCount,
    });
  } catch (e) {
    res.status(400).send({ message: "No record updated!" });
  }
};

const filterBasedOnStatus = async (req, res) => {
  try {
    const unseenList = await Inquiry.find({ status: "unseen" });
    res.status(200).send({ message: "Unseen list!", unseenList });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};

const deleteManyBasedOnId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("insede the delete: ", id);
    const result = await Inquiry.findOneAndDelete({ _id: id });
    if (result) res.status(200).send({ message: "selected Item Deleted" });
    else res.status(404).send({ message: "Record Not Found with Id" });
  } catch (e) {
    res.status(400).send({ error: "internal Error", e });
  }
};
module.exports = {
  postInquiryMessage,
  getAllInquiryMessage,
  changeInquiryStatus,
  filterBasedOnStatus,
  deleteManyBasedOnId,
};
