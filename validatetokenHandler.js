const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeaders = req.headers.Authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    // console.log(token);
    // !Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.send(401);
        throw new Error("The User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.send(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});
module.exports = validateToken;
