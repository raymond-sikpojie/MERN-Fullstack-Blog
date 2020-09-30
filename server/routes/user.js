const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Post = require("../models/Post");
// require("dotenv").config();

// Register user
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName === "" || lastName === "" || email === "" || password === "") {
    return res.status(400).send({ msg: "Please enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "User already exists" });
    }

    // Hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    user = new User({
      ...req.body,
      password: encryptedPassword,
    });
    await user.save();
    res.status(200).send({ msg: "New user created" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.status(400).send({ msg: "Please enter all fields" });
  }
  try {
    // search for user
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ msg: "Invalid Credentials. Unable to login user" });
    }

    // verify password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res
        .status(400)
        .send({ msg: "Invalid Credentials. Unable to login user" });

    // Create token
    const token = await jwt.sign({ id: user.id }, process.env.tokenSecretKey, {
      expiresIn: "24h",
    });

    // response after successful log in
    res.status(200).send({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      },
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Find all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(401).send({ msg: "No users found" });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fine one user
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password").populate("posts");
    if (!user) return res.status(401).send({ msg: "No user found" });

    // test
    // user.posts = [];
    // await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
