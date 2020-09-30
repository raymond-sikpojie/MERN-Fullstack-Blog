const jwt = require("jsonwebtoken");
// require("dotenv").config();

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.tokenSecretKey);

    if (!decoded) {
      return res
        .status(401)
        .send({ msg: "Token verification failed, authorization denied" });
    }
    // Take the "req" object, and assign a value to a property "user"
    // "decoded" aleady contains the user "id" as its payload, which it gets from "token" that's passed to it.
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = auth;
