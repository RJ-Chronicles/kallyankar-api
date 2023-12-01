const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: false,
    },
    contact: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    gst_number: {
      type: String,
      required: false,
      trim: true,
      unique: false,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "customer",
});

// customerSchema.pre("remove", async function (req, res, next) {
//   const customerId = req.params.id;
//   const prodList = await Product.deleteMany({ customer: customerId });
//   const billList = await Billing.deleteMany({ customer: customerId });
//   console.log(prodList);
//   next();
// });

customerSchema.virtual("billing", {
  ref: "Billing",
  localField: "_id",
  foreignField: "customer",
});

// customerSchema.pre("remove", async function (req, res, next) {
//   const customerId = req.params.id;
//   const prodList = await Billing.deleteMany({ customer: customerId });
//   console.log(prodList);
//   next();
// });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
