const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); //?.replace("Bearer ", "")
    console.log("-------------------------------");

    if (!token) {
      console.log("Token missing");
      throw new Error("Authentication failed: Token missing");
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;

//mongodb://localhost:27017
