const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

// Add comment
router.post("/:postId/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  try {
    const comment = new Comment({
      ...req.body,
    });

    // find user and add to the "postedBy" field in comment collection
    const user = await User.findById(userId);

    // update comment collection before saving
    comment.postedBy = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.id,
    };

    await comment.save();

    // Add comment to the "comment" field in the Post collection
    const post = await Post.findById(postId);
    post.comment.unshift(comment);
    await post.save();

    res.status(200).send({ msg: "Comment added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
