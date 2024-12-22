const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  loginUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/add", addUser);

module.exports = router;
