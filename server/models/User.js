const mongoose = require("mongoose");
const validator = require("validator");
const Post = require("./Post");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please include a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Mongoose.Types.ObjectId,
      ref: Post,
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
