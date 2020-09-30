const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
connectDB();

// console.log(path.join(__dirname, "..", "client", "build"));
// console.log(__dirname);
// set up the routes
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);

// Heroku config. Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

// set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
