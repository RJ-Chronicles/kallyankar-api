const express = require("express");
const auth = require("../middleware/auth");
const {
  login,
  signup,
  UserList_get,
  deleteUser,
} = require("../controller/admin.controller");
const router = new express.Router();

router.post("/login", login);

router.post("/sign-up", signup);

router.get("/user_list", auth, UserList_get);

router.delete("/delete/:id", auth, deleteUser);

// router.post("/logout", userLogout);

// router.post("/logout/all", userLogout);

//router.patch("/update/:id", auth, updateUser);

module.exports = router;
