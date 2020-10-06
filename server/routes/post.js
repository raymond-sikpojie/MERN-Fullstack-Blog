const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");

// CONFIGURE MULTER

// Step 1: set up storage location for photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      return cb(new Error("Please upload an image with a supported format"));
    }
    cb(null, true);
  },
});

// Create new post
router.post(
  "/:userId",
  upload.single("photo"),
  async (req, res) => {
    const userId = req.params.userId;
    const { title, tags, body } = req.body;
    try {
      if (!req.file) {
        return res.status(400).send("Please select an image to upload");
      }

      const img = fs.readFileSync(req.file.path);
      const encode_image = img.toString("base64");
      // Define a JSONobject for the image attributes for saving to database

      const finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, "base64"),
      };

      // create a new post and add image to the newly created post
      const newPost = new Post({
        title,
        body,
        tags,
        photo: finalImg.image,
      });

      // Find user
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).send({ msg: "Error, can't identify user" });
      }
      // Add post to the "posts" array in the User collection
      user.posts.unshift(newPost);

      // Add user to "postedBy" field in Post collection
      newPost.postedBy = {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.id,
      };

      await newPost.save();
      await user.save();

      res.status(200).send({ msg: "New post created" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // this is a callback function inside the post method to handle error
  // otherwise, the error would be in HTML format instead of json format.
  (error, req, res, next) => {
    res.status(400).send({ msg: error.message });
  }
);

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("comment");
    // .select("-photo");
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get one post and populate to show comments
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).populate("comment");

    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch photo from database and set the correct header
router.get("/photo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).send("User not found");
    }
    res.set("Content-Type", "image/jpg");
    res.status(200).send(post.photo);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Delete post
router.delete("/:postId/:userId", auth, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  try {
    // remove post from Post collection
    await Post.findByIdAndDelete(postId);
    // const post = await Post.findById(postId);

    // await post.remove();

    // find user and delete post from the "posts" array by finding
    // the post index and deleting from the array.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }
    const postIndex = user.posts.findIndex((post) => {
      return post._id == postId;
    });
    user.posts.splice(postIndex, 1);
    await user.save();

    res.status(200).send({ msg: "Post removed!", postIndex, postId });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = router;
