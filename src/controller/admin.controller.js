const Admin = require("../models/admin");

const signup = async (req, res) => {
  const user = new Admin({
    ...req.body,
  });

  try {
    await user.save();
    res.status(201).send({ message: "User has been added successfuly", user });
  } catch (e) {
    res.status(400).send(e);
  }
};

const UserList_get = async (req, res) => {
  try {
    const userList = await Admin.find({});
    res.status(200).send({ message: "List of user registered", userList });
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  try {
    const user = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const { token, expiresIn } = await user.generateAuthToken();

    res.status(200).send({ user, token, expiresIn });
  } catch (e) {
    res.status(400).send();
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Admin.findOneAndDelete({ _id: userId });
    if (user) {
      res
        .status(200)
        .send({ message: "customer has been delete for given Id", user });
    } else res.status(404).send({ message: "customer not found with id" });
  } catch (e) {
    res.status(404).send(e);
  }
};

//router.post("/users/logout", auth, async (req, res)
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send("successfuly logout!");
  } catch (e) {
    res.status(500).send();
  }
};
//router.post("/users/logoutAll", auth, async (req, res)
const userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  login,
  signup,
  UserList_get,
  deleteUser,
  userLogout,
  userLogoutAll,
};

//-----------------------Timer to remove JWT Token after expiration--------------------------------------------
const tokenExpirationCountdown = (seconds) => {
  const timeInMilliSeconds = seconds * 1000;
  setTimeout(() => {
    console.log("YOur Session has expired");
  }, timeInMilliSeconds);
};
