const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: Object,
  },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
