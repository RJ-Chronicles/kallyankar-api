const express = require("express");
require("dotenv").config();

require("./src/db/mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
const adminRouter = require("./src/route/admin");
const inquiryRouter = require("./src/route/inquiry");
const customerRouter = require("./src/route/customer");
const productRouter = require("./src/route/product");
const batteryTypeRouter = require("./src/route/batteryType");
const amphereRouter = require("./src/route/amphere");
const stockRouter = require("./src/route/stock");
const gstRouter = require("./src/route/gst");
const billingRouter = require("./src/route/billing");
const stockItemRouter = require("./src/route/stock_item");

app.use("/admin", adminRouter);
app.use("/inquiry", inquiryRouter);
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/battery-type", batteryTypeRouter);
app.use("/amphere", amphereRouter);
app.use("/stock", stockRouter);
app.use("/gst", gstRouter);
app.use("/billing", billingRouter);
app.use("/stock-item", stockItemRouter);
module.exports = app;
