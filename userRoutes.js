const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validatetokenHandler");

const route = express.Router();

route.post("/register", registerUser);

route.post("/login", loginUser);
route.get("/current",validateToken, currentUser);
module.exports = route;
