const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//!@desc Register a User
// ?@route POST /api/users/register
// access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { username, mail, password } = req.body;
  if (!username || !mail || !password) {
    res.status(404);
    throw new Error("All fields are mandatory!");
  }
  //check particualr mail address if there in db or not
  const userAvailable = await User.findOne({ mail });
  if (userAvailable) {
    res.status(404);
    throw new Error("Username already existed");
  }

  //! HASH PW
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hash PW:", hashedPassword);
  // creating a new user
  const user = await User.create({
    username,
    mail,
    password: hashedPassword,
  });
  console.log("user created", user);

  if (user) {
    res.status(201).json({ __id: user.id, mail: user.mail });
  } else {
    res.status(400);
    throw new error("User data is not valid");
  }

  res.json({ message: "Register the user" });
});

//!@desc Login a User
// ?@route POST /api/users/login
// access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    res.send(400);
    throw new error("All fields are mandatory");
  }
  // to check user ia already in DB.
  const user = await User.findOne({ mail });

  // comapre pw with hashed pw
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          mail: user.mail,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new error("mail and password are not valid");
  }
});

//!@desc Currrent User Info
// ?@route GET /api/users/current
// access PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
