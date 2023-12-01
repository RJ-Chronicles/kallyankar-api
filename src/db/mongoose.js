const mongoose = require("mongoose");

//Connecting with mongo
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
