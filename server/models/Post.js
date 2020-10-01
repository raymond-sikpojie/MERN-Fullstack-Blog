const mongoose = require("mongoose");
const Comment = require("./Comment");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  tags: {
    type: [String],
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer,
  },

  postedBy: {
    type: Object,
  },

  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
